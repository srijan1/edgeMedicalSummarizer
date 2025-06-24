import { useEffect, useState } from 'react';

export function useFrameworkReady() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Framework initialization logic
    const initializeFramework = async () => {
      try {
        // Simulate framework setup
        await new Promise(resolve => setTimeout(resolve, 100));
        setIsReady(true);
      } catch (error) {
        console.error('Framework initialization error:', error);
        setIsReady(true); // Still set to true to prevent blocking
      }
    };

    initializeFramework();
  }, []);

  return isReady;
}