import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Hook to ensure page always starts at the top when loading or refreshing.
 * This provides a clean user experience by scrolling to the top on:
 * - Page refresh
 * - Initial page load
 * - Navigation between pages
 */
export function useScrollRestore() {
  const [location] = useLocation();

  useEffect(() => {
    // Always scroll to top when location changes (page navigation/refresh/load)
    // Using setTimeout to ensure DOM is ready and rendering is complete
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "auto", // "auto" provides instant scroll without animation
      });
    };

    // Small delay to ensure DOM is ready
    setTimeout(scrollToTop, 0);
  }, [location]);
}
