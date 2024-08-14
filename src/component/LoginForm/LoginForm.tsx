import { Link } from "react-router-dom";
import { Button } from "../../ui/Button";
import style from "./LoginForm.module.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginScheme, LoginType } from "../../types/AuthType";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginType>({
    resolver: zodResolver(LoginScheme),
  });

  return (
    <form className={style.form} onSubmit={handleSubmit(({}) => {})}>
      <label>
        <span className={style.formTitle}>Email</span>
        <input
          className="input"
          placeholder="email@email.com"
          type="email"
          {...register("email")}
        />
        {errors && <span className={style.error}>{errors.email?.message}</span>}
      </label>
      <label>
        <div className={style.boxForgot}>
          <span className={style.formTitle}>Password</span>
          <Link to={"forgot"} className={style.forgotPass}>
            Forgot Password?
          </Link>
        </div>
        <div className="input max-w-72" data-toggle-password="true">
          <input
            placeholder="Enter Password"
            type="password"
            {...register("password")}
          />
          <div className="btn btn-icon" data-toggle-password-trigger="true">
            <i className="ki-outline ki-eye toggle-password-active:hidden"></i>
            <i className="ki-outline ki-eye-slash hidden toggle-password-active:block"></i>
          </div>
        </div>
        {errors && (
          <span className={style.error}>{errors.password?.message}</span>
        )}
      </label>
      <label className="form-label flex items-center gap-2.5">
        <input className="checkbox" name="check" type="checkbox" value="1" />
        Remember me
      </label>
      <Button className={style.btnSub}>Sign in</Button>
    </form>
  );
}

export default LoginForm;
