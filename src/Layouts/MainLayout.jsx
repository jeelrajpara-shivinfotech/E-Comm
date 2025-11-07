import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { titleConst, titles } from "../common/constants/routeConsts";

export default function MainLayout() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const title = titles[path] || titleConst.ecomm;
    document.title = `${title} /${titleConst.ecomm}`;
    
  }, [location]);

  return (
    <div>
      <Outlet />
    </div>
  );
}
