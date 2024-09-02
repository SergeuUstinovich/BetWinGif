import { useDispatch, useSelector } from "react-redux";
import { ScrollSpy } from "../ScrollSpy";
import style from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import { getTokenUser } from "../../providers/StoreProvider/selectors/getTokenUser";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../../api/authUser";
import { tokenActions } from "../../providers/StoreProvider";
import { queryClient } from "../../api/queryClient";
import { getAdminCheck } from "../../providers/StoreProvider/selectors/getAdminCheck";
import { useTranslation } from "react-i18next";

export const Navbar = () => {
  const { t } = useTranslation();
  const token = useSelector(getTokenUser);
  const dispatch = useDispatch();
  const admin = useSelector(getAdminCheck);

  const mutateLogout = useMutation(
    {
      mutationFn: (data: { token }) => logoutUser(data.token),
      onSuccess: () => {
        dispatch(tokenActions.logout());
      },
    },
    queryClient
  );

  const handleLogout = () => {
    mutateLogout.mutate({ token });
  };

  return (
    <nav>
      <div className="menu menu-default flex flex-col w-full" data-menu="true">
        <div
          className="menu-item"
          data-menu-item-toggle="accordion"
          data-menu-item-trigger="click"
        >
          <Link className={`${style.pageLink} menu-link`} to="/">
            <span className="menu-icon">
              <i className="ki-filled ki-note"></i>
            </span>
            <span className="menu-title">{t("Static banner")}</span>
          </Link>
        </div>
        <div
          className="menu-item"
          data-menu-item-toggle="accordion"
          data-menu-item-trigger="click"
        >
          <Link className={`${style.pageLink} menu-link`} to="/gif-banners">
            <span className="menu-icon">
              <i className="ki-filled ki-note-2"></i>
            </span>
            <span className="menu-title">{t("Gif banner")}</span>
          </Link>
        </div>
        <div
          className="menu-item"
          data-menu-item-toggle="accordion"
          data-menu-item-trigger="click"
        >
          <Link className={`${style.pageLink} menu-link`} to="#">
            <span className="menu-icon">
              <i className="ki-filled ki-note-2"></i>
            </span>
            <span className="menu-title">Football/Sport</span>
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
          </div>
        </div>
        <div
          className="menu-item"
          data-menu-item-toggle="accordion"
          data-menu-item-trigger="click"
        >
          <a className={`${style.menuHead} menu-link`} href="#">
            <span className={`${style.menuHeadTitle} menu-title`}>
              {t("User")}
            </span>
            <span className="menu-arrow">
              <i className="ki-outline ki-plus menu-item-show:hidden"></i>
              <i className="ki-outline ki-minus hidden menu-item-show:block"></i>
            </span>
          </a>
          <div className="menu-accordion">
            <div className="menu-item">
              <div
                className="menu-item"
                data-menu-item-toggle="accordion"
                data-menu-item-trigger="click"
              >
                <a className={`${style.pageLink} menu-link`} href="#">
                  <span className="menu-icon">
                    <i className="ki-filled ki-setting-2"></i>
                  </span>
                  <span className="menu-title">{t("Setting")}</span>
                  <span className="menu-arrow">
                    <i className="ki-outline ki-plus menu-item-show:hidden"></i>
                    <i className="ki-outline ki-minus hidden menu-item-show:block"></i>
                  </span>
                </a>
                <div className="menu-accordion">
                  <div className="menu-item">
                    <ScrollSpy />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span className={`${style.menuHead}`}>
          <span className={`${style.menuHeadTitle} menu-title`}>
            MISCELLANEOUS
          </span>
        </span>
        {admin && (
          <div className="menu-item">
            <Link
              className={`${style.pageLink} menu-link`}
              to={"admin-meneger"}
            >
              <span className="menu-icon">
                <i className="ki-filled ki-some-files"></i>
              </span>
              <span className="menu-title">{t("My manager")}</span>
            </Link>
          </div>
        )}
      </div>
      <button onClick={handleLogout} className={style.logout}>
        {t("Sing out")}
      </button>
    </nav>
  );
};
