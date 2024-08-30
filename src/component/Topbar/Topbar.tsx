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
import ListBox from "../../ui/ListBox/ListBox";
import { useState } from "react";

export const Topbar = () => {
  const { t, i18n } = useTranslation(); // можно передать подгружаемый файл 'main.json'
  const dispatch = useDispatch();
  const token = useSelector(getTokenUser);
  const [selectedCountry, setSelectedCountry] = useState();

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
  
  const handleChangeCountry = (value) => {
    setSelectedCountry(value);
  };

  return (
    <ul className={`${style.topbar}`}>
      <li className={style.defaultSelect}>
        <ListBox
          defaultValue={"Страна"}
          onChange={handleChangeCountry}
          value={selectedCountry}
          items={[
            { value: "en", content: "en", id: "1" },
            { value: "ru", content: "ru", id: "2", disabled: true },
            { value: "fr", content: "fr", id: "3" },
          ]}
        />
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
