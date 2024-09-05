import { useDispatch, useSelector } from "react-redux";
import { getTokenUser } from "../../providers/StoreProvider/selectors/getTokenUser";
import { ReactNode, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { profileUser } from "../../api/authUser";
import { queryClient } from "../../api/queryClient";
import { userActions } from "../../providers/StoreProvider/slice/userSlice";

interface AccountProps {
  children: ReactNode;
}

function Account({ children }: AccountProps) {
  const token = useSelector(getTokenUser);
  const dispatch = useDispatch();

  const queryUser = useQuery(
    {
      queryKey: ["user"],
      queryFn: () => profileUser(token),
      enabled: !!token,
      retry: 1,
    },
    queryClient
  );

  useEffect(() => {
    if (queryUser.data) {
      dispatch(userActions.userData(queryUser.data));
    }
  }, [queryUser.data]);

  return <>{children}</>;
}

export default Account;
