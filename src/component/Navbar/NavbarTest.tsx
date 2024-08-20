import style from "./Navbar.module.scss";
import { navItems } from "../../types/NavArr";
import { ScrollSpy } from "../ScrollSpy";

export interface navProps {
  icon?: string;
  label: string;
  children?: [{}];
}

export const Navbar: React.FC = () => {
  return (
    <nav>
      <div
        className="menu menu-default flex flex-col w-full max-w-56 p-0"
        data-menu="true"
      >
        {navItems.map((item) => (
          <div
            className="menu-item"
            data-menu-item-toggle="accordion"
            data-menu-item-trigger="click"
          >
            <a className={`${style.pageLink} menu-link`} href="#">
              <span className="menu-icon">
                <i className={item.icon}></i>
              </span>
              <span className="menu-title">{item.label}</span>
              <span className="menu-arrow">
                <i className="ki-outline ki-plus menu-item-show:hidden"></i>
                <i className="ki-outline ki-minus hidden menu-item-show:block"></i>
              </span>
            </a>
            <div className="menu-accordion">
              <div className="menu-item">
                <a className="menu-link" href="#">
                  <span className="menu-icon">
                    <i className="ki-outline ki-user-square"></i>
                  </span>
                  <span className="menu-title">Submenu item 1</span>
                </a>
              </div>
            </div>
          </div>
        ))}
        <div
          className="menu-item"
          data-menu-item-toggle="accordion"
          data-menu-item-trigger="click"
        >
          <a className={`${style.menuHead} menu-link`} href="#">
            <span className="menu-title">user</span>
            <span className="menu-arrow">
              <i className="ki-outline ki-plus menu-item-show:hidden"></i>
              <i className="ki-outline ki-minus hidden menu-item-show:block"></i>
            </span>
          </a>
          <div className="menu-accordion">
            <div className="menu-item">
              <a href="#">Settings</a>
            </div>
          </div>
        </div>
        <div
          className="menu-item"
          data-menu-item-toggle="accordion"
          data-menu-item-trigger="click"
        >
          <a className={`${style.menuHead} menu-link`} href="#">
            <span className="menu-title">miscellaneous</span>
            <span className="menu-arrow">
              <i className="ki-outline ki-plus menu-item-show:hidden"></i>
              <i className="ki-outline ki-minus hidden menu-item-show:block"></i>
            </span>
          </a>
          <div className="menu-accordion">
            <div className="menu-item">
              <a className="menu-link" href="#">
                <span className="menu-icon">
                  <i className="ki-outline ki-user-square"></i>
                </span>
                <span className="menu-title">Submenu item 1</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
