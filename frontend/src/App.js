import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "@/context/ThemeContext";
import { BookingProvider } from "@/context/BookingContext";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import Cursor from "@/components/Cursor";
import NetworkScene from "@/three/NetworkScene";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { PAGE_TRANSITION } from "@/lib/motion";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Work from "@/pages/Work";
import About from "@/pages/About";
import Contact from "@/pages/Contact";

function scrollTop() {
  if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
  else window.scrollTo({ top: 0, behavior: "instant" });
}

// Crossfade between pages. mode="wait" lets the outgoing page leave before the
// new one enters; the scroll resets to top exactly between the two beats so the
// new page always begins from the hero.
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" onExitComplete={scrollTop}>
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={PAGE_TRANSITION}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/work" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BookingProvider>
        <SmoothScroll />
        <ScrollProgress />
        <Cursor />
        <NetworkScene />
        <BrowserRouter>
          <div className="relative z-10 text-weha-text">
            <Header />
            <AnimatedRoutes />
            <Footer />
          </div>
          <FloatingWhatsApp />
          <Toaster position="bottom-right" />
        </BrowserRouter>
      </BookingProvider>
    </ThemeProvider>
  );
}

export default App;
