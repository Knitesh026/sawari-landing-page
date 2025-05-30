
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-6 text-[#FD9D00]">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        <p className="text-gray-500 mb-6">
          We couldn't find the page you are looking for.
        </p>
        <Link to="/" className="inline-flex items-center justify-center px-5 py-2.5 bg-[#FD9D00] hover:bg-[#FD9D00]/90 text-white rounded-md transition-colors">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
