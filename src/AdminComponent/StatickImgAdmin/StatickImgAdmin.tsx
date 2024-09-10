import style from './StatickImgAdmin.module.scss'
import { useEffect, useState } from 'react'
import { adminImgs } from '../../types/adminImgType'
import { Link } from 'react-router-dom'

function StatickImgAdmin({ images }: adminImgs) {
  const [newImages, setNewImages] = useState([])
  const [oldImages, setOldImages] = useState([])

  useEffect(() => {
    if (images) {
      setNewImages(images.filter((item) => item.picture_id))
      setOldImages(images.filter((item) => item.full_picture_id))
    }
  }, [images])

  useEffect(() => {
    console.log(newImages)
    console.log(oldImages)
  }, [newImages, oldImages])

  return (
    <div className={style.staticImgBlock}>
      <div>
        <h2>Новые элементы</h2>
        <div className={style.pictureIdList}>
          {newImages.map((item) => (
            <div key={item.picture_id}>
              <Link to={`new/${item.picture_id}`}>{item.picture_id}</Link>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>Старые элементы</h2>
        {oldImages.map((item) => (
          <div key={item.full_picture_id}>
            <Link to={`old/${item.full_picture_id}`}>
              {item.full_picture_id}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatickImgAdmin
