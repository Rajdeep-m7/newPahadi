import CategoryPage from "@/components/CategoryPage";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  getCategoryBySlug,
  getRootCategories,
} from "@/lib/services/category";
import {
  getProducts,
  getProductsByCategorySlug,
} from "@/lib/services/product";

const Page = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  // Special case for "All Jewellery"
  const isAll = slug === "all-jewellery";

  const [category, productData, categories] = await Promise.all([
    isAll
      ? Promise.resolve({
          name: "All Jewellery",
          slug: "all-jewellery",
        })
      : getCategoryBySlug(slug),
    isAll
      ? getProducts({ limit: 100 }).then((products) => ({
          products,
          total: products.length,
        }))
      : getProductsByCategorySlug(slug, {
          limit: 20,
        }),
    getRootCategories(),
  ]);

  return (
    <div>
      <Header />
      <main className="main-shell">
        <CategoryPage
          products={productData?.products || []}
          total={productData?.total || 0}
          categoryName={
            category?.name || (isAll ? "All Jewellery" : "Category")
          }
          categorySlug={slug}
          categories={categories.map((item) => ({
            name: item.name,
            slug: item.slug,
            productCount: item.productCount,
          }))}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Page;
