import style from "./SideBar.module.scss";
import Logo from "../../assets/betWinnerLogo.png";
import { Link } from "react-router-dom";

export const SideBar = () => {
  return (
    <aside className={style.aside}>
      <a className={style.logo} href="">
        <img src={Logo} alt="Logo" />
      </a>
      <div
        className="menu menu-default flex flex-col rounded-lg w-full max-w-56"
        data-menu="true"
      >
        <div className="menu-item">
          <Link className="menu-link" to="static-banners">
            <span className="menu-icon">
              <i className="ki-outline ki-badge"></i>
            </span>
            <span className="menu-title">Static Banners</span>
          </Link>
        </div>
        <div className="menu-item">
          <Link className="menu-link" to="static-banners">
            <span className="menu-icon">
              <i className="ki-outline ki-badge"></i>
            </span>
            <span className="menu-title">Gif Banners</span>
          </Link>
        </div>
        <div
          className="menu-item"
          data-menu-item-toggle="accordion"
          data-menu-item-trigger="click"
        >
          <a className="menu-link" href="#">
            <span className="menu-icon">
              <i className="ki-outline ki-message-programming"></i>
            </span>
            <span className="menu-title">Submenu 2</span>
            <span className="menu-arrow">
              <i className="ki-outline ki-plus menu-item-show:hidden"></i>
              <i className="ki-outline ki-minus hidden menu-item-show:block"></i>
            </span>
          </a>
          <div className="menu-accordion">
            <div className="menu-item">
              <a className="menu-link" href="#">
                <span className="menu-icon">
                  <i className="ki-outline ki-calendar-2"></i>
                </span>
                <span className="menu-title">Submenu item 1</span>
              </a>
            </div>
            <div className="menu-item">
              <Link className="menu-link" to="integrations">
                <span className="menu-icon">
                  <i className="ki-outline ki-question"></i>
                </span>
                <span className="menu-title">Integrations</span>
              </Link>
            </div>
            <div className="menu-item">
              <a className="menu-link" href="#">
                <span className="menu-icon">
                  <i className="ki-outline ki-user"></i>
                </span>
                <span className="menu-title">Submenu item 3</span>
              </a>
            </div>
          </div>
        </div>
        <div className="menu-item">
          <Link className="menu-link" to="my-manager">
            <span className="menu-icon">
              <i className="ki-outline ki-badge"></i>
            </span>
            <span className="menu-title">My manager</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};
