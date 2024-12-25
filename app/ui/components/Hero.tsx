import Image from "next/image";
const Hero = () => {
  return (
    <div className="flex-1 bg-hero-bg grid grid-cols-2">
      <div className="h-full flex flex-col gap-8 justify-center pl-8 border-r border-r-black">
        <h1 className="font-display text-7xl">Your stories <br></br> meet the world</h1>
        <p className="text-3xl">Share your thoughts and read everyone else's</p>
        <button className="w-fit bg-main text-white font-display-secondary rounded-full text-2xl py-2 px-6">Read now</button>
      </div>
      <div className="h-full flex items-center justify-center">
        <Image className="h-5/6 w-auto" src={'/hero.png'} width={450} height={750} alt="Female reporter looking up"/>
      </div>
    </div>
  );
}
export default Hero;