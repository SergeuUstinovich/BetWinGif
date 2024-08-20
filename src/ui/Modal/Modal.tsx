import { FC } from "react";
import style from "./Modal.module.scss";
import { Button } from "../Button";

interface ModalProps {
  step: string;
  icon?: string;
  title?: string;
  label: string;
  cancelButton?: string;
  submitButton: string;
}

export const Modal: FC<ModalProps> = ({
  step,
  icon,
  title,
  label,
  cancelButton,
  submitButton,
}) => {
  return (
    <div className="modal" data-modal="true" id="modal_1_1">
      <div className="modal-content max-w-[600px] top-[10%]">
        <div className="modal-header">
          <h3 className="modal-title">{step}</h3>
          <Button
            className="btn btn-xs btn-icon btn-light"
            data-modal-dismiss="true"
          >
            <i className="ki-outline ki-cross"></i>
          </Button>
        </div>
        <div className="modal-body">
          <img className={style.modalImg} src={icon} alt="" />
          <p>{label}</p>
        </div>
        <div className="modal-footer justify-end">
          <div className="flex gap-4">
            <Button className="btn btn-light" data-modal-dismiss="true">
              {cancelButton}
            </Button>
            <Button className="btn btn-primary">{submitButton}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
