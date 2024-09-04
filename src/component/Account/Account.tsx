import { ReactNode } from "react";

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
