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
import { staticGif } from "../../api/staticGif";

export const TopbarStatic = () => {
  const { t, i18n } = useTranslation(); // можно передать подгружаемый файл 'main.json'
  const dispatch = useDispatch();
  const token = useSelector(getTokenUser);
  const [selectedCountry, setSelectedCountry] = useState(t("Country"));
  const [selectedLanguage, setSelectedLanguage] = useState(t("Language"));
  const [selectedCurrency, setSelectedCurrency] = useState(t("Currency"));
  const [selectedBannerFormat, setSelectedBannerFormat] = useState(t("Banner format"));
  const [selectedBannerTheme, setSelectedBannerTheme] = useState(t("Banner theme"));

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

  const handleChangeLanguage = (value) => {
    setSelectedLanguage(value)
  }

  const handleChangeCurrency = (value) => {
    setSelectedCurrency(value);
  };

  const handleChangeBannerFormat = (value) => {
    setSelectedBannerFormat(value);
  };

  const handleChangeBannerTheme = (value) => {
    setSelectedBannerTheme(value);
  };

  const mutateStaticGif = useMutation({
    mutationFn: (data: {token: string, 
      country: string,
      language: string,
      value: string,
      format: string,
      topic: string
    }) =>
      staticGif(data.token, data.country, data.language, data.value, data.format, data.topic)
  }, 
queryClient
)

  const handleMutateStaticGif = () => {
    mutateStaticGif.mutate({
        token,
        country: selectedCountry,
        language: selectedLanguage,
        value: selectedCurrency,
        format: selectedBannerFormat,
        topic: selectedBannerTheme
    })
  }

  return (
    <ul className={`${style.topbar}`}>
      <li className={style.defaultSelect}>
        <ListBox
          defaultValue={t("Country")}
          onChange={handleChangeCountry}
          value={selectedCountry}
          items={[
            { value: "en", content: "en", id: "1" },
            { value: "ru", content: "ru", id: "2"},
            { value: "fr", content: "fr", id: "3" },
          ]}
        />
      </li>

      <li className={style.defaultSelect}>
        <ListBox
          defaultValue={t("Language")}
          onChange={handleChangeLanguage}
          value={selectedLanguage}
          items={[
            { value: "en", content: "English", id: "1" },
            { value: "ru", content: "Русский", id: "2"},
            { value: "fr", content: "Française", id: "3" },
          ]}
        />
      </li>

      <li className={style.defaultSelect}>
        <ListBox
          defaultValue={t("Currency")}
          value={selectedCurrency}
          onChange={handleChangeCurrency}
          items={[{ value: "en", content: "English", id: "1" }]}
        />
      </li>

      <li className={style.defaultSelect}>
        <ListBox
          defaultValue={t("Banner format")}
          value={selectedBannerFormat}
          onChange={handleChangeBannerFormat}
          items={[{ value: "en", content: "English", id: "1" }]}
        />
      </li>

      <li className={`${style.defaultSelect} ${style.lastDefaultSelect}`}>
        <ListBox
          defaultValue={t("Banner theme")}
          onChange={handleChangeBannerTheme}
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
        {/* <Button
        onClick={handleTest}
        >test</Button> */}
      </li>
    </ul>
  );
};
