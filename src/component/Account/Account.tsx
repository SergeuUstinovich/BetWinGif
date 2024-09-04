import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTokenUser } from "../../providers/StoreProvider/selectors/getTokenUser";
import { ReactNode, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { profileUser } from "../../api/authUser";
import { queryClient } from "../../api/queryClient";
import { allPicture } from "../../api/adminImg";
import { getUser } from "../../providers/StoreProvider/selectors/getUser";

interface AccountProps {
  children: ReactNode;
}

function Account({ children }: AccountProps) {
  const token = useSelector(getTokenUser)
  const admin = useSelector(getUser)

   const queryUser = useQuery({
    queryKey: ['user'],
    queryFn: () => profileUser(token),
    enabled: !!token,
    retry: 1,
   }, queryClient)

   useEffect(() => {
    if(queryUser.data) {
      console.log(queryUser.data)
    }
   }, [queryUser.data])

   const queryImg = useQuery({
    queryKey: ['img'],
    queryFn: () => allPicture(),
    // enabled: !!admin.is_admin,
    retry: 1,
   }, queryClient)

   useEffect(() => {
    if(queryImg.data) {
      console.log(queryImg.data)
    }
   }, [queryImg.data])


  return <>{children}</>;
}

export default Account;
