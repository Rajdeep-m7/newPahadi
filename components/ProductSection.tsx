import ProductCard from "./ProductCard";
import { getHomeData, getProducts, Product } from "@/lib/services/product";

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
    oldPrice={product.mrp > product.price ? formatPrice(product.mrp) : undefined}
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
        .includes("latest")
    )?.products || fallbackProducts.slice(0, 5);

  const allProducts =
    (homeSections as HomeSection[]).find((section) =>
      String(section.title || section.name || "")
        .toLowerCase()
        .includes("all")
    )?.products || fallbackProducts;

  return (
    <div className="w-full py-10">
      <div>
        <p className="text-3xl font-bold">Latest Collections</p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5">
          {latestProducts.map(renderProductCard)}
        </div>
      </div>
      <div className="my-3 mt-5">
        <p className="text-3xl font-bold">All Collections</p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5">
          {allProducts.map(renderProductCard)}
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
