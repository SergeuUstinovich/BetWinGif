import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTokenUser } from "../../providers/StoreProvider/selectors/getTokenUser";
import { ReactNode, useEffect } from "react";

interface AccountProps {
  children: ReactNode;
}

function Account({ children }: AccountProps) {
//   const token = useSelector(getTokenUser);
//   const navigator = useNavigate();

//   useEffect(() => {
//     if (token) {
//       navigator("/");
//     }
//   }, [token]);

  return <>{children}</>;
}

export default Account;
