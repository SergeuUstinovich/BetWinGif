import style from './AdminPanel.module.scss'
import LoadImgServ from "../../component/LoadImgServ/LoadImgServ";
import MenegerAdmin from "../../component/MenegerAdmin/MenegerAdmin";
import { useSelector } from 'react-redux';
import { getUser } from '../../providers/StoreProvider/selectors/getUser';
import { allPicture } from '../../api/adminImg';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../api/queryClient';
import { useEffect, useState } from 'react';
import AdminRedactor from '../../component/AdminRedactor/AdminRedactor';

function AdminPanel() {
  const admin = useSelector(getUser)
  const [arrImg, setArrImg] = useState()

  const queryImg = useQuery({
    queryKey: ['img'],
    queryFn: () => allPicture(),
    enabled: !!admin?.is_admin,
    retry: 1,
   }, queryClient)

   useEffect(() => {
    if(queryImg.data) {
      setArrImg(queryImg.data)
    }
   }, [queryImg.data])

  return (
    <>
      <div className={style.adminPanelBlock}>
        <LoadImgServ />
        <AdminRedactor images={arrImg} />
        {/* <ImageEditor images={arrImg} /> */}
        {/* <AdminRefactor  arr={arrImg} /> */}
        {/* <MenegerAdmin arr={arrImg} /> */}
      </div>
    </>
  );
}
export default AdminPanel;
