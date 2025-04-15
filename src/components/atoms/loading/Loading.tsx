
const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent border-primary dark:border-black"></div>
    </div>
  );
};

export default LoadingSpinner;
