
interface BubbleButtonProps {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
}

const BubbleButton = ({ onClick, isActive, children }: BubbleButtonProps) => {
  return (
    <button
      className={"bubble-btn " + (isActive ? "is-active" : "")}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default BubbleButton;
