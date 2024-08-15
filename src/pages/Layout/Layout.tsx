import { useTranslation } from "react-i18next";
import { Accordion, SideBar, HorizontalBar } from "../../ui";
import style from "./Layout.module.scss";

function Layout() {
  const { t, i18n } = useTranslation(); // можно передать подгружаемый файл 'main.json'

  const toggle = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <>
      <div className="flex">
        <SideBar />
        <div>
          <HorizontalBar />
          <Accordion />
          <select onChange={(e) => toggle(e.target.value)}>
            <option value="en">English</option>
            <option value="ru">Русский</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="zh">中文</option>
            <option value="ja">日本語</option>
            <option value="ko">한국어</option>
            <option value="ar">العربية</option>
            <option value="pt">Português</option>
            <option value="it">Italiano</option>
          </select>
          <div>{t('Hello')}</div>
        </div>
      </div>
    </>
  );
}

export default Layout;
