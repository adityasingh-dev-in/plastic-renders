import { lazy, Suspense } from 'react';
import { useLenis } from '../../hooks/useLenis';
import HeroSection from '../../sections/Hero/HeroSection';
import VideoPortfolio from '../../sections/Portfolio/VideoPortfolio';
import ModelPortfolio from '../../sections/Portfolio/ModelPortfolio';
import Footer from '../../components/ui/Footer';
import BackToTop from '../../components/ui/BackToTop';
import SEO from '../../components/SEO';
import ChatBot from '../../components/ui/ChatBot';

const AboutSection = lazy(() => import('../../sections/About/AboutSection'));
const ServicesSection = lazy(() => import('../../sections/Services/ServicesSection'));
const TestimonialsSection = lazy(() => import('../../sections/Testimonials/TestimonialsSection'));
const StatsSection = lazy(() => import('../../sections/stats/statsSection'));
const ContactSection = lazy(() => import('../../sections/ContactSection/ContactSection'));

/**
 * Main landing page – assembles all sections in order.
 * Lenis smooth-scroll is initialised here.
 */
const LandingPage = () => {
  // Initialise Lenis smooth scroll with slight parallax feel
  useLenis();

  return (
    <main>
      <SEO 
        title="Plastic Renders | Premium 3D Design & Video Editing"
        description="Professional 3D modeling, photorealistic rendering, and cinematic video editing services. We transform your vision into premium digital experiences."
        name="Plastic Renders"
        image="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1200"
      />
      <HeroSection />
      <VideoPortfolio />
      <ModelPortfolio />
      <Suspense fallback={null}>
        <AboutSection />
        <ServicesSection />
        <TestimonialsSection />
        <StatsSection />
        <ContactSection />
      </Suspense>
      <Footer />
      <BackToTop />
      <ChatBot />
    </main>
  );
};

export default LandingPage;