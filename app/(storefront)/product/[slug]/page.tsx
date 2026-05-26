import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductPage from "@/components/ProductPage";
import { getProductBySlug, getVariantBySlug } from "@/lib/services/product";

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

  return (
    <div>
      <Header />
      <main className="main-shell">
        <ProductPage product={product} variant={variant} />
      </main>
      <Footer />
    </div>
  );
};

export default page;
