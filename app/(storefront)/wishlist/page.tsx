import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WishlistPage from "@/components/WishlistPage";

const page = () => {
  return (
    <div>
      <Header />
      <main className="main-shell">
        <WishlistPage />
      </main>
      <Footer />
    </div>
  );
};

export default page;
