
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import GridBackground from '../components/GridBackground';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <GridBackground />
      <div className="text-center z-10 px-4 -ml-10">
        <h1 className="text-6xl font-mono text-[#00c3ff] font-bold mb-4">404_</h1>
        <p className="text-xl text-[#85a5b3] mb-6">Page not found</p>
        <a href="/" className="neon-button">
          RETURN HOME
        </a>
      </div>
    </div>
  );
};

export default NotFound;
