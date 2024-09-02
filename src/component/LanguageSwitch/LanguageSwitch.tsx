import { useTranslation } from "react-i18next";
import style from "./LanguageSwitch.module.scss";
import ListBox from "../../ui/ListBox/ListBox";

function LanguageSwitch() {
  const { t, i18n } = useTranslation(); // можно передать подгружаемый файл 'main.json'

  const toggleLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <ListBox
      defaultValue={t('Language')}
      onChange={toggleLanguage}
      items={[
        { value: "en", content: "English", id: "1" },
        { value: "ru", content: "Русский", id: "2" },
        { value: "fr", content: "Français", id: "3" },
        { value: "es", content: "Español", id: "4" },
        { value: "pr", content: "Português", id: "5" },
      ]}
    />
  );
}

export default LanguageSwitch;
