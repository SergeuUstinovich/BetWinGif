import style from './AdminRedactor.module.scss'
import React, { useEffect, useState, useRef } from 'react'
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable'
import ListBox from '../../ui/ListBox/ListBox'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../api/queryClient'
import {
  allUnifiedPicture,
  getPictureId,
  unifiedPicture,
} from '../../api/adminImg'
import { Button } from '../../ui/Button'
import toast from 'react-hot-toast'
import { staticGifDemo } from '../../api/staticGif'
import { useSelector } from 'react-redux'
import { getTokenUser } from '../../providers/StoreProvider/selectors/getTokenUser'
import AdminListBox from './AdminListBox'

interface Image {
  picture_id?: number
  full_picture_id?: number
  url: string
  top: number
  bottom: number
  left: number
  right: number
  language: string
  name: string
  color_text: string
  country: string
  format: string
  topic: string
  value: string
  size: number
}

interface TestProps {
  images?: Image[]
}

export const AdminRedactor: React.FC<TestProps> = ({ images }) => {
  const { t } = useTranslation()
  const token = useSelector(getTokenUser)
  const [demoPrev, setDemoPrev] = useState<string>()
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([])
  const [selectedBannerFormats, setSelectedBannerFormats] = useState<string[]>([
    ,
  ])
  const [selectedBannerThemes, setSelectedBannerThemes] = useState<string[]>([
    ,
  ])

  const [textPositions, setTextPositions] = useState<
    { x: number; y: number }[]
  >([])
  const [texts, setTexts] = useState<string[]>([])
  const [textSizes, setTextSizes] = useState<number[]>([])
  const [textColors, setTextColors] = useState<string[]>([])
  const draggableRefs = useRef<React.RefObject<HTMLDivElement>[]>([])

  useEffect(() => {
    if (images) {
      setTextPositions(
        images.map((image) => ({ x: image.left || 0, y: image.top || 0 }))
      )
      setTexts(images.map((image) => image.name || 'Your Text'))
      setTextSizes(images.map((image) => image.size || 30))
      setTextColors(images.map((image) => image.color_text || '#ffffff')) // Default text color
      setSelectedCountries(images.map((image) => image.country || t('Country')))
      setSelectedLanguages(
        images.map((image) => image.language || t('Language'))
      )
      setSelectedCurrencies(images.map((image) => image.value || t('Currency')))
      setSelectedBannerFormats(
        images.map((image) => image.format || t('Banner format'))
      )
      setSelectedBannerThemes(
        images.map((image) => image.topic || t('Banner theme'))
      )
      draggableRefs.current = images.map(() =>
        React.createRef<HTMLDivElement>()
      )
    }
  }, [images])

  const mutateCreateImg = useMutation(
    {
      mutationFn: (data: {
        picture_id: number
        country: string
        language: string
        value: string
        format: string
        topic: string
        color: string
        left: string
        right: string
        top: string
        bottom: string
        size: number
      }) =>
        unifiedPicture(
          data.picture_id,
          data.country,
          data.language,
          data.value,
          data.format,
          data.topic,
          data.color,
          data.left,
          data.right,
          data.top,
          data.bottom,
          data.size
        ),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['img'] })
      },
      onError: (err) => {
        toast.error(err.message)
      },
    },
    queryClient
  )

  const mutateCreateUpdate = useMutation(
    {
      mutationFn: (data: {
        full_picture_id: number
        country: string
        language: string
        value: string
        format: string
        topic: string
        color: string
        left: string
        right: string
        top: string
        bottom: string
        size: number
      }) =>
        allUnifiedPicture(
          data.full_picture_id,
          data.country,
          data.language,
          data.value,
          data.format,
          data.topic,
          data.color,
          data.left,
          data.right,
          data.top,
          data.bottom,
          data.size
        ),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['img'] })
      },
    },
    queryClient
  )

  const mutatePreve = useMutation(
    {
      mutationFn: (data: { token: string; full_picture_id: number }) =>
        staticGifDemo(data.token, data.full_picture_id),
      onSuccess: (data) => {
        setDemoPrev(data)
      },
      onError: (err) => {
        toast.error(err.message)
      },
    },
    queryClient
  )

  const handleDemo = (picture_id: number) => {
    mutatePreve.mutate({
      token,
      full_picture_id: picture_id,
    })
  }

  const mutateGetPicture = useMutation(
    {
      mutationFn: (data: { full_picture_id: number }) =>
        getPictureId(data.full_picture_id),
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['img'] })
        toast.success(data.data)
      },
    },
    queryClient
  )

  const handleGetPicture = (picture_id: number) => {
    mutateGetPicture.mutate({
      full_picture_id: picture_id,
    })
  }

  const handleDrag = (
    index: number,
    e: DraggableEvent,
    data: DraggableData
  ) => {
    const newTextPositions = [...textPositions]
    newTextPositions[index] = { x: data.x, y: data.y }
    setTextPositions(newTextPositions)
  }

  const handleTextChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTexts = [...texts]
    newTexts[index] = event.target.value
    setTexts(newTexts)
  }

  const handleSizeChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSizes = [...textSizes]
    newSizes[index] = parseInt(event.target.value, 10)
    setTextSizes(newSizes)
  }

  const handleColorChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newColors = [...textColors]
    newColors[index] = event.target.value
    setTextColors(newColors)
  }

  const handleSubmit = (picture_id: number, index: number) => {
    const position = textPositions[index]
    const draggableRef = draggableRefs.current[index].current

    if (position && draggableRef) {
      const textWidth = draggableRef.offsetWidth
      const textHeight = draggableRef.offsetHeight
      const { x, y } = position
      if (picture_id) {
        mutateCreateImg.mutate({
          picture_id: picture_id,
          country: selectedCountries[index],
          language: selectedLanguages[index],
          value: selectedCurrencies[index],
          format: selectedBannerFormats[index],
          topic: selectedBannerThemes[index],
          color: textColors[index],
          left: x.toString(),
          right: (x + textWidth).toString(),
          top: y.toString(),
          bottom: (y + textHeight).toString(),
          size: textSizes[index],
        })
      }
    }
  }

  const handleSubmitTwo = (picture_id: number, index: number) => {
    const position = textPositions[index]
    const draggableRef = draggableRefs.current[index].current
    if (position && draggableRef) {
      const { x, y } = position
      const textWidth = draggableRef.offsetWidth
      const textHeight = draggableRef.offsetHeight
      if (picture_id) {
        mutateCreateUpdate.mutate({
          full_picture_id: picture_id,
          country: selectedCountries[index],
          language: selectedLanguages[index],
          value: selectedCurrencies[index],
          format: selectedBannerFormats[index],
          topic: selectedBannerThemes[index],
          color: textColors[index],
          left: x.toString(),
          right: (x + textWidth).toString(),
          top: y.toString(),
          bottom: (y + textHeight).toString(),
          size: textSizes[index],
        })
      }
    }
  }

  const handleChangeCountry = (index: number, value: string) => {
    const newCountries = [...selectedCountries]
    newCountries[index] = value
    setSelectedCountries(newCountries)
  }

  const handleChangeLanguage = (index: number, value: string) => {
    const newLanguages = [...selectedLanguages]
    newLanguages[index] = value
    setSelectedLanguages(newLanguages)
  }

  const handleChangeCurrency = (index: number, value: string) => {
    const newCurrencies = [...selectedCurrencies]
    newCurrencies[index] = value
    setSelectedCurrencies(newCurrencies)
  }

  const handleChangeBannerFormat = (index: number, value: string) => {
    const newBannerFormats = [...selectedBannerFormats]
    newBannerFormats[index] = value
    setSelectedBannerFormats(newBannerFormats)
  }

  const handleChangeBannerTheme = (index: number, value: string) => {
    const newBannerThemes = [...selectedBannerThemes]
    newBannerThemes[index] = value
    setSelectedBannerThemes(newBannerThemes)
  }

  return (
    <div className={style.mainBox}>
      <img className={style.redactorImg} src={demoPrev} alt="" />
      {images &&
        images.map((image, index) => (
          <div key={index} className={style.redactorBox}>
            <div className={style.draggableImgBox}>
              <Draggable
                position={textPositions[index]}
                onDrag={(e, data) => handleDrag(index, e, data)}
                bounds="parent"
                nodeRef={draggableRefs.current[index]}
              >
                <div
                  ref={draggableRefs.current[index]}
                  className={style.draggableBox}
                  style={{
                    fontSize: `${textSizes[index]}px`,
                    color: textColors[index],
                  }}
                >
                  {texts[index]}
                </div>
              </Draggable>
              <img
                className={style.redactorImg}
                src={image.url}
                alt={`img-${index}`}
              />
            </div>
            <input
              className={style.redactorIn}
              type="text"
              placeholder="Label"
              value={texts[index] || ''}
              onChange={(event) => handleTextChange(index, event)}
            />
            <input
              className={style.redactorIn}
              type="number"
              value={textSizes[index] || ''}
              onChange={(event) => handleSizeChange(index, event)}
              placeholder="Text Size"
            />
            <input
              className={style.redactorIn}
              type="color"
              value={textColors[index] || ''}
              onChange={(event) => handleColorChange(index, event)}
              placeholder="Text Color"
            />
            <AdminListBox
              t={t}
              index={index}
              selectedCountries={selectedCountries}
              selectedLanguages={selectedLanguages}
              selectedCurrencies={selectedCurrencies}
              selectedBannerFormats={selectedBannerFormats}
              selectedBannerThemes={selectedBannerThemes}
              handleChangeCountry={handleChangeCountry}
              handleChangeLanguage={handleChangeLanguage}
              handleChangeCurrency={handleChangeCurrency}
              handleChangeBannerFormat={handleChangeBannerFormat}
              handleChangeBannerTheme={handleChangeBannerTheme}
            />
            {image.picture_id ? (
              <Button
                className={style.adminRedactorButton}
                onClick={() => handleSubmit(image.picture_id, index)}
              >
                Отправить
              </Button>
            ) : (
              <Button
                className={style.adminRedactorButton}
                onClick={() => handleSubmitTwo(image.full_picture_id, index)}
              >
                Изменить
              </Button>
            )}

            {image.full_picture_id && (
              <>
                <Button
                  className={style.publish}
                  onClick={() => handleGetPicture(image.full_picture_id)}
                >
                  Опубликовать
                </Button>
                <Button
                  className={style.publish}
                  onClick={() => handleDemo(image.full_picture_id)}
                >
                  Demo
                </Button>
              </>
            )}
          </div>
        ))}
    </div>
  )
}

export default AdminRedactor
