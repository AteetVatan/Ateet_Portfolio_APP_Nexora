
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

/**
 * Component that tracks page views by sending data to the metrics API
 */
const PageViewTracker: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    const trackPageView = async () => {
      try {
        const response = await fetch('https://bidswcansixttbhmwpkj.supabase.co/functions/v1/api/metrics/pageview', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            page_path: location.pathname 
          }),
        });
        
        if (!response.ok) {
          console.error('Failed to track page view:', await response.text());
        } else {
          console.log('Page view tracked successfully:', location.pathname);
        }
      } catch (error) {
        console.error('Error tracking page view:', error);
      }
    };
    
    // Track the page view when the location changes
    trackPageView();
  }, [location.pathname]);
  
  // This component doesn't render anything
  return null;
};

export default PageViewTracker;
