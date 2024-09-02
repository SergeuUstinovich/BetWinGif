import style from "./SideBar.module.scss";
import Logo from "../../assets/img/png/betWinnerLogo.webp";
import { Navbar } from "../Navbar";
import { Link } from "react-router-dom";
import { Button } from "../../ui";
import { SidebarLine } from "../../assets/svg/SidebarLineSvg";
import { NavbarMobileSvg } from "../../assets/svg/NavbarMobileSvg";
export const SideBar = () => {
  return (
    <aside className={style.aside}>
      <div className={style.asideUpper}>
        <Link className={style.logo} to={"/"}>
          <img src={Logo} alt="Logo" />
        </Link>
        <Button className={style.navbarMobileButton}>
          <NavbarMobileSvg />
        </Button>
      </div>
      <Button className={style.closeButton}>
        <SidebarLine />
      </Button>
      <Navbar />
    </aside>
  );
};
