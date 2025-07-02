import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the current device is mobile
 * @returns {boolean} True if the device is mobile, false otherwise
 */
const useMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Function to check if the device is mobile
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
    };

    // Check initially
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return isMobile;
};

export default useMobile;
