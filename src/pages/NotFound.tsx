
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Page Not Found | Ateet Vatan";
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--mono-bg)' }}>
      <div className="text-center z-10 px-4">
        <h1 className="font-heading font-bold mb-4" style={{ fontSize: '120px', color: 'var(--mono-primary)' }}>404</h1>
        <p className="text-xl mb-6" style={{ color: 'var(--mono-muted)' }}>Page not found</p>
        <Link to="/" className="btn-primary inline-block">
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
