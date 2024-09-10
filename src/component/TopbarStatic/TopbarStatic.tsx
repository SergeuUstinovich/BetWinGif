import style from "./TopbarStatic.module.scss";
import { useTranslation } from "react-i18next";
import { Button } from "../../ui/Button";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { useDispatch, useSelector } from "react-redux";
import { gifActions } from "../../providers/StoreProvider";
import { getTokenUser } from "../../providers/StoreProvider/selectors/getTokenUser";
import { useState } from "react";
import { staticGif } from "../../api/clientGif";
import TopbarListBox from "./TopbarListBoxStatic";
import toast from "react-hot-toast";

export const TopbarStatic = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const token = useSelector(getTokenUser);
  const [selectedCountry, setSelectedCountry] = useState(t("Country"));
  const [selectedLanguage, setSelectedLanguage] = useState(t("Language"));
  const [selectedCurrency, setSelectedCurrency] = useState(t("Currency"));
  const [selectedBannerFormat, setSelectedBannerFormat] = useState(
    t("Banner_format")
  );
  const [selectedBannerTheme, setSelectedBannerTheme] = useState(
    t("Banner_theme")
  );

  const handleChangeCountry = (value) => {
    setSelectedCountry(value);
  };

  const handleChangeLanguage = (value) => {
    setSelectedLanguage(value);
  };

  const handleChangeCurrency = (value) => {
    setSelectedCurrency(value);
  };

  const handleChangeBannerFormat = (value) => {
    setSelectedBannerFormat(value);
  };

  const handleChangeBannerTheme = (value) => {
    setSelectedBannerTheme(value);
  };

  const mutateStaticGif = useMutation(
    {
      mutationFn: (data: {
        token: string;
        country: string;
        language: string;
        value: string;
        format: string;
        topic: string;
      }) =>
        staticGif(
          data.token,
          data.country,
          data.language,
          data.value,
          data.format,
          data.topic
        ),
      onSuccess: (data) => {
        dispatch(gifActions.gifAdd(data));
      },
      onError: () => {
        toast.error("По текущим фильтрам изображений нет");
      },
    },
    queryClient
  );

  const handleMutateStaticGif = () => {
    mutateStaticGif.mutate({
      token,
      country: selectedCountry === t("Country") ? null : selectedCountry,
      language: selectedLanguage === t("Language") ? null : selectedLanguage,
      value: selectedCurrency === t("Currency") ? null : selectedCurrency,
      format:
        selectedBannerFormat === t("Banner_format")
          ? null
          : selectedBannerFormat,
      topic:
        selectedBannerTheme === t("Banner_theme") ? null : selectedBannerTheme,
    });
  };

  return (
    <div className={`${style.topbarStatic}`}>
      <TopbarListBox
        t={t}
        selectedCountries={selectedCountry}
        selectedLanguages={selectedLanguage}
        selectedCurrencies={selectedCurrency}
        selectedBannerFormats={selectedBannerFormat}
        selectedBannerThemes={selectedBannerTheme}
        handleChangeCountry={handleChangeCountry}
        handleChangeLanguage={handleChangeLanguage}
        handleChangeCurrency={handleChangeCurrency}
        handleChangeBannerFormat={handleChangeBannerFormat}
        handleChangeBannerTheme={handleChangeBannerTheme}
      />

      <Button
        isLoading={mutateStaticGif.isPending}
        onClick={handleMutateStaticGif}
        className={style.topBtn}
      >
        {t("Generare Now")}
      </Button>
    </div>
  );
};
