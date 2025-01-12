import Hero from "./_ui/components/home/Hero";
import HomeHeader from "./_ui/components/home/HomeHeader";
import { Metadata } from "next";
import { AuthGuard } from "./contexts/AuthContext";

export const metadata: Metadata = {
  title: "Home Page",
  description: "This is the home page",
};

export default function Home() {
  return (
    <AuthGuard requireAuth={false} requireClient={true} redirectTo="/blogs">
      <div className="h-full flex flex-col ">
        <HomeHeader />
        <Hero />
      </div>
    </AuthGuard>
  );
}
