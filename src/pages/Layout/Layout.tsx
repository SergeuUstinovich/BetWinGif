import Account from "../../component/Account/Account";
import { PromocodeModal } from "../../component/PromocodeModal";
import { SideBar } from "../../component/Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {

  const promoCheck = true

  return (
    <>
      <Account>
        <div className="flex">
          <SideBar />
          <div className="w-full">
            <Outlet />
            <PromocodeModal isPromoCheck={promoCheck} />
          </div>
        </div>
      </Account>
    </>
  );
}

export default Layout;
