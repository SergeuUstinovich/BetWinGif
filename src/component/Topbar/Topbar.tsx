import style from './Topbar.module.scss'
import { useTranslation } from 'react-i18next'
import { Button } from '../../ui/Button'
import { useMutation } from '@tanstack/react-query'
import { gifAdd } from '../../api/gifAdd'
import { queryClient } from '../../api/queryClient'
import { useDispatch, useSelector } from 'react-redux'
import { getTokenUser } from '../../providers/StoreProvider/selectors/getTokenUser'
import { gifGenActions } from '../../providers/StoreProvider/slice/gifGenSlice'
import ListBox from '../../ui/ListBox/ListBox'
import { useState } from 'react'

export const Topbar = () => {
  const { t, i18n } = useTranslation() // можно передать подгружаемый файл 'main.json'
  const dispatch = useDispatch()
  const token = useSelector(getTokenUser)
  const [selectedCountry, setSelectedCountry] = useState()

  const toggle = (lng) => {
    i18n.changeLanguage(lng)
  }

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

  const handleChangeCountry = (value) => {
    setSelectedCountry(value)
  }

  return (
    <ul className={`${style.topbar}`}>
      <li className={style.defaultSelect}>
        <ListBox
          defaultValue={'Страна'}
          onChange={handleChangeCountry}
          value={selectedCountry}
          hiddenArrow
          items={[
            { value: 'en', content: 'en', id: '1' },
            { value: 'ru', content: 'ru', id: '2', disabled: true },
            { value: 'fr', content: 'fr', id: '3' },
          ]}
        />
      </li>

      <li className={style.defaultSelect}>
        <ListBox
          defaultValue={'Язык'}
          onChange={toggle}
          items={[
            { value: 'en', content: 'English', id: '1' },
            { value: 'ru', content: 'Русский', id: '2', disabled: true },
            { value: 'fr', content: 'Française', id: '3' },
          ]}
        />
      </li>

      <li className={style.defaultSelect}>
        <ListBox
          defaultValue={'Валюта'}
          hiddenArrow
          items={[{ value: 'en', content: 'English', id: '1' }]}
        />
      </li>

      <li className={style.defaultSelect}>
        <ListBox
          defaultValue={'Формат'}
          hiddenArrow
          items={[{ value: 'en', content: 'English', id: '1' }]}
        />
      </li>

      <li className={`${style.defaultSelect} mr-auto`}>
        <ListBox
          defaultValue={'Тематика'}
          hiddenArrow
          items={[{ value: 'en', content: 'English', id: '1' }]}
        />
      </li>

      <li className="generateButton">
        <Button
          isLoading={mutateGifAdd.isPending}
          onClick={handleGifAdd}
          className={style.topBtn}
        >
          {t('Generare Now')}
        </Button>
      </li>
    </ul>
  )
}
