import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { getTokenUser } from "../../providers/StoreProvider/selectors/getTokenUser"
import { useEffect } from "react"

function Account() {
    const token = useSelector(getTokenUser)
    const navigator = useNavigate()

    useEffect(() => {
        if(token) {
          navigator('/')
        }
    }, [token])
}

export default Account