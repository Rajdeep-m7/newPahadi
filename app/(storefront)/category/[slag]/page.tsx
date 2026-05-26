import CategoryPage from "@/components/CategoryPage"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { getCategoryBySlug, getRootCategories } from "@/lib/services/category"
import { getProductsByCategorySlug } from "@/lib/services/product"

const page = async ({
  params,
}: {
  params: Promise<{ slag: string }>
}) => {
  const { slag } = await params
  const [category, productData, categories] = await Promise.all([
    getCategoryBySlug(slag),
    getProductsByCategorySlug(slag, { limit: 20 }),
    getRootCategories(),
  ])

  return (
    <div>
        <Header />
        <main className="main-shell">
          <CategoryPage
            products={productData.products}
            total={productData.total}
            categoryName={category?.name}
            categorySlug={slag}
            categories={categories.map((item) => ({
              name: item.name,
              slug: item.slug,
              productCount: item.productCount,
            }))}
          />
        </main>
        <Footer />
    </div>
  )
}

export default page
