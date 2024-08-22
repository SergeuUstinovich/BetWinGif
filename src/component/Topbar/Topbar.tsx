import style from "./Topbar.module.scss";
import { useTranslation } from "react-i18next";
import { Button } from "../../ui/Button";

export const Topbar = () => {
  const { t, i18n } = useTranslation(); // можно передать подгружаемый файл 'main.json'

  const toggle = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={`${style.topBar} flex items-center max-w-[1140px] m-auto`}>
      <select className={`${style.select} select`}>
        <option selected disabled value="">
          Страна
        </option>
        <option value="en">England</option>
        <option value="ru">Россия</option>
        <option value="es">España</option>
        <option value="fr">France</option>
        <option value="de">Deutschland</option>
        <option value="zh">中文</option>
        <option value="ja">日本語</option>
        <option value="ko">한국어</option>
        <option value="ar">العربية</option>
        <option value="pt">Portugal</option>
        <option value="it">Italia</option>
      </select>

      <select
        className={`${style.select} select`}
        onChange={(e) => toggle(e.target.value)}
      >
        <option selected disabled value="">
          Язык
        </option>
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

      <select className={`${style.select} select`}>
        <option selected disabled value="">
          Валюта
        </option>
      </select>

      <select className={`${style.select} select`}>
        <option selected disabled value="">
          Формат
        </option>
      </select>

      <select className={`${style.select} select mr-auto`}>
        <option selected disabled value="">
          Тематика
        </option>
      </select>
      <Button className={style.topBtn}>Generare Now</Button>
    </div>
  );
};
