import Features from "@/components/features";
import { Footer } from "@/components/footer";
import { LandingContent } from "@/components/landing-content";
import { LandingHero } from "@/components/landing-hero";
import { LandingNavbar } from "@/components/landing-navbar";
import Pricing from "@/components/pricing";

const LandingPage = () => {
    return (
      <div className="h-full w-full"> 
        <LandingNavbar />
        <LandingHero />
        <Features />
        <Pricing />
      </div>
    );
}

export default LandingPage;
