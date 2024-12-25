import HomeHeader from "./ui/components/HomeHeader";
import Hero from "./ui/components/Hero";

export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <HomeHeader/>
      <Hero/>
    </div>
  );
}
