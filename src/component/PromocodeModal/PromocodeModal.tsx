import style from "./PromocodeModal.module.scss";
import { useState } from "react";
import { Button, Modal } from "../../ui";

export const PromocodeModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <input className={style.modalInput} type="number" />
        </label>

        <Button className={style.modalButton}>Save</Button>
      </div>
    </Modal>
  );
};
