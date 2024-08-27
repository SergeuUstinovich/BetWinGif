import { useEffect, useState } from "react";
import { Button } from "../../ui/Button";
import style from "./RegisterForm.module.scss";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegistrationForm, RegistrationSchema } from "../../types/AuthType";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/authUser";
import { queryClient } from "../../api/queryClient";

function RegisterForm() {
  const { t } = useTranslation();
  const [showPass, setShowPass] = useState(false);
  const [successRegist, setSuccessRegist] = useState(false);
  const [showPassConf, setShowPassConf] = useState(false);
  const [error, setError] = useState(null);
  const [emails, setEmails] = useState("");
  const navigate = useNavigate();

  const handleShowPass = () => {
    setShowPass((prev) => !prev);
  };

  const handleShowPassConf = () => {
    setShowPassConf((prev) => !prev);
  };

  const mutateRegistr = useMutation({
    mutationFn: (data: {
      email: string;
      password: string;
      re_password: string;
      username: string;
    }) =>
      registerUser(data.email, data.password, data.re_password, data.username),
      onSuccess: () => {
        setSuccessRegist(true);
        setError(null);
      },
      onError: (error) => {
        const errorMessages = Object.keys(error).map(key => `${key}: ${error[key]}`).join(', ');
        console.log(errorMessages)
        setError(errorMessages);
      }
  }, queryClient);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegistrationForm>({
    resolver: zodResolver(RegistrationSchema),
  });

  useEffect(() => {
    if (successRegist && !error) {
      navigate("/auth/check", { state: { emailName: emails } });
      setSuccessRegist(false);
    }
  }, [successRegist, error]);


  return (
    <form
      className={style.form}
      onSubmit={handleSubmit(({ email, password, confirmPassword }) => {
        mutateRegistr.mutate({email, password, re_password: confirmPassword, username: email})
        setEmails(email);
      })}
    >
      <label>
        <span className={style.formTitle}>Email</span>
        <input
          autoComplete="username"
          className={`input ${errors.email ? "border-danger" : ""}`}
          placeholder="email@email.com"
          type="email"
          {...register("email")}
        />
        {errors && <span className={style.error}>{errors.email?.message}</span>}
      </label>
      <label>
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
      <label>
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
      <label className="form-label flex items-center gap-2.5">
        <input
          {...register("consent")}
          className="checkbox"
          type="checkbox"
          defaultChecked
        />
        <p>I accept Terms & Conditions</p>
      </label>
      {errors && <span className={style.error}>{errors.consent?.message}</span>}
      {mutateRegistr.error && <span className={style.error}>{mutateRegistr.error.message}</span>}
      <Button isLoading={mutateRegistr.isPending} type="submit" className={style.btnSub}>
        Sign up
      </Button>
    </form>
  );
}

export default RegisterForm;
