import { useTranslation } from "react-i18next";
import { Button } from "../../ui/Button";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../api/authUser";
import { queryClient } from "../../api/queryClient";
import { useDispatch, useSelector } from "react-redux";
import { getTokenUser } from "../../providers/StoreProvider/selectors/getTokenUser";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteCodeScheme, deleteCodeType } from "../../types/AuthType";
import style from "./DeleteAccount.module.scss";
import { tokenActions } from "../../providers/StoreProvider";

function DeleteAccount() {
  const { t } = useTranslation();
  const token = useSelector(getTokenUser);
  const [formHidden, setFormHidden] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const dispanch = useDispatch()

  const mutateDelete = useMutation(
    {
      mutationFn: (data: { password: string; token: string }) =>
        deleteUser(data.password, data.token),
      onSuccess: () => {
        dispanch(tokenActions.logout())
      }
    },
    queryClient
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<deleteCodeType>({
    resolver: zodResolver(deleteCodeScheme),
  });

  const handleShowPass = () => {
    setShowPass((prev) => !prev);
  };

  const handleFormHidden = () => {
    setFormHidden((prev) => !prev);
    reset();
  };

  return (
    <div>
      <Button
        className={!formHidden ? style.deleteBtn : style.cancel}
        onClick={handleFormHidden}
      >
        {!formHidden ? t("Delete account") : "Отмена"}
      </Button>
      {formHidden && (
        <form
          className={style.form}
          onSubmit={handleSubmit(({ password }) => {
            mutateDelete.mutate({ password, token });
          })}
        >
          <label className={style.label}>
            <span className={style.formTitle}>Password</span>
            <div
              className={`input max-w-72 ${
                errors.password ? "border-danger" : ""
              }`}
              data-toggle-password="true"
            >
              <input
                autoComplete="password"
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
          {mutateDelete.error && (
            <span className={style.error}>{mutateDelete.error.message}</span>
          )}
          <Button className={style.deleteBtn} isLoading={mutateDelete.isPending}>Delete</Button>
        </form>
      )}
    </div>
  );
}

export default DeleteAccount;
