import FAQs from "@/components/FAQs";
import Features from "@/components/features";
import { Footer } from "@/components/footer";
import { LandingHero } from "@/components/landing-hero";
import { LandingNavbar } from "@/components/landing-navbar";
import Pricing from "@/components/pricing";

const LandingPage = () => {
  // Here wrong setting 
  return (
    <div id="startPage" className="  bg-black overflow-x-hidden pt-[72px]">
      {/* Navbar at the top */}
      <LandingNavbar />

        {/* Landing Hero Section */}
        <LandingHero />

        {/* Other Sections */}
        <Features />

        <Pricing />
        <FAQs />

        {/* Footer at the bottom */}
        <Footer />
    </div>
  );
};

export default LandingPage;
