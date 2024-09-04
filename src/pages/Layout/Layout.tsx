import style from "./Layout.module.scss";
import Account from "../../component/Account/Account";
import { PromocodeModal } from "../../component/PromocodeModal";
import { SideBar } from "../../component/Sidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function Layout() {
  const promoCheck = true;

  return (
    <>
      <Account>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <div className={style.mainBlock}>
          <SideBar />
          <div className={style.rightBlock}>
            <Outlet />
            <PromocodeModal isPromoCheck={promoCheck} />
          </div>
        </div>
      </Account>
    </>
  );
}

export default Layout;
