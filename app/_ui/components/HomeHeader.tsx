import Logo from "./Logo";

import Logo from "./Logo";

const HomeHeader = () => {
  return (
    <nav className="flex items-center pr-12 gap-10 border-b border-black">
      {/* Logo */}
      <Logo className={"py-4 px-8 text-white bg-main text-6xl"}/>
      <a
        href=" "
        className="text-xl border-b-2 border-transparent  hover:border-main text-main/80 hover:text-main"
      >
        About
      </a>
      <div className="flex items-center ml-auto text-xl gap-6">
        <a
          href=""
          className="bg-hero-bg hover:bg-white hover:-translate-y-0.5 text-black rounded-lg py-2 px-4 text-2xl font-display-secondary"
        >
          Sign In
        </a>
        <a
          className="bg-main hover:bg-main/70 hover:-translate-y-0.5 text-white rounded-md py-2 px-4 text-2xl font-display-secondary"
          href=""
        >
          Get Started
        </a>
      </div>
    </nav>
  );
};
export default HomeHeader;
