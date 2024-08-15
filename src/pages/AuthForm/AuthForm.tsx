import style from "./AuthForm.module.scss";
import imgAuth from "../../assets/authBg.jpg";
import { useState } from "react";
import { Button } from "../../ui/Button";

function AuthForm() {
  const [authType, setAuthType] = useState<string>("auth");

  const handleClick = () => {
    setAuthType((prevState) =>
      prevState === "register" ? "auth" : "register"
    );
  };

  return (
    <div className="container-fluid">
      <div className={`${style.boxAuth} py-5`}>
        <div className={style.boxLeft}>
          <div className={style.authForm}>
            <div>
              <h1>{authType === "auth" ? "Sign in" : "Sign up"}</h1>
              <div className="flex justify-center items-center">
                <p className="mr-1">
                  {authType === "auth"
                    ? "Need an account?"
                    : "Already have an Account?"}
                </p>
                <Button className="" onClick={handleClick}>
                  {authType === "auth" ? "Sign up" : "Sign in"}
                </Button>
              </div>
            </div>
            <Button>Use Google</Button>
            <form>
              <label>
                <span className={style.formTitle}>Email</span>
                <input
                  className="input"
                  placeholder="email@email.com"
                  type="email"
                  required
                />
              </label>
              <label>
                <span className={style.formTitle}>Password</span>
                <input
                  className="input"
                  placeholder="Enter password"
                  type="password"
                  required
                />
              </label>
              <label>
                <input className="mr-1" type="checkbox" required />
                <span>Remember me</span>
              </label>
            </form>
          </div>
        </div>
        <div>
          <img className={style.img} src={imgAuth} alt="" />
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
