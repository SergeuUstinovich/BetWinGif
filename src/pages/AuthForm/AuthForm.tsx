import style from './AuthForm.module.scss'
import imgAuth from '../../assets/authBg.jpg'
import { useState } from 'react';
import { Button } from '../../ui/Button';

function AuthForm() {
    const [authType, setAuthType] = useState<string>("auth");

    const handleClick = () => {
        setAuthType((prevState) =>
        prevState === "register" ? "auth" : "register",
        );
    };

    return (
        <div className="container">
            <div className={style.boxAuth}>
                <div>
                    <div>
                        <p>
                        {authType === "auth" ? "Sign in" : "Sign up"}
                        </p>
                        <div>
                            <p>
                            {authType === "auth" ? "Need an account?" : "Already have an Account?"}
                            </p>
                            <Button onClick={handleClick}>
                            {authType === "auth" ? "Sign up" : "Sign in"}
                            </Button>
                        </div>
                        
                    </div>
                </div>
                <div>
                    <img className={style.img} src={imgAuth} alt="" />
                </div>
            </div>
        </div>
    )
}

export default AuthForm