import style from './Topbar.module.scss'
import { useTranslation } from 'react-i18next'
import { Button } from '../../ui/Button'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../api/queryClient'
import { useDispatch, useSelector } from 'react-redux'
import { getTokenUser } from '../../providers/StoreProvider/selectors/getTokenUser'
import { gifGenActions } from '../../providers/StoreProvider/slice/gifGenSlice'
import { useState } from 'react'
import { gifAdd } from '../../api/clientGif'
import toast from 'react-hot-toast'
import ListFilter from '../../utils/ListFilter'
import { listBoxFil } from './dataFilter'

export const Topbar = () => {
  const initialSelectedValues = {
    country: '',
    language: '',
    currency: '',
    banner_format: '',
    banner_theme: '',
  }
  const { t } = useTranslation() // можно передать подгружаемый файл 'main.json'
  const dispatch = useDispatch()
  const token = useSelector(getTokenUser)

  const [blocks, setBlocks] = useState([
    { id: 1, selectedValues: initialSelectedValues },
  ])
  const handleListChange = (blockId, listBoxId, value) => {
    setBlocks(
      blocks.map((block) =>
        block.id === blockId
          ? {
              ...block,
              selectedValues: { ...block.selectedValues, [listBoxId]: value },
            }
          : block
      )
    )
  }

  const mutateGifAdd = useMutation(
    {
      mutationFn: (data: {
        token: string
        country: string
        language: string
        value: string
        format: string
        topic: string
      }) =>
        gifAdd(
          data.token,
          data.country,
          data.language,
          data.value,
          data.format,
          data.topic
        ),
      onSuccess: (data) => {
        dispatch(gifGenActions.gifGenAdd(data))
      },
      onError: (err) => {
        toast.error(err.message)
      },
    },
    queryClient
  )

  const handleSubmit = () => {
    blocks.forEach((block) => {
      mutateGifAdd.mutate({
        token,
        country:
          block.selectedValues.country === t('Country')
            ? ''
            : block.selectedValues.country,
        language:
          block.selectedValues.language === t('Language')
            ? ''
            : block.selectedValues.language,
        value:
          block.selectedValues.currency === t('Currency')
            ? ''
            : block.selectedValues.currency,
        format:
          block.selectedValues.banner_format === t('Banner_format')
            ? ''
            : block.selectedValues.banner_format,
        topic:
          block.selectedValues.banner_theme === t('Banner_theme')
            ? ''
            : block.selectedValues.banner_theme,
      })
    })
  }

  return (
    <div className={`${style.topbarStatic}`}>
      {blocks.map((block, index) => (
        <ListFilter
          index={index}
          key={block.id}
          block={block}
          listBoxItems={listBoxFil}
          handleListBoxChange={handleListChange}
          removeBlock={() => {}}
          t={t}
          className={style.topbar}
          classNameBox={style.defaultSelect}
        />
      ))}
      <Button
        isLoading={mutateGifAdd.isPending}
        onClick={handleSubmit}
        className={style.topBtn}
      >
        {t('Generare Now')}
      </Button>
    </div>
  )
}
