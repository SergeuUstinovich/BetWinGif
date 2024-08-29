import style from "./PromocodeModal.module.scss";
import { useEffect, useState } from "react";
import { Button, Modal } from "../../ui";
import { useMutation } from "@tanstack/react-query";
import { createPromorcode } from "../../api/gifAdd";
import { queryClient } from "../../api/queryClient";
import { useSelector } from "react-redux";
import { getTokenUser } from "../../providers/StoreProvider/selectors/getTokenUser";
import { PasswordModal } from "../PasswordModal";

export const PromocodeModal = ({isPromoCheck}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promocode, setPromocode] = useState<string>('');
  const token = useSelector(getTokenUser)

  const mutatePromo = useMutation(
    {
      mutationFn: (data: { token: string; promocode: string }) =>
        createPromorcode(data.token, data.promocode),
      onSuccess: () => {
        setIsModalOpen(false);
      }
    },
    queryClient
  );

  useEffect(() => {
    if(isPromoCheck) {
      setIsModalOpen(true)
    }
  }, [isPromoCheck])

  const handleSave = () => {
    mutatePromo.mutate({ token, promocode });
  };

  if(mutatePromo.isSuccess) {
    return (<PasswordModal />)
  }

  return (
    <Modal isOpen={isModalOpen}>
      <div className={style.modalBlock}>
        <h2 className={style.modalTitle}>Step 1</h2>
        <p className={style.modalText}>
          We regret to see you leave. Confirm account deletion below. Your data
          will be permanently removed. Thank you for being part of our
          community. Please check our Setup Guidelines if you still wish
          continue.We regret to see you leave. Confirm account deletion below.
          Your data will be permanently removed. Thank you for being part of our
          community. Please check our Setup Guidelines if you still wish
          continue.
        </p>

        <label className={style.modalInputBlock} htmlFor="">
          <span>Your promocode</span>
          <input maxLength={15} className={style.modalInput} value={promocode}
            onChange={(e) => setPromocode(e.target.value)} />
        </label>
        {mutatePromo.error && <span className={style.error}>{mutatePromo.error.message}</span>}
        <button onClick={handleSave} className={style.modalButton}>
          Save
        </button>
      </div>
    </Modal>
  );
};
