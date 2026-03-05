import HeroSection from "./HeroSection.jsx";
import StatsSection from "./StatsSection.jsx";
import ServicesSection from "./ServicesSection.jsx";
import FeaturedProducts from "./FeaturedProducts.jsx";
import HowItWorks from "./HowItWorks.jsx";
import TestimonialsSection from "./TestimonialsSection.jsx";

// ⚠️ Ne pas ajouter Navbar/Footer ici — AppLayout s'en charge.
export default function LandingPage() {
    return (
        <>
            <HeroSection />
            <StatsSection />
            <ServicesSection />
            <FeaturedProducts />
            <HowItWorks />
            <TestimonialsSection />
        </>
    );
}