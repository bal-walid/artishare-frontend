import Hero from "./_ui/components/Hero";
import HomeHeader from "./_ui/components/HomeHeader";
import SubSection from "./_ui/components/subSectionLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Page",
  description: "This is the home page",
};

export default function Home() {
  return (
    <div className="flex-1 flex flex-col ">
      <SubSection animationType="top-to-bottom">
        <HomeHeader />
      </SubSection>

      <SubSection
        animationType="bottom-to-top"
        className="flex-1 flex flex-col"
      >
        <Hero />
      </SubSection>
    </div>
  );
}
