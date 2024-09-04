import style from "./Layout.module.scss";
import Account from "../../component/Account/Account";
import { PromocodeModal } from "../../component/PromocodeModal";
import { SideBar } from "../../component/Sidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { getUser } from "../../providers/StoreProvider/selectors/getUser";


function Layout() {
  const promocode = useSelector(getUser);
  
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
            <PromocodeModal isPromoCheck={promocode?.promocode} />
          </div>
        </div>
      </Account>
    </>
  );
}

export default Layout;
