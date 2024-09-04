import { useTranslation } from "react-i18next";
import style from "./LanguageSwitch.module.scss";
import ListBox from "../../ui/ListBox/ListBox";

function LanguageSwitch() {
  const { t, i18n } = useTranslation(); // можно передать подгружаемый файл 'main.json'
  const currentLanguage = i18n.language;

  const toggleLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const items = [
    {
      value: "en",
      content: "English",
      id: "1",
      disabled: currentLanguage === "en",
    },
    {
      value: "ru",
      content: "Русский",
      id: "2",
      disabled: currentLanguage === "ru",
    },
    {
      value: "fr",
      content: "Français",
      id: "3",
      disabled: currentLanguage === "fr",
    },
    {
      value: "es",
      content: "Español",
      id: "4",
      disabled: currentLanguage === "es",
    },
    {
      value: "pr",
      content: "Português",
      id: "5",
      disabled: currentLanguage === "pr",
    },
  ];
  const currentLanguageItem = items.find(
    (item) => item.value === currentLanguage
  );

  return (
    <div className={style.langBox}>
        <p className={style.descr}>{t("Language")}:</p>
        <ListBox
            defaultValue={
                currentLanguageItem ? currentLanguageItem.content : t("Language")
            }
            onChange={toggleLanguage}
            items={items}
            />
    </div>
    
  );
}

export default LanguageSwitch;
