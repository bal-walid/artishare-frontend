import Image from "next/image";
import SubSection from "../subSectionLayout";
import Link from "next/link";
const Hero = () => {
  return (
    <div className="flex-1 bg-hero-bg grid grid-cols-2 overflow-hidden w-dvw">
      <SubSection
        animationType="left-to-right"
        className="h-full flex flex-col gap-8 justify-center px-12 border-r border-r-black/50"
      >
        <h1 className="font-display text-7xl">
          Your stories <br></br> meet the world
        </h1>
        <p className="text-3xl">
          Share your thoughts and read everyone else&apos;s
        </p>
        <button className="w-fit bg-main text-white font-display-secondary rounded-full text-2xl py-2 px-6 hover:bg-main/70">
          <Link href={"/blogs"}>Read now</Link>
        </button>
      </SubSection>
      <SubSection
        animationType="right-to-left"
        className="h-full flex items-center justify-center"
      >
        <Image
          className="h-5/6 w-auto"
          src={"/hero.png"}
          width={450}
          height={750}
          alt="Female reporter looking up"
        />
      </SubSection>
    </div>
  );
};
export default Hero;
