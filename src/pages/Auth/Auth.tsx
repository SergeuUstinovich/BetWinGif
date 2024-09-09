import { Outlet } from 'react-router-dom'
import style from './Auth.module.scss'
import imgAuth from '../../assets/img/jpg/authBg.jpg'
import { useMediaQuery } from "react-responsive"
import imgLogo from '../../assets/img/png/betWinnerLogo.webp'

function Auth() {
  const isMobile = useMediaQuery({ query: `(max-width: 1200px)` });

  return (
    <div className="container-fluid">
      <div className={`${style.boxAuth} py-5`}>
        <div className={style.boxLeft}>
        {isMobile && (
          <img className={style.logo} src={imgLogo} alt="" />
        )}
          <div className={style.authForm}>
            <Outlet />
          </div>
        </div>
        <>
          <img className={style.imgAuth} src={imgAuth} alt="" />
        </>
      </div>
    </div>
  )
}

export default Auth
