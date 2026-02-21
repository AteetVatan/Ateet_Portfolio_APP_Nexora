
import { useLocation, Link } from "react-router-dom";
import SEOHead from '../components/SEOHead';

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--mono-bg)' }}>
      <SEOHead
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Return to Ateet Vatan's portfolio."
        robots="noindex,nofollow"
      />
      <main className="text-center z-10 px-4">
        <h1 className="font-heading font-bold mb-4" style={{ fontSize: '120px', color: 'var(--mono-primary)' }}>404</h1>
        <p className="text-xl mb-6" style={{ color: 'var(--mono-muted)' }}>Page not found</p>
        <Link to="/" className="btn-primary inline-block">
          Return Home
        </Link>
      </main>
    </div>
  );
};

export default NotFound;
