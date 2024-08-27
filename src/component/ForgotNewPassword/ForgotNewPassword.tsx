import { useState } from "react";
import { Button } from "../../ui/Button";
import style from "./ForgotNewPassword.module.scss";
import SuccessForgot from "../SuccessForgot/SuccessForgot";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotCodeScheme, ForgotCodeType } from "../../types/AuthType";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordUser } from "../../api/authUser";
import { queryClient } from "../../api/queryClient";

function ForgotNewPassword() {
  const { uid, token } = useParams();
  const [succesPost, setSuccesPost] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showPassConf, setShowPassConf] = useState(false);

  const handleShowPass = () => {
    setShowPass((prev) => !prev);
  };

  const handleShowPassConf = () => {
    setShowPassConf((prev) => !prev);
  };

  const mutateResetPassword = useMutation(
    {
      mutationFn: (data: {
        new_password: string;
        re_new_password: string;
        uid: string;
        token: string;
      }) =>
        resetPasswordUser(
          data.new_password,
          data.re_new_password,
          data.uid,
          data.token
        ),
      onSuccess: () => {
        setSuccesPost(true);
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
  } = useForm<ForgotCodeType>({
    resolver: zodResolver(ForgotCodeScheme),
  });

  if (succesPost) {
    return <SuccessForgot />;
  }

  return (
    <form
      className={style.form}
      onSubmit={handleSubmit(({ password, confirmPassword }) => {
        mutateResetPassword.mutate({
          new_password: password,
          re_new_password: confirmPassword,
          uid,
          token,
        });
      })}
    >
      <h2 className={style.title}>Reset Password</h2>
      <p className={style.descr}>Enter your new password</p>
      <label className={style.label}>
        <span className={style.formTitle}>Password</span>
        <div
          className={`input max-w-72 ${errors.password ? "border-danger" : ""}`}
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
          <span className={style.error}>{errors.password?.message}</span>
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
          <span className={style.error}>{errors.confirmPassword?.message}</span>
        )}
      </label>
      {mutateResetPassword.error && <span className={style.error}>{mutateResetPassword.error.message}</span>}
      <Button isLoading={mutateResetPassword.isPending} className={style.btn}>Submit</Button>
    </form>
  );
}

export default ForgotNewPassword;
