import style from "./SideBar.module.scss";
import Logo from "../../assets/img/png/betWinnerLogo.png";
import { Navbar } from "../Navbar";
import { Link } from "react-router-dom";
import { Button } from "../../ui";
import { SidebarLine } from "../../assets/svg/SidebarLineSvg";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../../api/authUser";
import { queryClient } from "../../api/queryClient";
import { useDispatch, useSelector } from "react-redux";
import { tokenActions } from "../../providers/StoreProvider";
import { getTokenUser } from "../../providers/StoreProvider/selectors/getTokenUser";

export const SideBar = () => {

  const token = useSelector(getTokenUser)
  const dispatch = useDispatch()

  const mutateLogout = useMutation(
    {
      mutationFn: (data: { token }) => logoutUser(data.token),
      onSuccess: () => {
        dispatch(tokenActions.logout())
      }
    },
    queryClient
  );

  const handleLogout = () => {
    mutateLogout.mutate({token})
  }

  return (
    <aside className={style.aside}>
      <Link className={style.logo} to={"/"}>
        <img src={Logo} alt="Logo" />
      </Link>
      <button onClick={handleLogout} className={style.logout}>Sing out</button>
      <Button className={style.closeButton}>
        <SidebarLine />
      </Button>
      <Navbar />
    </aside>
  );
};
