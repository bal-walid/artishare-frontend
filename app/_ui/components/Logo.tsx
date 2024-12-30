interface LogoProps {
  className?: String;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div
      className={`font-display bg-main text-white text-6xl  ${className}`}
    >
      ArtiShare
    </div>
  );
};

export default Logo;
