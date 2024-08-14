import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav>
      <ul
        className="menu menu-default flex flex-col rounded-lg w-full max-w-56"
        data-menu="true"
      >
        <li className="menu-item">
          <div
            className="menu-item"
            data-menu-item-toggle="accordion"
            data-menu-item-trigger="click"
          >
            <a className="menu-link" href="#">
              <span className="menu-icon">
                <i className="ki-filled ki-category"></i>
              </span>
              <span className="menu-title">Static Banners</span>
              <span className="menu-arrow">
                <i className="ki-outline ki-plus menu-item-show:hidden"></i>
                <i className="ki-outline ki-minus hidden menu-item-show:block"></i>
              </span>
            </a>
            <div className="menu-accordion">
              <div className="menu-item">
                <a className="menu-link" href="#">
                  <span className="menu-icon">
                    <i className="ki-filled ki-category"></i>
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
            </div>
          </div>
        </li>
        <li className="menu-item">
          <Link className="menu-link" to="static-banners">
            <span className="menu-icon">
              <i className="ki-filled ki-category"></i>
            </span>
            <span className="menu-title">Gif Banners</span>
          </Link>
        </li>
        <div className="menu-separator"></div>
        <li className="menu-item">
          <Link className="menu-link" to="static-banners">
            <span className="menu-icon">
              <i className="ki-filled ki-setting-2"></i>
            </span>
            <span className="menu-title">Settings</span>
          </Link>
        </li>
        <div className="menu-separator"></div>
        <li className="menu-item">
          <Link className="menu-link" to="static-banners">
            <span className="menu-icon">
              <i className="ki-outline ki-badge"></i>
            </span>
            <span className="menu-title">Static Banners</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
