import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

const RouteChangeTracker = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send("pageview"); // sends pageview every time route changes
  }, [location.pathname, location.search]);

  return null; // this component doesn't render anything
};

export default RouteChangeTracker;