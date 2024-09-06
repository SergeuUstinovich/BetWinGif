import { listBoxData } from "./listBoxData";
import style from "./AdminRedactor.module.scss";
import ListBox from "../../ui/ListBox/ListBox";

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
  const data = listBoxData(
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
    handleChangeBannerTheme
  );

  return (
    <ul className={`${style.topbar}`}>
      {data.map((data, idx) => (
        <li key={idx} className={style.defaultSelect}>
          <ListBox {...data} />
        </li>
      ))}
    </ul>
  );
}

export default AdminListBox
