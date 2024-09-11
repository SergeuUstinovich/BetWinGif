import style from './DynamicGifAdmin.module.scss'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminGifScheme } from '../../types/adminGifType'

function DynamicGifAdmin({ images }: adminGifScheme) {
  const [newImages, setNewImages] = useState([])
  const [oldImages, setOldImages] = useState([])

  useEffect(() => {
    if (images) {
      setNewImages(images.filter((item) => item.picture_id))
      setOldImages(images.filter((item) => item.full_picture_id))
    }
  }, [images])

  return (
    <div className={style.staticImgBlock}>
      <div>
        <h2>Новые элементы</h2>
        <div className={style.pictureIdList}>
          {newImages.map((item) => (
            <div key={item.picture_id}>
              <Link className={style.link} to={`new/${item.picture_id}`}>{item.picture_id}</Link>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>Старые элементы</h2>
        {oldImages.map((item) => (
          <div key={item.full_picture_id}>
            <Link className={style.link} to={`old/${item.full_picture_id}`}>
              {item.full_picture_id} {item.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DynamicGifAdmin
