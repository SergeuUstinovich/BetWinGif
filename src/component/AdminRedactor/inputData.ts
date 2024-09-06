export interface InputData {
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const inputsData = (
    index: number,
    texts: string[],
    textSizes: string[],
    textColors: string[],
    handleTextChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void,
    handleSizeChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void,
    handleColorChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void
  ): InputData[] => [
    {
      type: "text",
      placeholder: "Label",
      value: texts[index] || '',
      onChange: (event) => handleTextChange(index, event),
    },
    {
      type: "number",
      placeholder: "Text Size",
      value: textSizes[index] || '',
      onChange: (event) => handleSizeChange(index, event),
    },
    {
      type: "color",
      placeholder: "Text Color",
      value: textColors[index] || '',
      onChange: (event) => handleColorChange(index, event),
    },
  ];