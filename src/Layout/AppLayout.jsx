import { Outlet, useLocation } from "react-router-dom";
import Header from "../Components/Header";
import SearchMobile from "../Components/SearchMobile";

const AppLayout = () => {
  const location = useLocation();

  return (
    <div
      className={` w-full ${
        location.pathname === "/" ? "overflow-y-hidden" : "overflow-y-auto"
      } h-screen `}
    >
      <Header />
      <SearchMobile />
      <Outlet />
    </div>
  );
};

export default AppLayout;
