import Logo from "../Logo";
import Link from "next/link";

const HomeHeader = () => {
  return (
    <nav className="flex items-center pr-12 gap-10 border-b border-black">
      {/* Logo */}
      <Logo className={"py-4 px-8 text-white bg-main text-6xl"} />

      <div className="flex items-center ml-auto text-xl gap-8 pr-6">
      <a
        href=" "
        className="text-main/80 hover:text-main border-b border-b-transparent hover:border-b-main"
      >
        About
      </a>
        <Link
          href="/login"
          className="text-main/80 hover:text-main border-b border-b-transparent hover:border-b-main"
        >
          Sign In
        </Link>
        <Link
          className="bg-main hover:bg-main/70  text-white rounded-xl py-2 px-4 text-2xl font-display-secondary"
          href="/signup"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
};
export default HomeHeader;
