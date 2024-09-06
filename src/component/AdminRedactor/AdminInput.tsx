import { InputData, inputsData } from "./inputData";
import style from "./AdminRedactor.module.scss";

interface MyComponentProps {
  index: number;
  texts: string[];
  textSizes: string[];
  textColors: string[];
  handleTextChange: (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleSizeChange: (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleColorChange: (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

function AdminInput({
  index,
  texts,
  textSizes,
  textColors,
  handleTextChange,
  handleSizeChange,
  handleColorChange,
}: MyComponentProps) {
  const data: InputData[] = inputsData(
    index,
    texts,
    textSizes,
    textColors,
    handleTextChange,
    handleSizeChange,
    handleColorChange
  );

  return (
    <div>
      {data.map((input, idx) => (
        <input
          key={idx}
          className={style.redactorIn}
          type={input.type}
          placeholder={input.placeholder}
          value={input.value}
          onChange={input.onChange}
        />
      ))}
    </div>
  );
}

export default AdminInput
