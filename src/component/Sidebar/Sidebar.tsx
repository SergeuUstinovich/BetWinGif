import style from "./SideBar.module.scss";
import Logo from "../../assets/img/png/betWinnerLogo.png";
import { Navbar } from "../Navbar";
import { Link } from "react-router-dom";
import { Button } from "../../ui";
import { SidebarLine } from "../../assets/svg/SidebarLineSvg";
export const SideBar = () => {


  return (
    <aside className={style.aside}>
      <Link className={style.logo} to={"/"}>
        <img src={Logo} alt="Logo" />
      </Link>
      <Button className={style.closeButton}>
        <SidebarLine />
      </Button>
      <Navbar />
    </aside>
  );
};
