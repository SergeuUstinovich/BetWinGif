import { useLocation } from "react-router-dom";
import style from './CheckedAuth.module.scss'
import imgCheck from '../../assets/img/png/CheckAuth.png'
import { Button } from "../../ui/Button";
import { Link } from "react-router-dom";

interface CheckedAuthProps {
    email?:string
}

function CheckedAuth({email}: CheckedAuthProps) {

    const location = useLocation();
    const { emailName } = location.state || {};
    const defaultPropName = emailName || email;

    const linkText = location.pathname === '/auth/forgot' ? 'Skip for now' : 'Back to Home';
    // const linkRoute = location.pathname === '/auth/forgot' ? '/auth/forgot-password' : '/auth';

    return(
        <div className={style.boxCheckAuth}>
            <img className={style.img} src={imgCheck} alt="" />
            <h3 className={style.title}>Check you email</h3>
            <p className={style.descr}>
                Please click the link sent to your email <span className={style.spanEmail}>{defaultPropName}</span> <br />  to verify your account. Thank you
            </p>
            <Link className={style.link} to={'/auth'}>{linkText}</Link>
            <div className={style.boxResend}>
                <p className={style.descrResend}>Didn't receive an email?</p>
                <Button className={style.btn}>Resend</Button>
            </div>
        </div>
    )
}

export default CheckedAuth