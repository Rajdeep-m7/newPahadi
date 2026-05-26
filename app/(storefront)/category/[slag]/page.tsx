import CategoryPage from "@/components/CategoryPage"
import Footer from "@/components/Footer"
import Header from "@/components/Header"

const page = () => {
  return (
    <div>
        <Header />
        <main className="main-shell">
          <CategoryPage />
        </main>
        <Footer />
    </div>
  )
}

export default page
