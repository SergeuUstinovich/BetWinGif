import style from './TopbarStatic.module.scss'
import ListBox from '../../ui/ListBox/ListBox'
import { topbarListBoxData } from './topbarListBoxDataStitc'

function TopbarListBox({
  t,
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
  const data = topbarListBoxData(
    t,
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
  )

  return (
    <ul className={`${style.topbar}`}>
      {data.map((data, idx) => (
        <li key={idx} className={style.defaultSelect}>
          <ListBox {...data} />
        </li>
      ))}
    </ul>
  )
}

export default TopbarListBox
