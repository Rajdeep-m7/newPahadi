import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductPage from "@/components/ProductPage";
import { getProductBySlug, getVariantBySlug, getSimilarProducts } from "@/lib/services/product";

const page = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const [product, variant] = await Promise.all([
    getProductBySlug(slug),
    getVariantBySlug(slug),
  ]);

  const productId = variant?.currentVariant?.productId?._id || product?.id;
  const similarProducts = productId ? await getSimilarProducts(productId) : [];

  return (
    <div>
      <main className="main-shell">
        <ProductPage product={product} variant={variant} similarProducts={similarProducts} />
      </main>
    </div>
  );
};

export default page;
