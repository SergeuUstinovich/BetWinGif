import style from "./SideBar.module.scss";
import Logo from "../../assets/betWinnerLogo.png";
import { Navbar } from "../../component/Navbar";

export const SideBar = () => {
  return (
    <aside className={style.aside}>
      <a className={style.logo} href="">
        <img src={Logo} alt="Logo" />
      </a>
      <Navbar />
    </aside>
  );
};
