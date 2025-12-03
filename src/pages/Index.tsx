import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import BeforeAfterSection from '@/components/BeforeAfterSection';
import PortfolioSection from '@/components/PortfolioSection';
import ProcessSection from '@/components/ProcessSection';
import PricingSection from '@/components/PricingSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Preloader from '@/components/Preloader';

export default function Index() {
  return (
    <>
      <Helmet>
        <title>Wall Art | Portable UV Wall Printing Pakistan | 3D Murals & Truck Art</title>
        <meta
          name="description"
          content="Transform any wall into stunning art with Wall Art. Portable UV wall printing, 3D murals, Pakistani truck art, wedding backdrops. Serving KPK & Islamabad. Starting ₹25,000."
        />
        <meta
          name="keywords"
          content="wall printer Abbottabad, 3D wall printing Pakistan, truck art mural, UV wall printing, wedding backdrop printing, café wall art, Islamic calligraphy wall, eagle mural Pakistan"
        />
        <meta property="og:title" content="Wall Art | Transform Any Wall Into Art" />
        <meta
          property="og:description"
          content="Portable UV wall printing services in Pakistan. 3D murals, truck art, wedding backdrops starting ₹25,000."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://abbottabadwallart.com" />
      </Helmet>

      <Preloader />
      <Navbar />
      
      <main>
        <HeroSection />
        <ServicesSection />
        <BeforeAfterSection />
        <PortfolioSection />
        <ProcessSection />
        <PricingSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
