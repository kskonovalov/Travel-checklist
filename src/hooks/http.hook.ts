import { useState, useCallback } from 'react';

const useHttp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | Object>(null);
  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setLoading(true);
      setError(null);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers['Content-Type'] = 'application/json';
        }
        const response = await fetch(url, {
          method,
          body,
          headers
        });
        const data = await response.json();
        setLoading(false);
        if (!response.ok) {
          setError({
            message: data.message || 'Error!',
            errors: data.errors
          });
        }

        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );
  const clearError = useCallback(() => {
    setError(null);
  }, []);
  return { loading, request, error, clearError };
};

export default useHttp;
