import { SideBar } from "../../ui";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className="flex">
        <SideBar />
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
