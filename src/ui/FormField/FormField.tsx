import { FC, ReactNode } from "react";
import style from "./FormField.module.scss";
import { classNames } from "../../utils/classNames";

interface IFormFieldProps {
  label: string;
  children: ReactNode;
  errorMessage?: string;
  className?: string;
}

export const FormField: FC<IFormFieldProps> = ({
  children,
  label,
  errorMessage,
  className = ''
}) => {
  return (
    <label className={classNames(style.field, {}, [className])}>
      <span className={style.field__label}>{label}</span>
      {children}
      {errorMessage && (
        <span className={style.field__error}>{errorMessage}</span>
      )}
    </label>
  );
};
