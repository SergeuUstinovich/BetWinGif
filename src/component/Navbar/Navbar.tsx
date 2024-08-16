import { Link } from "react-router-dom";
import style from "./Navbar.module.scss";

export const Navbar: React.FC = () => {
  return (
    <nav>
      <div
        className="menu menu-default flex flex-col w-full max-w-56 p-0"
        data-menu="true"
      >
        <div className="menu-item">
          <Link className={`${style.pageLink} menu-link`} to="/static-banners">
            <span className="menu-icon">
              <i className="ki-filled ki-category"></i>
            </span>
            <span className="menu-title">Static Banner</span>
          </Link>
        </div>
        <div
          className="menu-item"
          data-menu-item-toggle="accordion"
          data-menu-item-trigger="click"
        >
          <Link className={`${style.pageLink} menu-link`} to="/gif-banners">
            <span className="menu-icon">
              <i className="ki-filled ki-category"></i>
            </span>
            <span className="menu-title">Gif Banners</span>
            <span className="menu-arrow">
              <i className="ki-outline ki-plus menu-item-show:hidden"></i>
              <i className="ki-outline ki-minus hidden menu-item-show:block"></i>
            </span>
          </Link>
          <div className="menu-accordion">
            <div className="menu-item">
              <a className="menu-link" href="#">
                <span className="menu-icon">
                  <i className="ki-outline ki-user-square"></i>
                </span>
                <span className="menu-title">Submenu item 1</span>
              </a>
            </div>
            <div className="menu-item">
              <a className="menu-link" href="#">
                <span className="menu-icon">
                  <i className="ki-outline ki-calendar"></i>
                </span>
                <span className="menu-title">Submenu item 2</span>
              </a>
            </div>
            <div className="menu-item">
              <a className="menu-link" href="#">
                <span className="menu-icon">
                  <i className="ki-outline ki-timer"></i>
                </span>
                <span className="menu-title">Submenu item 3</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
