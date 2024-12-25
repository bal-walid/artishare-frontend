const HomeHeader = () => {
  return (
    <nav className="flex items-center pr-12 border-b border-black">
      {/* Logo */}
      <div className="font-display bg-main text-white text-6xl py-4 px-8">ArtiShare</div>
      <div className="flex items-center ml-auto text-xl gap-6">
        <a href="">Sign In</a>
        <a href="">About</a>
        <a className="bg-main text-white rounded-full py-2 px-4 text-2xl font-display-secondary" href="">
          Get Started
        </a>
      </div>
    </nav>
  );
};
export default HomeHeader;
