import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import ProductSection from "@/components/ProductSection";
import Section1 from "@/components/Section1";
import VideoSlider from "@/components/VideoSlider";
import StaticBanner from "@/components/StaticBanner";

function page() {
  return (
    <div>
      <Header />
      <div className="max-w-400 mx-auto">
        <HeroSlider />
        <Section1 />
        <ProductSection />
        <VideoSlider />
        <StaticBanner />
      </div>
      <Footer />
    </div>
  );
}

export default page;
