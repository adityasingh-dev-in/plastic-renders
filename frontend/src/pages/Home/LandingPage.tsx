import { useLenis } from '../../hooks/useLenis';
import HeroSection from '../../sections/Hero/HeroSection';
import AboutSection from '../../sections/ProjectsPreview/AboutSection';
import VideoPortfolio from '../../sections/Portfolio/VideoPortfolio';
import ModelPortfolio from '../../sections/Portfolio/ModelPortfolio';
import ServicesSection from '../../sections/Services/ServicesSection';
import TestimonialsSection from '../../sections/Testimonials/TestimonialsSection';
import ContactSection from '../../sections/ContactSection/ContactSection';
import Footer from '../../components/ui/Footer';
import BackToTop from '../../components/ui/BackToTop';

/**
 * Main landing page – assembles all sections in order.
 * Lenis smooth-scroll is initialised here.
 */
const LandingPage = () => {
  // Initialise Lenis smooth scroll with slight parallax feel
  useLenis();

  return (
    <main>
      <HeroSection />
      <AboutSection />
      <VideoPortfolio />
      <ModelPortfolio />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <BackToTop />
    </main>
  );
};

export default LandingPage;