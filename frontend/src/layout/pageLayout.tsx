import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/navbar";

/**
 * Root layout that renders above any page:
 * Navbar at top, then the child route content via Outlet.
 */
const PageLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default PageLayout;