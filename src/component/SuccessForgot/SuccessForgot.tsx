import { Link } from "react-router-dom"
import imgSucces from '../../assets/img/png/SuccessForgot.png'
import style from './SuccessForgot.module.scss'

function SuccessForgot() {
    return (
        <div className={style.boxSuccess}>
            <img className={style.img} src={imgSucces} alt="" />
            <h2 className={style.title}>Your password is changed</h2>
            <p className={style.descr}>Your password has been successfully updated. <br />
            Your account's security is our priority.</p>
            <Link className={style.link} to={'/auth'}>Sign in</Link>
        </div>
    )
}

export default SuccessForgot