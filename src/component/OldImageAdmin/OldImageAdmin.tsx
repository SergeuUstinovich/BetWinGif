import { useParams } from "react-router-dom"
import { getAdminImg } from "../../providers/StoreProvider/selectors/getAdminImg"
import { useSelector } from "react-redux"
import { useEffect } from "react"

const OldImageAdmin = () => {
    const arrImg = useSelector(getAdminImg)
    const { full_picture_id } = useParams()
    const card = arrImg.find(item => item.full_picture_id === Number(full_picture_id))
    
    useEffect(() => {
        console.log(card)
    }, [card])

    return (
        <div>ntrcn2</div>
    )
}

export default OldImageAdmin