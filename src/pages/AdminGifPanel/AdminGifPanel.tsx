import style from "./AdminGifPanel.module.scss";
import LoadImgServ from "../../component/LoadImgServ/LoadImgServ";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../providers/StoreProvider/selectors/getUser";
import { allGif } from "../../api/adminImg";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { useEffect, useState } from "react";
import { adminImgActions } from "../../providers/StoreProvider/slice/adminImgSlice";
import { Outlet } from "react-router-dom";
import { getAdminGif } from "../../providers/StoreProvider/selectors/getAdminGif";
import DynamicGifAdmin from "../../AdminComponent/DynamicGifAdmin/DynamicGifAdmin";
import FilterAdminGif from "../../AdminComponent/FilterAdminGif/FilterAdminGif";
import { adminGifType } from "../../types/adminGifType";
import { adminGifActions } from "../../providers/StoreProvider/slice/adminGifSlice";

function AdminGifPanel() {
  const admin = useSelector(getUser);
  const gifAdmin = useSelector(getAdminGif);
  const dispatch = useDispatch();
  const [arrImg, setArrImg] = useState<adminGifType[]>();

  useEffect(() => {
    if (Array.isArray(gifAdmin)) {
      if (gifAdmin) {
        setArrImg(gifAdmin);
      }
    }
  }, [gifAdmin]);

  const queryImg = useQuery(
    {
      queryKey: ["adminGif"],
      queryFn: () => allGif(),
      enabled: !!admin?.is_admin,
      retry: 1,
    },
    queryClient
  );

  useEffect(() => {
    if (queryImg.data) {
      dispatch(adminGifActions.adminGifAdd(queryImg.data));
    }
  }, [queryImg.data]);

  return (
    <>
      <div className={style.adminPanelBlock}>
        <LoadImgServ />
        <div className={style.adminPanelBlockRight}>
          <div className={style.adminPanelBlockUpper}>
            <FilterAdminGif />
            <DynamicGifAdmin images={arrImg} />
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
export default AdminGifPanel;
