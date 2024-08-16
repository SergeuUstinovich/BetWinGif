import { Outlet } from "react-router-dom";
import style from "./Auth.module.scss";
import imgAuth from "../../assets/img/jpg/authBg.jpg";

function Auth() {
  return (
    <div className="container-fluid">
      <div className={`${style.boxAuth} py-5`}>
        <div className={style.boxLeft}>
          <div className={style.authForm}>
            <Outlet />
          </div>
        </div>
        <div>
          <img className={style.img} src={imgAuth} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Auth;
