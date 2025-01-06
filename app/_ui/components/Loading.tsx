import "@/app/_ui/stylesheets/loading.css";

interface LoadingProps {
  className?: string;
}

const Loading = ({ className }: LoadingProps) => {
  return (
    <div>
      <span className={"spinner " + className}></span>
    </div>
  );
};

export default Loading;
