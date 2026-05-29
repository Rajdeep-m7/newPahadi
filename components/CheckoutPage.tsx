"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FiCreditCard,
  FiLock,
  FiMapPin,
  FiTruck,
  FiPlus,
  FiCheckCircle,
} from "react-icons/fi";
import { useCartStore } from "@/lib/store/useCartStore";
import { useAddressStore } from "@/lib/store/useAddressStore";
import { useCustomerStore } from "@/lib/store/useCustomerStore";
import AddressForm from "@/components/AddressForm";
import { shopApi } from "@/lib/fetchers";
import { toast } from "sonner";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

const CheckoutPage = () => {
  const router = useRouter();
  const { items: cartItems, clearCart, appliedCoupon } = useCartStore();
  const { customer, isAuthenticated } = useCustomerStore();
  const { addresses, fetchAddresses, createAddress } = useAddressStore();

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/checkout");
      return;
    }

    if (cartItems.length === 0) {
      router.push("/cart");
      return;
    }

    fetchAddresses();
  }, [isAuthenticated, cartItems.length, router, fetchAddresses]);

  // Set default address if none selected and addresses load
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
      setSelectedAddressId(defaultAddr._id);
    }
  }, [addresses, selectedAddressId]);

  const handleAddressSubmit = async (data: any) => {
    try {
      await createAddress(data);
      toast.success("Address added successfully");
      setIsAddressFormOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to add address");
    }
  };

  const handleCheckout = async () => {
    if (!selectedAddressId) {
      toast.error("Please select a delivery address");
      return;
    }

    const selectedAddress = addresses.find((a) => a._id === selectedAddressId);
    if (!selectedAddress) {
      toast.error("Invalid address selected");
      return;
    }

    setIsProcessing(true);
    try {
      // 1. Create Order
      const orderPayload = {
        items: cartItems.map((item) => ({
          variantId: item.variantId,
          quantity: item.quantity,
        })),
        appliedCoupon: appliedCoupon?.code || undefined,
        shippingAddress: {
          fullName: selectedAddress.fullName,
          phone: selectedAddress.phone,
          addressLine1: selectedAddress.addressLine1,
          addressLine2: selectedAddress.addressLine2,
          city: selectedAddress.city,
          state: selectedAddress.state,
          postalCode: selectedAddress.postalCode,
          country: selectedAddress.country,
        },
      };

      const orderRes = await shopApi.post("/orders", orderPayload);
      const order = orderRes.data.data;

      // 2. Initiate Payment
      const initRes = await shopApi.post("/transactions/initiate", {
        orderId: order._id,
        method: "razorpay",
      });
      const transaction = initRes.data.data;

      // 3. Load Razorpay
      const res = await loadRazorpayScript();
      if (!res) {
        toast.error("Razorpay SDK failed to load. Are you online?");
        setIsProcessing(false);
        return;
      }

      // 4. Configure Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: transaction.amount,
        currency: transaction.currency,
        name: "Pahadi Collections",
        description: `Payment for Order #${order.orderId}`,
        order_id: transaction.razorpayOrderId,
        handler: async function (response: any) {
          try {
            // 5. Verify Payment
            const verifyRes = await shopApi.post("/transactions/verify", {
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });

            if (verifyRes.data.success) {
              toast.success("Payment successful!");
              clearCart();
              router.push("/account/orders");
            } else {
              toast.error("Payment verification failed");
              router.push(`/account/orders`);
            }
          } catch (err: any) {
            console.error("Verification error:", err);
            toast.error(err.response?.data?.message || "Payment verification failed");
            router.push(`/account/orders`);
          }
        },
        prefill: {
          name: customer?.name || selectedAddress.fullName,
          email: customer?.email || "",
          contact: customer?.phone || selectedAddress.phone,
        },
        notes: {
          address: selectedAddress.addressLine1,
        },
        theme: {
          color: "#b98b5f",
        },
        modal: {
          ondismiss: function () {
            toast.error("Payment cancelled");
            setIsProcessing(false);
            router.push(`/account/orders`);
          },
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error(error.response?.data?.message || "Failed to process checkout");
      setIsProcessing(false);
    }
  };

  // Calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.isActive === false ? 0 : (item.price || 0) * item.quantity),
    0
  );

  const discountAmount = appliedCoupon?.calculatedDiscount || 0;

  const totalTax = cartItems.reduce((acc, item) => {
    if (item.isActive === false) return acc;
    if (!item.effectiveTax || item.effectiveTax.length === 0) return acc;
    const itemPrice = item.price || 0;
    const itemTax = item.effectiveTax.reduce((tAcc, slab) => {
      return tAcc + itemPrice * (slab.slab / 100);
    }, 0);
    return acc + itemTax * item.quantity;
  }, 0);

  const totalAmount = subtotal - discountAmount + totalTax;

  const validCartItems = cartItems.filter((item) => item.isActive !== false);

  if (!isAuthenticated || cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold text-gray-500">Initializing Checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#f7f7f7] px-4 py-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_420px]">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          {/* PAGE TITLE */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            <p className="mt-2 text-sm text-gray-500">Complete your order securely</p>
          </div>

          {/* SHIPPING ADDRESS */}
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-100/50">
                  <FiMapPin className="text-amber-600" size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 text-sm md:text-base">Delivery Address</h2>
                  <p className="text-xs text-gray-500">Select where to ship your order</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddressFormOpen(true)}
                className="flex items-center gap-2 text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors uppercase tracking-wider"
              >
                <FiPlus size={16} /> Add New
              </button>
            </div>

            {addresses.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-sm text-gray-500 mb-4">No saved addresses found.</p>
                <button
                  onClick={() => setIsAddressFormOpen(true)}
                  className="px-8 py-3 bg-[#222222] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-amber-500 transition-all shadow-md"
                >
                  Add Delivery Address
                </button>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {addresses.map((addr) => (
                  <div
                    key={addr._id}
                    onClick={() => setSelectedAddressId(addr._id)}
                    className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedAddressId === addr._id
                        ? "border-amber-500 bg-amber-50/20"
                        : "border-gray-50 hover:border-amber-100 hover:bg-gray-50/50"
                    }`}
                  >
                    {selectedAddressId === addr._id && (
                      <div className="absolute top-4 right-4 text-amber-500 animate-in zoom-in duration-300">
                        <FiCheckCircle size={22} className="fill-white" />
                      </div>
                    )}
                    <h3 className="font-bold text-gray-900 text-[13px] md:text-sm mb-1.5">{addr.fullName}</h3>
                    <p className="text-[11px] md:text-xs text-gray-500 leading-relaxed mb-3">
                      {addr.addressLine1}
                      {addr.addressLine2 && `, ${addr.addressLine2}`}
                      <br />
                      {addr.city}, {addr.state} {addr.postalCode}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] md:text-[11px] font-bold text-gray-900 uppercase tracking-wider">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      {addr.phone}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PAYMENT */}
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-100/50">
                <FiCreditCard className="text-amber-600" size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 text-sm md:text-base">Payment Method</h2>
                <p className="text-xs text-gray-500">Secure online payment via Razorpay</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-2xl border-2 border-amber-500 bg-amber-50/20 px-6 py-5">
                <div>
                  <p className="font-bold text-gray-900 text-sm uppercase tracking-wide">Online Payment</p>
                  <p className="text-xs text-gray-500 mt-1">
                    UPI, Cards, NetBanking, Wallets
                  </p>
                </div>
                <div className="h-5 w-5 rounded-full border-[6px] border-amber-500 bg-white"></div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:h-fit lg:sticky lg:top-8">
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-4 mb-4 uppercase tracking-widest text-[13px]">
              Order Summary
            </h2>

            {/* PRODUCT LIST */}
            <div className="max-h-[300px] overflow-y-auto no-scrollbar space-y-4 mb-8">
              {validCartItems.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-gray-50 shrink-0 w-20 h-20">
                    <Image
                      src={item.image || "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop"}
                      alt={item.title || "Product"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 py-1">
                    <h3 className="font-bold text-gray-900 text-[13px] line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Qty: {item.quantity}
                    </p>
                    <p className="mt-2 text-sm font-bold text-[#b98b5f]">
                      {formatCurrency(item.price || 0)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* PRICE DETAILS */}
            <div className="space-y-4 border-t border-gray-50 pt-6">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.1em]">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-gray-900">{formatCurrency(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.1em] text-green-600">
                  <span>Coupon ({appliedCoupon?.code})</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.1em]">
                <span className="text-gray-400">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>

              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.1em]">
                <span className="text-gray-400">GST (Taxes)</span>
                <span className="text-gray-900">{formatCurrency(totalTax)}</span>
              </div>

              <div className="flex items-center justify-between border-t border-gray-50 pt-5 mt-2">
                <span className="text-sm font-bold text-gray-900 uppercase tracking-[0.2em]">Total</span>
                <span className="text-2xl font-bold text-amber-600">
                  {formatCurrency(totalAmount)}
                </span>
              </div>
            </div>

            {/* FEATURES */}
            <div className="mt-8 space-y-3 rounded-2xl bg-[#fafafa] p-5 border border-gray-100">
              <div className="flex items-center gap-3">
                <FiTruck className="text-amber-600" size={16} />
                <p className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">Free insured shipping</p>
              </div>
              <div className="flex items-center gap-3">
                <FiLock className="text-amber-600" size={16} />
                <p className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">Secure encrypted payment</p>
              </div>
            </div>

            {/* BUTTON */}
            <button
              onClick={handleCheckout}
              disabled={isProcessing || addresses.length === 0}
              className="mt-8 flex h-14 w-full items-center justify-center rounded-2xl bg-[#222222] text-[11px] font-bold uppercase tracking-[0.3em] text-white transition-all hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-gray-200"
            >
              {isProcessing ? "Processing..." : "Complete Purchase"}
            </button>

            <p className="mt-5 text-center text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-loose">
              By placing your order you agree to our<br />
              <span className="text-amber-500 underline">terms & conditions</span>
            </p>
          </div>
        </div>
      </div>

      <AddressForm
        isOpen={isAddressFormOpen}
        onClose={() => setIsAddressFormOpen(false)}
        onSubmit={handleAddressSubmit}
      />
    </section>
  );
};

export default CheckoutPage;
