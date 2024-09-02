import style from "./PasswordModal.module.scss";
import { useState } from "react";
import { Button, Modal } from "../../ui";
import passwordChanged from "../../assets/img/png/PasswordChanged.png";

export const PasswordModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal isOpen={isModalOpen} onClose={handleClose}>
      <div className={style.modalBlock}>
        <h2 className={style.modalTitle}>Step 2</h2>
        <div className={style.modalDownBlock}>
          <img
            className={style.modalImg}
            src={passwordChanged}
            alt="password"
          />
          <h3 className={style.modalDownTitle}>Your password is changed</h3>
          <p className={style.modalText}>
            Your password has been successfully updated. Your account's security
            is our priority.
          </p>
        </div>
        <Button onClick={handleClose} className={style.modalButton}>
          Done
        </Button>
      </div>
    </Modal>
  );
};
