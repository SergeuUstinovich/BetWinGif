import { useState } from "react";
import { Button } from "../../ui/Button";
import style from "./ForgotNewPassword.module.scss";
import SuccessForgot from "../SuccessForgot/SuccessForgot";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotCodeScheme, ForgotCodeType } from "../../types/AuthType";

function ForgotNewPassword() {
  const [succesPost, setSuccesPost] = useState(false);
  const [passViss, setPassViss] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotCodeType>({
    resolver: zodResolver(ForgotCodeScheme),
  });

  if (succesPost) {
    return <SuccessForgot />;
  }

  return (
    <form className={style.form} onSubmit={handleSubmit(({}) => {
        setSuccesPost(true);
    })}>
      <h2 className={style.title}>Reset Password</h2>
      <p className={style.descr}>Enter your new password</p>
      <label className={style.label}>
        <span className={style.formTitle}>Password</span>
        <div className="input max-w-72" data-toggle-password="true">
          <input placeholder="Enter Password" type="password" {...register('password')} />
          <div className="btn btn-icon" data-toggle-password-trigger="true">
            <i className="ki-outline ki-eye toggle-password-active:hidden"></i>
            <i className="ki-outline ki-eye-slash hidden toggle-password-active:block"></i>
          </div>
        </div>
        {errors && (
          <span className={style.error}>{errors.password?.message}</span>
        )}
      </label>
      <label className={style.label}>
        <span className={style.formTitle}>Confirm Password</span>
        <div className="input max-w-72" data-toggle-password="true">
          <input placeholder="Re-enter Password" type="password" {...register('confirmPassword')} />
          <div className="btn btn-icon" data-toggle-password-trigger="true">
            <i className="ki-outline ki-eye toggle-password-active:hidden"></i>
            <i className="ki-outline ki-eye-slash hidden toggle-password-active:block"></i>
          </div>
        </div>
        {errors && (
          <span className={style.error}>{errors.confirmPassword?.message}</span>
        )}
      </label>
      <Button className={style.btn}>
        Submit
      </Button>
    </form>
  );
}

export default ForgotNewPassword;
