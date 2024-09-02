import { useTranslation } from "react-i18next";
import style from "./SetPassword.module.scss";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { setCodeScheme, setCodeType } from "../../types/AuthType";
import { useMutation } from "@tanstack/react-query";
import { setPasswordUser } from "../../api/authUser";
import { queryClient } from "../../api/queryClient";
import { Button } from "../../ui/Button";
import { useSelector } from "react-redux";
import { getTokenUser } from "../../providers/StoreProvider/selectors/getTokenUser";
import toast from "react-hot-toast";

function SetPassword() {
  const { t } = useTranslation();
  const token = useSelector(getTokenUser)
  const [formHidden, setFormHidden] = useState(false);
  const [oldshowPass, setOldShowPass] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showPassConf, setShowPassConf] = useState(false);

  const mutateSetPassword = useMutation(
    {
      mutationFn: (data: {
        new_password: string;
        re_new_password: string;
        old_password: string;
        token:string
      }) =>
        setPasswordUser(
          data.new_password,
          data.re_new_password,
          data.old_password,
          data.token
        ),
      onSuccess: () => {
        setFormHidden(false)
        toast.success('Пароль успешно изменён')
        reset();
      },
    },
    queryClient
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<setCodeType>({
    resolver: zodResolver(setCodeScheme),
  });

  const handleOldShowPass = () => {
    setOldShowPass((prev) => !prev);
  };

  const handleShowPass = () => {
    setShowPass((prev) => !prev);
  };

  const handleShowPassConf = () => {
    setShowPassConf((prev) => !prev);
  };

  const handleFormHidden = () => {
    setFormHidden((prev) => !prev);
    reset();
  };

  return (
    <div>
      <Button
        className={formHidden ? style.change : style.btn}
        onClick={handleFormHidden}
      >
        {!formHidden ? t("Change password") : "Отмена"}
      </Button>
      {formHidden && (
        <form
          className={style.form}
          onSubmit={handleSubmit(({ old_password, password, confirmPassword }) => {
            mutateSetPassword.mutate({new_password: password, re_new_password:confirmPassword, old_password, token})
          })}
        >
          <label className={style.label}>
            <span className={style.formTitle}>Old Password</span>
            <div
              className={`input max-w-72 ${
                errors.old_password ? "border-danger" : ""
              }`}
              data-toggle-password="true"
            >
              <input
                autoComplete="new-password"
                placeholder="Old Password"
                type={!oldshowPass ? "password" : "text"}
                {...register("old_password")}
              />
              <div
                onClick={handleOldShowPass}
                className="btn btn-icon"
                data-toggle-password-trigger="true"
              >
                {!oldshowPass ? (
                  <i className="ki-outline ki-eye toggle-password-active:hidden"></i>
                ) : (
                  <i className="ki-outline ki-eye-slash toggle-password-active:block"></i>
                )}
              </div>
            </div>
            {errors && (
              <span className={style.error}>
                {t(errors.old_password?.message)}
              </span>
            )}
          </label>
          <label className={style.label}>
            <span className={style.formTitle}>Password</span>
            <div
              className={`input max-w-72 ${
                errors.password ? "border-danger" : ""
              }`}
              data-toggle-password="true"
            >
              <input
                autoComplete="new-password"
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
          <label className={style.label}>
            <span className={style.formTitle}>Confirm Password</span>
            <div
              className={`input max-w-72 ${
                errors.confirmPassword ? "border-danger" : ""
              }`}
              data-toggle-password="true"
            >
              <input
                autoComplete="new-password"
                placeholder="Re-enter Password"
                type={!showPassConf ? "password" : "text"}
                {...register("confirmPassword")}
              />
              <div
                onClick={handleShowPassConf}
                className="btn btn-icon"
                data-toggle-password-trigger="true"
              >
                {!showPassConf ? (
                  <i className="ki-outline ki-eye toggle-password-active:hidden"></i>
                ) : (
                  <i className="ki-outline ki-eye-slash toggle-password-active:block"></i>
                )}
              </div>
            </div>
            {errors && (
              <span className={style.error}>
                {t(errors.confirmPassword?.message)}
              </span>
            )}
          </label>
          {mutateSetPassword.error && <span className={style.error}>{mutateSetPassword.error.message}</span>}
          <Button isLoading={mutateSetPassword.isPending} className={style.btn}>Submit</Button>
        </form>
      )}
    </div>
  );
}

export default SetPassword;
