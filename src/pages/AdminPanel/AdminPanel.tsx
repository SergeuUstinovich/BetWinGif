import style from './AdminPanel.module.scss'
import LoadImgServ from "../../component/LoadImgServ/LoadImgServ";
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../providers/StoreProvider/selectors/getUser';
import { allPicture } from '../../api/adminImg';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../api/queryClient';
import { useEffect, useState } from 'react';
import { adminImgActions } from '../../providers/StoreProvider/slice/adminImgSlice';
import { getAdminImg } from '../../providers/StoreProvider/selectors/getAdminImg';
import { adImage } from '../../types/adminImgType';
import StatickImgAdmin from '../../component/StatickImgAdmin/StatickImgAdmin';
import { Outlet } from 'react-router-dom';
import FilterAdminPic from '../../component/FilterAdminPic/FilterAdminPic';

function AdminPanel() {
  const admin = useSelector(getUser)
  const imgAdmin = useSelector(getAdminImg)
  const dispatch = useDispatch()
  const [arrImg, setArrImg] = useState<adImage[]>()

  useEffect(() => {
    if(Array.isArray(imgAdmin)) {
        if(imgAdmin) {
          setArrImg(imgAdmin)
        }
    }
  }, [imgAdmin])

  const queryImg = useQuery({
    queryKey: ['img'],
    queryFn: () => allPicture(),
    enabled: !!admin?.is_admin,
    retry: 1,
   }, queryClient)

   useEffect(() => {
    if(queryImg.data) {
      dispatch(adminImgActions.adminImgAdd(queryImg.data))
    }
   }, [queryImg.data])

  return (
    <>
      <div className={style.adminPanelBlock}>
        <LoadImgServ />
        <FilterAdminPic />
        <StatickImgAdmin images={arrImg} />
        <Outlet/>
      </div>
    </>
  );
}
export default AdminPanel;
