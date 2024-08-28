import style from "./PromocodeModal.module.scss";
import { useState } from "react";
import { Button, Modal } from "../../ui";
import { useMutation } from "@tanstack/react-query";
import { createPromorcode } from "../../api/gifAdd";
import { queryClient } from "../../api/queryClient";
import { useSelector } from "react-redux";
import { getTokenUser } from "../../providers/StoreProvider/selectors/getTokenUser";

export const PromocodeModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
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

  const handleSave = () => {
    mutatePromo.mutate({ token, promocode });
  };

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
        <button onClick={handleSave} className={style.modalButton}>
          Save
        </button>
      </div>
    </Modal>
  );
};
