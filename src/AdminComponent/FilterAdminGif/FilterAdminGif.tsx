import style from './FilterAdminGif.module.scss'
import { useState } from 'react'
import ListFilter from '../../utils/ListFilter'
import { listBoxItems } from '../NewImageAdmin/dataImg'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@tanstack/react-query'
import { filterGif } from '../../api/adminImg'
import { queryClient } from '../../api/queryClient'
import { useDispatch, useSelector } from 'react-redux'
import { getTokenUser } from '../../providers/StoreProvider/selectors/getTokenUser'
import { Button } from '../../ui/Button'
import { adminGifActions } from '../../providers/StoreProvider/slice/adminGifSlice'

function FilterAdminGif() {
  const initialSelectedValues = {
    country: '',
    language: '',
    currency: '',
    banner_format: '',
    banner_theme: '',
  }
  const dispatch = useDispatch()
  const token = useSelector(getTokenUser)
  const { t } = useTranslation()
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

  const mutateFilter = useMutation(
    {
      mutationFn: (data: {
        token: string
        country: string
        language: string
        value: string
        format: string
        topic: string
      }) =>
        filterGif(
          data.token,
          data.country,
          data.language,
          data.value,
          data.format,
          data.topic
        ),
      onSuccess: (data) => {
        dispatch(adminGifActions.adminGifAdd(data))
      },
    },
    queryClient
  )

  const handleSubmit = () => {
    blocks.forEach((block) => {
      mutateFilter.mutate({
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

  const handleReset = () => {
    mutateFilter.mutate({
      token,
      country: '',
      language: '',
      value: '',
      format: '',
      topic: '',
    })
  }

  const removeBlock = (blockId) =>
    setBlocks(blocks.filter((block) => block.id !== blockId))
  return (
    <div>
      {blocks.map((block, index) => (
        <ListFilter
          index={index}
          key={block.id}
          block={block}
          listBoxItems={listBoxItems}
          handleListBoxChange={handleListChange}
          removeBlock={removeBlock}
          t={t}
        />
      ))}
      <Button className={style.filterBtns} onClick={handleSubmit}>
        Фильтровать
      </Button>
      <Button className={style.filterBtns} onClick={handleReset}>
        Очистить фильтр
      </Button>
    </div>
  )
}

export default FilterAdminGif
