import style from "./AuthForm.module.scss";

import { useState } from "react";
import { Button } from "../../ui/Button";
import GoogleSvg from "../../assets/svg/GoogleSvg/GoogleSvg";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterFrom/RegisterForm";

function AuthForm() {
  const [authType, setAuthType] = useState<string>("auth");

  const handleClick = () => {
    setAuthType((prevState) =>
      prevState === "register" ? "auth" : "register"
    );
  };

  return (
    <>
      <div className={style.boxSwitch}>
        <h1>{authType === "auth" ? "Sign in" : "Sign up"}</h1>
        <div className="flex justify-center items-center">
          <p className="mr-1">
            {authType === "auth"
              ? "Need an account?"
              : "Already have an Account?"}
          </p>
          <Button className={style.btnSwitch} onClick={handleClick}>
            {authType === "auth" ? "Sign up" : "Sign in"}
          </Button>
        </div>
      </div>
      <div className={style.boxGoogle}>
        <Button className={style.googleAuth}>
          <GoogleSvg />
          <p className={style.authDescr}>Use Google</p>
        </Button>
      </div>
      <div className={style.stroke}>
        <div className={style.lineBreack} />
        <p className={style.and}>OR</p>
        <div className={style.lineBreack} />
      </div>
      {authType === "auth" ? <LoginForm /> : <RegisterForm />}
    </>
  );
}

export default AuthForm;
