interface LogoProps {
  className?: String;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div
      className={`font-display ${className}`}
    >
      ArtiShare
    </div>
  );
};

export default Logo;