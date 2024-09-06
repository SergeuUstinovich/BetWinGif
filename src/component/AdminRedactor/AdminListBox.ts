interface IlistBoxData {
  t: string
  index: number
  selectedCountries: string
  selectedLanguages: string
  selectedCurrencies: string
  selectedBannerFormats: string
  selectedBannerThemes: string
  handleChangeCountry: string
  handleChangeLanguage: string
  handleChangeCurrency: string
  handleChangeBannerFormat: string
  handleChangeBannerTheme: string
}

export const listBoxData: IlistBoxData = (
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
) => [
  {
    defaultValue: t('Country'),
    value: selectedCountries[index] || '',
    onChange: (value) => handleChangeCountry(index, value),
    items: [
      { value: 'en', content: 'en', id: '1' },
      { value: 'ru', content: 'ru', id: '2' },
      { value: 'fr', content: 'fr', id: '3' },
    ],
  },
  {
    defaultValue: t('Language'),
    value: selectedLanguages[index] || '',
    onChange: (value) => handleChangeLanguage(index, value),
    items: [
      { value: 'en', content: 'English', id: '1' },
      { value: 'ru', content: 'Русский', id: '2' },
      { value: 'fr', content: 'Française', id: '3' },
    ],
  },
  {
    defaultValue: t('Currency'),
    value: selectedCurrencies[index] || '',
    onChange: (value) => handleChangeCurrency(index, value),
    items: [{ value: 'en', content: 'English', id: '1' }],
  },
  {
    defaultValue: t('Banner format'),
    value: selectedBannerFormats[index] || '',
    onChange: (value) => handleChangeBannerFormat(index, value),
    items: [
      { value: '300*300', content: '300*300', id: '1' },
      { value: '600*600', content: '600*600', id: '2' },
      { value: '900*900', content: '900*900', id: '3' },
    ],
  },
  {
    defaultValue: t('Banner theme'),
    value: selectedBannerThemes[index] || '',
    onChange: (value) => handleChangeBannerTheme(index, value),
    items: [{ value: 'footbal', content: 'footbal', id: '1' }],
  },
]
