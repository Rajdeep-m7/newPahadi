import CategoryPage from "@/components/CategoryPage"
import Footer from "@/components/Footer"
import Header from "@/components/Header"

const page = () => {
  return (
    <div>
        <Header />
        <div className="max-w-400 mx-auto">
          <CategoryPage />
        </div>
        <Footer />
    </div>
  )
}

export default page