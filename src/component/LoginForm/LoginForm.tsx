import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../ui/Button";
import style from "./LoginForm.module.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginScheme, LoginType } from "../../types/AuthType";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTokenUser } from "../../providers/StoreProvider/selectors/getTokenUser";
import { tokenActions } from "../../providers/StoreProvider";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/authUser";
import { queryClient } from "../../api/queryClient";
import { useTranslation } from "react-i18next";

function LoginForm() {
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const token = useSelector(getTokenUser);
  const navigator = useNavigate();
  const dispatch = useDispatch()
  const { t } = useTranslation();

  const handleShowPass = () => {
    setShowPass((prev) => !prev);
  };

  const mutateLogin = useMutation(
    {
      mutationFn: (data: { email: string; password: string }) =>
        loginUser(data.email, data.password),
      onSuccess: (data) => {
        dispatch(tokenActions.initAuthData(data))
        reset()
      }
    },
    queryClient
  );

 

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<LoginType>({
    resolver: zodResolver(LoginScheme),
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    // const savedPassword = localStorage.getItem("password");
    if (savedEmail) { //&& savedPassword
      setValue("email", savedEmail);
      // setValue("password", savedPassword);
      setRememberMe(true);
    }
  }, [setValue]);

  const handleRemember = () => {
    setRememberMe((prev) => !prev);
  };

  const onSubmit = (data: LoginType) => {
    if (rememberMe) {
      localStorage.setItem("email", data.email);
      // localStorage.setItem("password", data.password);
    } else {
      localStorage.removeItem("email");
      // localStorage.removeItem("password");
    }
    mutateLogin.mutate({email: data.email, password: data.password})
  };

  useEffect(() => {
    if (token) {
      navigator("/");
    }
  }, [token]);

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <label>
        <span className={style.formTitle}>Email</span>
        <input
          className={`input ${errors.email ? "border-danger" : ""}`}
          placeholder="email@email.com"
          type="email"
          autoComplete="username"
          {...register("email")}
        />
        {errors && <span className={style.error}>{t(errors.email?.message)}</span>}
      </label>
      <label>
        <div className={style.boxForgot}>
          <span className={style.formTitle}>Password</span>
          <Link to={"forgot"} className={style.forgotPass}>
            Forgot Password?
          </Link>
        </div>
        <div
          className={`input max-w-72 ${errors.password ? "border-danger" : ""}`}
          data-toggle-password="true"
        >
          <input
            autoComplete="current-password"
            placeholder="Enter Password"
            type={!showPass ? "password" : "text"}
            {...register("password")}
          />
          <div
            onClick={handleShowPass}
            className="btn btn-icon"
            data-toggle-password-trigger="true"
          >
            {!showPass ? (
              <i className="ki-outline ki-eye toggle-password-active:hidden"></i>
            ) : (
              <i className="ki-outline ki-eye-slash toggle-password-active:block"></i>
            )}
          </div>
        </div>
        {errors && (
          <span className={style.error}>{t(errors.password?.message)}</span>
        )}
      </label>
      <label className="form-label flex items-center gap-2.5">
        <input
          className="checkbox"
          name="check"
          type="checkbox"
          value="1"
          checked={rememberMe}
          onChange={handleRemember}
        />
        Remember me
      </label>
      {mutateLogin.error && <span className={style.error}>{mutateLogin.error.message}</span>}
      <Button isLoading={mutateLogin.isPending} className={style.btnSub}>Sign in</Button>
    </form>
  );
}

export default LoginForm;
