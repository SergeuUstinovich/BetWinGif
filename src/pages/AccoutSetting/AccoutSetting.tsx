import { useSelector } from "react-redux";
import DeleteAccount from "../../component/DeleteAccount/DeleteAccount";
import LanguageSwitch from "../../component/LanguageSwitch/LanguageSwitch";
import SetPassword from "../../component/SetPassword/SetPassword";
import { getUser } from "../../providers/StoreProvider/selectors/getUser";
import DeleteGoogleAc from "../../component/DeleteGoogleAc/DeleteGoogleAc";
import PromoPath from "../../component/PromoPath/PromoPath";

function AccoutSetting() {
  const isgoogle = useSelector(getUser);

  return (
    <>
      <LanguageSwitch />
      <PromoPath />
      {!isgoogle?.is_google_profile ? (
        <div>
          <SetPassword />
          <DeleteAccount />
        </div>
      ) : (
        <DeleteGoogleAc />
      )}
    </>
  );
}

export default AccoutSetting;
