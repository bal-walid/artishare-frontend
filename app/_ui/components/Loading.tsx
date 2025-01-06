import "@/app/_ui/stylesheets/loading.css";

interface LoadingProps {
  className?: string;
}

const Loading = ({ className = "" }: LoadingProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <span className={"spinner " + className}></span>
    </div>
  );
};

export default Loading;
