import style from "./TopbarStatic.module.scss";
import { useTranslation } from "react-i18next";
import { Button } from "../../ui/Button";
import { useMutation } from "@tanstack/react-query";
import { staticBanner } from "../../api/gifAdd";
import { queryClient } from "../../api/queryClient";
import { useDispatch, useSelector } from "react-redux";
import { gifActions } from "../../providers/StoreProvider";
import { getTokenUser } from "../../providers/StoreProvider/selectors/getTokenUser";
import ListBox from "../../ui/ListBox/ListBox";
import { useState } from "react";

export const TopbarStatic = () => {
  const { t, i18n } = useTranslation(); // можно передать подгружаемый файл 'main.json'
  const dispatch = useDispatch();
  const token = useSelector(getTokenUser);
  const [selectedCountry, setSelectedCountry] = useState();

  const toggle = (lng) => {
    i18n.changeLanguage(lng);
  };

  const mutateStaticAdd = useMutation(
    {
      mutationFn: (data: { token: string }) => staticBanner(data.token),
      onSuccess: (data) => {
        dispatch(gifActions.gifAdd(data));
      },
    },
    queryClient
  );

  const handleGifAdd = () => {
    mutateStaticAdd.mutate({ token });
  };

  const handleChangeCountry = (value) => {
    setSelectedCountry(value);
  };

  return (
    <ul className={`${style.topbar}`}>
      <li className={style.defaultSelect}>
        <ListBox
          defaultValue={t("Country")}
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
        <ListBox
          defaultValue={t("Language")}
          onChange={toggle}
          items={[
            { value: "en", content: "English", id: "1" },
            { value: "ru", content: "Русский", id: "2", disabled: true },
            { value: "fr", content: "Française", id: "3" },
          ]}
        />
      </li>

      <li className={style.defaultSelect}>
        <ListBox
          defaultValue={t("Currency")}
          items={[{ value: "en", content: "English", id: "1" }]}
        />
      </li>

      <li className={style.defaultSelect}>
        <ListBox
          defaultValue={t("Banner format")}
          items={[{ value: "en", content: "English", id: "1" }]}
        />
      </li>

      <li className={`${style.defaultSelect} ${style.lastDefaultSelect}`}>
        <ListBox
          defaultValue={t("Banner theme")}
          items={[{ value: "en", content: "English", id: "1" }]}
        />
      </li>

      <li className="generateButton">
        <Button
          isLoading={mutateStaticAdd.isPending}
          onClick={handleGifAdd}
          className={style.topBtn}
        >
          {t("Generare Now")}
        </Button>
      </li>
    </ul>
  );
};
