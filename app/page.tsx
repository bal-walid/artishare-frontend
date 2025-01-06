import Hero from "./_ui/components/home/Hero";
import HomeHeader from "./_ui/components/home/HomeHeader";
import SubSection from "./_ui/components/subSectionLayout";
import { Metadata } from "next";
// import { useAuthContext } from "./contexts/AuthContext";
// import { useRouter } from "next/router";

export const metadata: Metadata = {
  title: "Home Page",
  description: "This is the home page",
};

export default function Home() {
  // const { isAuthenticated } = useAuthContext();
  // const router = useRouter();
  // if (isAuthenticated) {
  //   router.push("/blogs");
  // }
  return (
    <div className="h-full flex flex-col ">
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
