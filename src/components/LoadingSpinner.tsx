import { memo } from "react";

const LoadingSpinner = memo(() => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-500 mb-4"></div>
        <p className="text-gray-600 text-lg font-medium">Loading issues...</p>
        <p className="text-gray-400 text-sm mt-2">Please wait a moment</p>
      </div>
    </div>
  );
});

LoadingSpinner.displayName = "LoadingSpinner";

export default LoadingSpinner;