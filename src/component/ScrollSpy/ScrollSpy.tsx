import { Link, useLocation } from "react-router-dom";
import style from "./ScrollSpy.module.scss";

interface scrollSpyProps {
  id: number;
  label: string;
  path: string;
}

const scrollItems: scrollSpyProps[] = [
  {
    id: 1,
    label: "Account Home",
    path: "#",
  },
  {
    id: 2,
    label: "Billing",
    path: "/gif-banners",
  },
  {
    id: 3,
    label: "Security",
    path: "#",
  },
  {
    id: 4,
    label: "Members & Roles",
    path: "#",
  },
  {
    id: 5,
    label: "Integrations",
    path: "#",
  },
  {
    id: 6,
    label: "Notifications",
    path: "#",
  },
  {
    id: 7,
    label: "API Settings",
    path: "#",
  },
];

export const ScrollSpy = () => {
  const location = useLocation();

  return (
    <div className="flex w-full">
      <div
        className="flex flex-col grow relative before:absolute before:left-[11px] before:top-0 before:bottom-0 before:border-l before:border-gray-200 gap-1 shrink-0 w-[125px]"
        data-scrollspy="true"
        data-scrollspy-offset="30px|lg:50px"
        data-scrollspy-target="#scrollable_1"
      >
        {scrollItems.map((item) => (
          <Link
            key={item.id}
            className={`${style.scrollLink} flex items-center relative rounded-lg pl-2.5 pr-2.5 py-2.5 gap-1.5 border border-transparent text-2sm font-medium text-gray-700`}
            data-scrollspy-anchor="true"
            to={item.path}
          >
            <span
              className={
                location.pathname === item.path
                  ? `${style.scrollTextBefore} flex w-1.5 relative before:absolute before:top-0 before:left-px before:size-1.5 before:rounded-full before:-translate-x-2/4 before:-translate-y-2/4`
                  : `flex w-1.5 relative before:absolute before:top-0 before:left-px before:size-1.5 before:rounded-full before:-translate-x-2/4 before:-translate-y-2/4`
              }
            ></span>
            <span
              className={
                location.pathname === item.path
                  ? `${style.scrollText}`
                  : `${!style.scrollText}`
              }
            >
              {item.label}
            </span>
          </Link>
        ))}
        <div
          className="menu-item flex-col-reverse"
          data-menu-item-toggle="accordion"
          data-menu-item-trigger="click"
        >
          <a className="menu-link !m-0 !pl-0" href="#">
            <span className="menu-icon w-4"></span>
            <span className="menu-title !text-gray-500">
              <span className="hidden menu-item-show:block">Show less</span>
              <span className="block menu-item-show:hidden">Show 3 more</span>
            </span>
          </a>
          <div className="menu-accordion menu-no-indent">
            <div className="menu-item">
              <a className="menu-link" href="#">
                <span className="menu-icon">
                  <i className="ki-outline ki-bitcoin"></i>
                </span>
                <span className="menu-title">Menu item 4</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
