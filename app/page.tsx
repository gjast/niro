import Hero from "@/widgets/Hero/Hero";
import HeaderComponent from "@/widgets/HeaderComponent/HeaderComponent";
import FloatingHeader from "@/widgets/Header/FloatingHeader";
import Line from "@/widgets/Line/Line";
import Stack from "@/widgets/Stack/Stack";
import Reviews from "@/widgets/Reviews/Reviews";
import Faq from "@/widgets/Faq/Faq";
import Roadmap from "@/widgets/Roadmap/Roadmap";
import Portfolio from "@/widgets/Portfolio/Portfolio";
import { getReviews } from "@/lib/reviews";
import Footer from "@/widgets/Footer/Footer";

export default function Home() {
  const reviews = getReviews();
  return (
    <main className="overflow-hidden">
      <HeaderComponent />
      <FloatingHeader />
      <Hero />
      <Line />
      <Portfolio />
      <Line />
      <Stack />
      <Line />
      <Roadmap />
      <Line />
      <Reviews reviews={reviews} />
      <Line />
      <Faq />
      <Line />
      <Footer />
    </main>
  );
}
