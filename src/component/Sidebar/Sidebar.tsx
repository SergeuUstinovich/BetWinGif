import style from "./SideBar.module.scss";
import Logo from "../../assets/img/png/betWinnerLogo.png";
import { Navbar } from "../Navbar";
import { Link } from "react-router-dom";

export const SideBar = () => {
  return (
    <aside className={style.aside}>
      <Link className={style.logo} to={"/"}>
        <img src={Logo} alt="Logo" />
      </Link>
      <Navbar />
    </aside>
  );
};
