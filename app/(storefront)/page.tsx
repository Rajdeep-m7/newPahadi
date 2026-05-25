import Footer from "@/components/Footer"
import Header from "@/components/Header"
import HeroSlider from "@/components/HeroSlider"
import ProductSection from "@/components/ProductSection"
import Section1 from "@/components/Section1"
import VideoSlider from "@/components/VideoSlider"

function page() {
  return (
    <div>
      <Header />
      <HeroSlider />
      <Section1 />
      <ProductSection />
      <VideoSlider />
      <Footer />
    </div>
  )
}

export default page
