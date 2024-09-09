import { listBoxData } from "./listBoxData";
import style from "./AdminRedactor.module.scss";
import ListBox from "../../ui/ListBox/ListBox";
import { useState } from "react";

function AdminListBox({
  t,
  index,
  selectedCountries,
  selectedLanguages,
  selectedCurrencies,
  selectedBannerFormats,
  selectedBannerThemes,
  handleChangeCountry,
  handleChangeLanguage,
  handleChangeCurrency,
  handleChangeBannerFormat,
  handleChangeBannerTheme,
}) {
  const [countries, setCountries] = useState(selectedCountries.length ? selectedCountries : ['']);
  const [languages, setLanguages] = useState(selectedLanguages.length ? selectedLanguages : ['']);
  const [currencies, setCurrencies] = useState(selectedCurrencies.length ? selectedCurrencies : ['']);
  const [bannerFormats, setBannerFormats] = useState(selectedBannerFormats.length ? selectedBannerFormats : ['']);
  const [bannerThemes, setBannerThemes] = useState(selectedBannerThemes.length ? selectedBannerThemes : ['']);

  const addListBox = (setter, state) => {
    const newState = [...state];
    newState.push('');
    setter(newState);
  };

  const data = listBoxData(
    t,
    index,
    countries,
    languages,
    currencies,
    bannerFormats,
    bannerThemes,
    handleChangeCountry,
    handleChangeLanguage,
    handleChangeCurrency,
    handleChangeBannerFormat,
    handleChangeBannerTheme
  );

  return (
    <div>
      <ul className={`${style.topbar}`}>
        {data.map((data, idx) => (
          <li key={idx} className={style.defaultSelect}>
            <ListBox {...data} />
          </li>
        ))}
      </ul>
      <button onClick={() => addListBox(setCountries, countries)}>
        Добавить страну
      </button>
      <button onClick={() => addListBox(setLanguages, languages)}>
        Добавить язык
      </button>
      <button onClick={() => addListBox(setCurrencies, currencies)}>
        Добавить валюту
      </button>
      <button onClick={() => addListBox(setBannerFormats, bannerFormats)}>
        Добавить формат баннера
      </button>
      <button onClick={() => addListBox(setBannerThemes, bannerThemes)}>
        Добавить тему баннера
      </button>
    </div>
  );
}

export default AdminListBox;
