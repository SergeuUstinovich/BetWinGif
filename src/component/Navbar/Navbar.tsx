import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getTokenUser } from "../../providers/StoreProvider/selectors/getTokenUser";
import { getUser } from "../../providers/StoreProvider/selectors/getUser";
import { logoutUser } from "../../api/authUser";
import { tokenActions } from "../../providers/StoreProvider";
import { queryClient } from "../../api/queryClient";
import style from "./Navbar.module.scss";
import { navItems } from "./NavData";
import NavbarItem from "./NavBarItem";

const Navbar = () => {
  const { t } = useTranslation();
  const token = useSelector(getTokenUser);
  const dispatch = useDispatch();
  const admin = useSelector(getUser);
  const [openItems, setOpenItems] = useState({});

  const mutateLogout = useMutation(
    {
      mutationFn: (data: { token: string }) => logoutUser(data.token),
      onSuccess: () => {
        dispatch(tokenActions.logout());
      },
    },
    queryClient
  );

  const handleLogout = () => {
    mutateLogout.mutate({ token });
  };

  const toggleOpen = (id) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <nav>
      <div className="menu menu-default flex flex-col w-full" data-menu="true">
        {navItems.map((item) => (
          <NavbarItem
            key={item.id}
            item={item}
            isOpen={openItems}
            toggleOpen={toggleOpen}
          />
        ))}
        <span className={`${style.menuHead}`}>
          <span className={`${style.menuHeadTitle} menu-title`}>
            MISCELLANEOUS
          </span>
        </span>
        <div className="menu-item">
          {admin?.is_admin && (
            <Link
              className={`${style.pageLink} menu-link`}
              to={"admin-meneger"}
            >
              <span className="menu-icon">
                <i className="ki-filled ki-some-files"></i>
              </span>
              <span className="menu-title">{t("My manager")}</span>
            </Link>
          )}
        </div>
      </div>
      <button onClick={handleLogout} className={style.logout}>
        {t("Sing out")}
      </button>
    </nav>
  );
};

export default Navbar;
