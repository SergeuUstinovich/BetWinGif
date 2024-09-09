import style from './Topbar.module.scss'
import { useTranslation } from 'react-i18next'
import { Button } from '../../ui/Button'
import { useMutation } from '@tanstack/react-query'
import { gifAdd } from '../../api/gifAdd'
import { queryClient } from '../../api/queryClient'
import { useDispatch, useSelector } from 'react-redux'
import { getTokenUser } from '../../providers/StoreProvider/selectors/getTokenUser'
import { gifGenActions } from '../../providers/StoreProvider/slice/gifGenSlice'
import { useEffect, useState } from 'react'
import TopbarListBox from '../TopbarStatic/TopbarListBoxStatic'

export const Topbar = () => {
  const { t } = useTranslation() // можно передать подгружаемый файл 'main.json'
  const dispatch = useDispatch()
  const token = useSelector(getTokenUser)
  const [selectedCountry, setSelectedCountry] = useState(t('Country'))
  const [selectedLanguage, setSelectedLanguage] = useState(t('Language'))
  const [selectedCurrency, setSelectedCurrency] = useState(t('Currency'))
  const [selectedBannerFormat, setSelectedBannerFormat] = useState(
    t('Banner_format')
  )
  const [selectedBannerTheme, setSelectedBannerTheme] = useState(
    t('Banner_theme')
  )
  const [isDisabledBtn, setIsDisabledBtn] = useState(true)

  const handleChangeCountry = (value) => {
    setSelectedCountry(value)
  }

  const handleChangeLanguage = (value) => {
    setSelectedLanguage(value)
  }

  const handleChangeCurrency = (value) => {
    setSelectedCurrency(value)
  }

  const handleChangeBannerFormat = (value) => {
    setSelectedBannerFormat(value)
  }

  const handleChangeBannerTheme = (value) => {
    setSelectedBannerTheme(value)
  }

  useEffect(() => {
    if (
      selectedCountry === t('Country') ||
      selectedLanguage === t('Language') ||
      selectedCurrency === t('Currency') ||
      selectedBannerFormat === t('Banner_format') ||
      selectedBannerTheme === t('Banner_theme')
    ) {
      setIsDisabledBtn(true)
    } else {
      setIsDisabledBtn(false)
    }
  }, [
    selectedCountry,
    selectedLanguage,
    selectedCurrency,
    selectedBannerFormat,
    selectedBannerTheme,
  ])

  const mutateGifAdd = useMutation(
    {
      mutationFn: (data: { token: string }) => gifAdd(data.token),
      onSuccess: (data) => {
        dispatch(
          gifGenActions.gifGenAdd({
            svgContent: data.svg,
            text: data.promokode,
          })
        )
      },
    },
    queryClient
  )

  const handleGifAdd = () => {
    mutateGifAdd.mutate({ token })
  }

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
      {mutateGifAdd.isPending ? (
        <Button
          isLoading={mutateGifAdd.isPending}
          className={style.topBtns}
        />
      ) : (
        <Button
          isDisabled={isDisabledBtn}
          onClick={handleGifAdd}
          className={style.topBtn}
        >
          {t("Generare Now")}
        </Button>
      )}
    </div>
  )
}
