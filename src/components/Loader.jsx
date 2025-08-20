import { useState, useEffect } from "react";

function Loader() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center py-10 space-y-4">
      <div className="relative flex justify-center items-center">
        {/* Outer Ring */}
        <div className="absolute animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 opacity-50"></div>
        {/* Middle Ring */}
        <div className="absolute animate-spin rounded-full h-12 w-12 border-t-4 border-blue-400 opacity-75" style={{ animationDuration: "1.2s" }}></div>
        {/* Inner Ring */}
        <div className="absolute animate-spin rounded-full h-8 w-8 border-t-4 border-blue-200" style={{ animationDuration: "0.8s" }}></div>
      </div>
      <p className="text-gray-600 text-lg font-semibold">
        Завантаження{dots}
      </p>
    </div>
  );
}

export default Loader;