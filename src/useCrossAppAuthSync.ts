import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export function useCrossAppAuthSync() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // Tracks if the syncing operation has wrapped up safely
  const [isSynced, setIsSynced] = useState(false);

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    
    if (tokenFromUrl) {
      localStorage.setItem('jwtToken', tokenFromUrl);
      
      // Clean up the URL string
      searchParams.delete('token');
      navigate({
        pathname: window.location.pathname,
        search: searchParams.toString()
      }, { replace: true });
      
      setIsSynced(true);
    } else {
      // If no token in URL, check if we already have one in storage
      if (localStorage.getItem('jwtToken')) {
        setIsSynced(true);
      }
    }
  }, [searchParams, navigate]);

  return isSynced;
}
