import ProductCard from "./ProductCard";
import { getHomeData, getProducts, Product } from "@/lib/services/product";
import image1 from "../public/3.jpg";
import image2 from "../public/4.jpg";
import image3 from "../public/image 3.jpg.jpeg";
import Image from "next/image";
import Link from "next/link";

type HomeSection = {
  title?: string;
  name?: string;
  products: Product[];
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

const renderProductCard = (product: Product) => (
  <ProductCard
    key={product.id}
    image={product.image}
    title={product.title}
    price={formatPrice(product.price)}
    oldPrice={
      product.mrp > product.price ? formatPrice(product.mrp) : undefined
    }
    discount={product.discount ? `${product.discount}% OFF` : undefined}
    href={`/product/${product.slug}`}
    categoryName={product.categoryName}
    product={product}
    variantId={product.variantId || product.id}
  />
);

const ProductSection = async () => {
  const [homeSections, fallbackProducts] = await Promise.all([
    getHomeData(),
    getProducts({ limit: 10 }),
  ]);

  const latestProducts =
    (homeSections as HomeSection[]).find((section) =>
      String(section.title || section.name || "")
        .toLowerCase()
        .includes("latest"),
    )?.products || fallbackProducts.slice(0, 5);

  const allProducts =
    (homeSections as HomeSection[]).find((section) =>
      String(section.title || section.name || "")
        .toLowerCase()
        .includes("all"),
    )?.products || fallbackProducts;

  return (
    <div className="w-full py-10">
      <div>
        <p className="text-3xl font-bold">Latest Collections</p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5">
          {latestProducts.map(renderProductCard)}
        </div>
      </div>
      <Link href="/category/all-jewellery">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
          <Image
            src={image1}
            alt=""
            width={500}
            height={500}
            className="h-full w-full rounded-lg object-cover"
          />

          <Image
            src={image2}
            alt=""
            width={500}
            height={500}
            className="h-full w-full rounded-lg object-cover"
          />

          <Image
            src={image3}
            alt=""
            width={500}
            height={500}
            className="h-full w-full rounded-lg object-cover sm:col-span-2 lg:col-span-1"
          />
        </div>
      </Link>

      <div className="my-3 mt-5">
        <p className="text-3xl font-bold">All Collections</p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5">
          {allProducts.slice(0,10).map(renderProductCard)}
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
