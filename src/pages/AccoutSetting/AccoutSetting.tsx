import DeleteAccount from "../../component/DeleteAccount/DeleteAccount"
import LanguageSwitch from "../../component/LanguageSwitch/LanguageSwitch"
import SetPassword from "../../component/SetPassword/SetPassword"

function AccoutSetting() {
    return (
        <>
        <LanguageSwitch />
        <SetPassword />
        <DeleteAccount />
        </>
        
    )
}

export default AccoutSetting