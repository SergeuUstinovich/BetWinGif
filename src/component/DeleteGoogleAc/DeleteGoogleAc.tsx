import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../ui/Button";
import style from "./DeleteGoogleAc.module.scss";
import { useMutation } from "@tanstack/react-query";
import { deleteProfileGoogle } from "../../api/authUser";
import { queryClient } from "../../api/queryClient";
import { useDispatch, useSelector } from "react-redux";
import { tokenActions } from "../../providers/StoreProvider";
import { getTokenUser } from "../../providers/StoreProvider/selectors/getTokenUser";

function DeleteGoogleAc() {
  const { t } = useTranslation();
  const [deleteHidden, setDeleteHidden] = useState(false);
  const dispatch = useDispatch()
  const token = useSelector(getTokenUser)
  const handleInputHidden = () => {
    setDeleteHidden((prev) => !prev);
  };
  const mutateDeleteGoogle = useMutation({
    mutationFn: (data:{token:string}) => deleteProfileGoogle(data.token),
    onSuccess: () =>{
        dispatch(tokenActions.logout())
    }
  },queryClient)
  const handleDelete = () => {
    mutateDeleteGoogle.mutate({token})
  }
  return (
    <div>
      <Button
        className={!deleteHidden ? style.deleteBtn : style.cancel}
        onClick={handleInputHidden}
      >
        {!deleteHidden ? t("Delete account") : "Отмена"}
      </Button>
      {deleteHidden && (
        <>
          <p>Подтвердите удаление</p>
          <Button onClick={handleDelete} className={style.deleteBtn}>{t("Delete account")}</Button>
        </>
      )}
    </div>
  );
}

export default DeleteGoogleAc;
