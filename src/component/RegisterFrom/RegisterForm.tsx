import { useEffect, useState } from "react";
import { Button } from "../../ui/Button";
import style from "./RegisterForm.module.scss";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegistrationForm, RegistrationSchema } from "../../types/AuthType";
import { useTranslation } from "react-i18next";

function RegisterForm() {
  const { t } = useTranslation();
  const [successRegist, setSuccessRegist] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showPassConf, setShowPassConf] = useState(false);
  const [emails, setEmails] = useState("");
  const navigate = useNavigate();


  const handleShowPass = () => {
    setShowPass((prev) => !prev)
  }

  const handleShowPassConf = () => {
    setShowPassConf((prev) => !prev)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegistrationForm>({
    resolver: zodResolver(RegistrationSchema),
  });

  useEffect(() => {
    if (successRegist) {
      navigate("/auth/check", { state: { emailName: emails } });
      setSuccessRegist(false);
    }
  }, [successRegist, navigate]);

  return (
    <form
      className={style.form}
      onSubmit={handleSubmit(({ email }) => {
        setSuccessRegist(true);
        setEmails(email);
      })}
    >
      <label>
        <span className={style.formTitle}>Email</span>
        <input
          className={`input ${errors.email ? 'border-danger': ''}`}
          placeholder="email@email.com"
          type="email"
          {...register("email")}
        />
        {errors && <span className={style.error}>{errors.email?.message}</span>}
      </label>
      <label>
        <span className={style.formTitle}>Password</span>
        <div 
          className={`input max-w-72 ${errors.password ? 'border-danger': ''}`}
          data-toggle-password="true"
        >
          <input
            placeholder="Enter Password"
            type={!showPass? 'password' : 'text'}
            {...register("password")}
          />
          <div onClick={handleShowPass} className="btn btn-icon" data-toggle-password-trigger="true">
          {!showPass ? 
              <i className="ki-outline ki-eye toggle-password-active:hidden"></i> :
              <i className="ki-outline ki-eye-slash toggle-password-active:block"></i>
            }
          </div>
        </div>
        {errors && (
          <span className={style.error}>{errors.password?.message}</span>
        )}
      </label>
      <label>
        <span className={style.formTitle}>Confirm Password</span>
        <div className={`input max-w-72 ${errors.confirmPassword ? 'border-danger': ''}`} data-toggle-password="true">
          <input
            placeholder="Re-enter Password"
            type={!showPassConf? 'password' : 'text'}
            {...register("confirmPassword")}
          />
          <div onClick={handleShowPassConf} className="btn btn-icon" data-toggle-password-trigger="true">
            {!showPassConf ? 
              <i className="ki-outline ki-eye toggle-password-active:hidden"></i> :
              <i className="ki-outline ki-eye-slash toggle-password-active:block"></i>
            }
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
      <Button type="submit" className={style.btnSub}>Sign up</Button>
    </form>
  );
}

export default RegisterForm;
