import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import style from "./Navbar.module.scss";

function NavbarItem({ item, isOpen, toggleOpen, isAdmin }) {
  const { t } = useTranslation();
  const location = useLocation();

  const handleToggle = () => {
    toggleOpen(item.id);
  };

  if (item.adminOnly && !isAdmin) {
    return null;
  }

  if (item.type === 'section') {
    return (
      <span className={`${style.menuHead}`}>
        <span className={`${style.menuHeadTitle} menu-title`}>
          {t(item.label)}
        </span>
      </span>
    );
  }

  return (
    <div
      className="menu-item"
      data-menu-item-toggle="accordion"
      data-menu-item-trigger="click"
    >
      {item.path && (
        <Link
          className={`${style.pageLink} ${style.scrollSpyElement} menu-link`}
          to={item.path}
          onClick={item.children ? handleToggle : null}
        >
          <span className="menu-icon">
            <i className={`ki-filled ${item.icon}`}></i>
          </span>
          <span
            className={
              location.pathname === item.path
                ? `${style.active} menu-title`
                : "menu-title"
            }
          >
            {t(item.label)}
          </span>
          {item.children && (
            <span className="menu-arrow">
              <i
                className={`ki-outline ${
                  isOpen[item.id] ? "ki-minus" : "ki-plus"
                } `}
              ></i>
            </span>
          )}
        </Link>
      )}

      <div
        className={`${style.menuAccordion} ${
          isOpen[item.id] ? style.open : ""
        }`}
      >
        {item.children && isOpen[item.id] && (
          <>
            {item.children.map((child) => (
              <NavbarItem
                key={child.id}
                item={child}
                isOpen={isOpen}
                toggleOpen={toggleOpen}
                isAdmin={isAdmin}
              />
            ))}
          </>
        )}
      </div>
      {item.component && <item.component />}
    </div>
  );
}

export default NavbarItem;
