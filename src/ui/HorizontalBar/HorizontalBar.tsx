import { Button } from "../Button";

export const HorizontalBar = () => {
  return (
    <div>
      <div
        className="menu menu-default flex justify-center border rounded-lg gap-1 p-2"
        data-menu="true"
      >
        <div className="menu-item">
          <a className="menu-link" href="#">
            <span className="menu-title">Страна</span>
          </a>
        </div>
        <div
          className="menu-item"
          data-menu-item-placement="bottom-start"
          data-menu-item-toggle="dropdown"
          data-menu-item-trigger="hover"
        >
          <a className="menu-link" href="#">
            <span className="menu-title">Язык</span>
            <span className="menu-arrow">
              <i className="ki-outline ki-down"></i>
            </span>
          </a>
          <div className="menu-dropdown w-48 py-2">
            <div className="menu-item">
              <a className="menu-link" href="#">
                <span className="menu-icon">
                  <i className="ki-outline ki-badge"></i>
                </span>
                <span className="menu-title">Submenu item 1</span>
              </a>
            </div>
            <div className="menu-item">
              <a className="menu-link" href="#">
                <span className="menu-icon">
                  <i className="ki-outline ki-profile-circle"></i>
                </span>
                <span className="menu-title">Submenu item 1</span>
              </a>
            </div>
            <div className="menu-item">
              <a className="menu-link" href="#">
                <span className="menu-icon">
                  <i className="ki-outline ki-badge"></i>
                </span>
                <span className="menu-title">Submenu item 3</span>
              </a>
            </div>
          </div>
        </div>
        <div
          className="menu-item mr-auto"
          data-menu-item-placement="bottom-start"
          data-menu-item-toggle="dropdown"
          data-menu-item-trigger="hover"
        >
          <a className="menu-link" href="#">
            <span className="menu-title">Валюта</span>
            <span className="menu-arrow">
              <i className="ki-outline ki-down"></i>
            </span>
          </a>
          <div className="menu-dropdown w-48 py-2">
            <div className="menu-item">
              <a className="menu-link" href="#">
                <span className="menu-icon">
                  <i className="ki-outline ki-message-programming"></i>
                </span>
                <span className="menu-title">Submenu item 1</span>
              </a>
            </div>
            <div className="menu-item">
              <a className="menu-link" href="#">
                <span className="menu-icon">
                  <i className="ki-outline ki-coffee"></i>
                </span>
                <span className="menu-title">Submenu item 2</span>
              </a>
            </div>
            <div className="menu-item">
              <a className="menu-link" href="#">
                <span className="menu-icon">
                  <i className="ki-outline ki-icon"></i>
                </span>
                <span className="menu-title">Submenu item 3</span>
              </a>
            </div>
          </div>
        </div>
        <Button>Generare Now</Button>
      </div>
    </div>
  );
};
