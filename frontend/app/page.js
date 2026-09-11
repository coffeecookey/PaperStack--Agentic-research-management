import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import ScrollReveal from "./components/ScrollReveal";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <div className="md:flex md:min-h-dvh md:flex-col">
        <Navbar />
        <Hero />
      </div>
      <Footer />
    </>
  );
}
