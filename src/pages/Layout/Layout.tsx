import Account from "../../component/Account/Account";
import { SideBar } from "../../component/Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Account>
        <div className="flex">
          <SideBar />
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </Account>
    </>
  );
}

export default Layout;
