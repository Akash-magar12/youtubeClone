import { Outlet, useLocation } from "react-router-dom";
import Header from "../Components/Header";

const AppLayout = () => {
  const location = useLocation();

  return (
    <div
      className={` w-full ${
        location.pathname === "/" ? "overflow-y-hidden" : "overflow-y-auto"
      } h-screen `}
    >
      <Header />
      <Outlet />
    </div>
  );
};

export default AppLayout;
