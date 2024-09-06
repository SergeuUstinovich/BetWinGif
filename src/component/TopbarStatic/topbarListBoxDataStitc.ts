import { ReactNode } from 'react'

export interface ListBoxItem {
  id: string
  value: string
  content: ReactNode
  disabled?: boolean
}

export interface ListBoxData {
  defaultValue: string
  value: string
  onChange: (value: string) => void
  items: ListBoxItem[]
}

export const topbarListBoxData = (
  t: (key: string) => string,
  selectedCountries: string,
  selectedLanguages: string,
  selectedCurrencies: string,
  selectedBannerFormats: string,
  selectedBannerThemes: string,
  handleChangeCountry: (value: string) => void,
  handleChangeLanguage: (value: string) => void,
  handleChangeCurrency: (value: string) => void,
  handleChangeBannerFormat: (value: string) => void,
  handleChangeBannerTheme: (value: string) => void
): ListBoxData[] => [
  {
    defaultValue: t('Country'),
    value: selectedCountries || '',
    onChange: (value) => handleChangeCountry(value),
    items: [
      { value: 'Kenya', content: 'Kenya', id: '1' },
      { value: 'Nigeria', content: 'Nigeria', id: '2' },
      { value: 'Ghana', content: 'Ghana', id: '3' },
      { value: 'Zambia', content: 'Zambia', id: '4' },
      { value: 'Uganda', content: 'Uganda', id: '5' },
      { value: 'DR Congo', content: 'DR Congo', id: '6' },
      { value: 'Cameroon Gabon', content: 'Cameroon Gabon', id: '7' },
      {
        value: 'Benin Burkina Faso Ivory Coast Senegal Mali',
        content: 'Benin Burkina Faso Ivory Coast Senegal Mali',
        id: '8',
      },
      { value: 'Angola', content: 'Angola', id: '9' },
      { value: 'Morocco', content: 'Morocco', id: '10' },
      { value: 'Mozambique', content: 'Mozambique', id: '11' },
      { value: 'Tanzania', content: 'Tanzania', id: '12' },
      { value: 'Brazil', content: 'Brazil', id: '13' },
      { value: 'India', content: 'India', id: '14' },
      { value: 'Peru', content: 'Peru', id: '15' },
      { value: 'Argentina', content: 'Argentina', id: '16' },
      { value: 'Mexico', content: 'Mexico', id: '17' },
      { value: 'Colombia', content: 'Colombia', id: '18' },
      { value: 'Chile', content: 'Chile', id: '19' },
      { value: 'Malaysia', content: 'Malaysia', id: '20' },
      { value: 'Indonesia', content: 'Indonesia', id: '21' },
      { value: 'Thailand', content: 'Thailand', id: '22' },
      { value: 'Uzbekistan', content: 'Uzbekistan', id: '23' },
      { value: 'Philippines', content: 'Philippines', id: '24' },
      { value: 'Bangladesh', content: 'Bangladesh', id: '25' },
    ],
  },
  {
    defaultValue: t('Language'),
    value: selectedLanguages || '',
    onChange: (value) => handleChangeLanguage(value),
    items: [
      { value: 'English', content: 'English', id: '1' },
      { value: 'Русский', content: 'Русский', id: '2' },
      { value: 'Française', content: 'Française', id: '3' },
      { value: 'Español', content: 'Español', id: '4' },
      { value: 'Português', content: 'Português', id: '5' },
    ],
  },
  {
    defaultValue: t('Currency'),
    value: selectedCurrencies || '',
    onChange: (value) => handleChangeCurrency(value),
    items: [
      { value: 'KES', content: 'KES', id: '1' },
      { value: 'NGN', content: 'NGN', id: '2' },
      { value: 'GHS', content: 'GHS', id: '3' },
      { value: 'ZMW', content: 'ZMW', id: '4' },
      { value: 'UGX', content: 'UGX', id: '5' },
      { value: 'CDF', content: 'CDF', id: '6' },
      { value: 'XAF', content: 'XAF', id: '7' },
      { value: 'XOF', content: 'XOF', id: '8' },
      { value: 'AOA', content: 'AOA', id: '9' },
      { value: 'MAD', content: 'MAD', id: '10' },
      { value: 'MZN', content: 'MZN', id: '11' },
      { value: 'TZS', content: 'TZS', id: '12' },
      { value: 'BRL', content: 'BRL', id: '13' },
      { value: 'INR', content: 'INR', id: '14' },
      { value: 'PEN', content: 'PEN', id: '15' },
      { value: 'ARS', content: 'ARS', id: '16' },
      { value: 'MXN', content: 'MXN', id: '17' },
      { value: 'COP', content: 'COP', id: '18' },
      { value: 'CLP', content: 'CLP', id: '19' },
      { value: 'MYR', content: 'MYR', id: '20' },
      { value: 'IDR', content: 'IDR', id: '21' },
      { value: 'THB', content: 'THB', id: '22' },
      { value: 'UZS', content: 'UZS', id: '23' },
      { value: 'PHP', content: 'PHP', id: '24' },
      { value: 'BDT', content: 'BDT', id: '25' },
    ],
  },
  {
    defaultValue: t('Banner format'),
    value: selectedBannerFormats || '',
    onChange: (value) => handleChangeBannerFormat(value),
    items: [
      { value: '300x300', content: '300x300', id: '1' },
      { value: '600x600', content: '600x600', id: '2' },
      { value: '900x900', content: '900x900', id: '3' },
    ],
  },
  {
    defaultValue: t('Banner theme'),
    value: selectedBannerThemes || '',
    onChange: (value) => handleChangeBannerTheme(value),
    items: [{ value: 'footbal', content: 'footbal', id: '1' }],
  },
]
