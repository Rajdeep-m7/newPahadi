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
      <div className="main-shell !pt-3 !pb-1">
        <HeroSlider />
      </div>
      <main className="main-shell">
        <Section1 />
        <ProductSection />
        <VideoSlider />
        <StaticBanner />
      </main>
      <Footer />
    </div>
  );
}

export default page;
