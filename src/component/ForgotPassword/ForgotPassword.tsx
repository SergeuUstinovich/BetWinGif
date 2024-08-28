import { useState } from "react";
import ArrowSvgForgot from "../../assets/svg/ArrowSvgForgot/ArrowSvgForgot";
import { Button } from "../../ui/Button";
import CheckedAuth from "../CheckedAuth/CheckedAuth";
import style from "./ForgotPassword.module.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotEmailScheme, ForgotEmailType } from "../../types/AuthType";
import { useMutation } from "@tanstack/react-query";
import { resetUser } from "../../api/authUser";
import { queryClient } from "../../api/queryClient";

function ForgotPassword() {
    const [succesPost, setSuccesPost] = useState(false);
    const [emails, setEmails] = useState("");

    const mutateReset = useMutation({
      mutationFn: (data:{email:string}) => resetUser(data.email),
      onSuccess: () => {
        setSuccesPost(true)
        reset()
      }
    }, queryClient)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm<ForgotEmailType>({
        resolver: zodResolver(ForgotEmailScheme),
      });

    if(succesPost) {
        return <CheckedAuth email={emails} />
    }

  return (
    <form className={style.form} onSubmit={handleSubmit(({email}) => {
        mutateReset.mutate({email})
        setEmails(email)
    })}>
      <h2 className={style.title}>Your Email</h2>
      <p className={style.descr}>Enter your email to reset password</p>
      <label className={style.label}>
        <span className={style.formTitle}>Email</span>
        <input
          className={`input ${errors.email ? 'border-danger': ''}`}
          placeholder="email@email.com"
          type="email"
          required
          {...register('email')}
        />
        {errors && <span className={style.error}>{errors.email?.message}</span>}
      </label>
      {mutateReset.error && <span className={style.error}>{mutateReset.error.message}</span>}
      <Button isLoading={mutateReset.isPending} className={style.btn}>Contoinue <ArrowSvgForgot /></Button>
    </form>
  );
}

export default ForgotPassword;
