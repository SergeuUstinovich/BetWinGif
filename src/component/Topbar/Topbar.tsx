import style from "./Topbar.module.scss";
import { useTranslation } from "react-i18next";
import { Button } from "../../ui/Button";
import { useMutation } from "@tanstack/react-query";
import { gifAdd } from "../../api/gifAdd";
import { queryClient } from "../../api/queryClient";
import { useDispatch, useSelector } from "react-redux";
import { getTokenUser } from "../../providers/StoreProvider/selectors/getTokenUser";
import { gifGenActions } from "../../providers/StoreProvider/slice/gifGenSlice";
import { SelectArrowSvg } from "../../assets/svg/SelectArrowSvg";

export const Topbar = () => {
  const { t, i18n } = useTranslation(); // можно передать подгружаемый файл 'main.json'
  const dispatch = useDispatch();
  const token = useSelector(getTokenUser);

  const toggle = (lng) => {
    i18n.changeLanguage(lng);
  };

  const mutateGifAdd = useMutation(
    {
      mutationFn: (data: { token: string }) => gifAdd(data.token),
      onSuccess: (data) => {
        dispatch(
          gifGenActions.gifGenAdd({
            svgContent: data.svg,
            text: data.promokode,
          })
        );
      },
    },
    queryClient
  );

  const handleGifAdd = () => {
    mutateGifAdd.mutate({ token });
  };

  return (
    <ul className={`${style.topbar}`}>
      <li className={style.defaultSelect}>
        <select className={style.selectTopbar}>
          <option defaultValue="Страна">Страна</option>
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
        <SelectArrowSvg />
      </li>

      <li className={style.defaultSelect}>
        <select
          className={style.selectTopbar}
          onChange={(e) => toggle(e.target.value)}
        >
          <option defaultValue={"Язык"}>Язык</option>
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
        <SelectArrowSvg />
      </li>

      <li className={style.defaultSelect}>
        <select className={style.selectTopbar}>
          <option defaultValue="Валюта">Валюта</option>
        </select>
        <SelectArrowSvg />
      </li>

      <li className={style.defaultSelect}>
        <select className={`${style.selectTopbar}`}>
          <option defaultValue="Формат">Формат</option>
        </select>
        <SelectArrowSvg />
      </li>

      <li className={`${style.defaultSelect} mr-auto`}>
        <select className={style.selectTopbar}>
          <option defaultValue="Тематика">Тематика</option>
        </select>
        <SelectArrowSvg />
      </li>

      <li className="generateButton">
        <Button
          isLoading={mutateGifAdd.isPending}
          onClick={handleGifAdd}
          className={style.topBtn}
        >
          Generare Now
        </Button>
      </li>
    </ul>
  );
};
