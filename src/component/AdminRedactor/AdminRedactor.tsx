import style from "./AdminRedactor.module.scss";
import React, { useEffect, useState, useRef } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import ListBox from "../../ui/ListBox/ListBox";
import { useTranslation } from "react-i18next";

interface Image {
  picture_id: string;
  url: string;
}

interface TestProps {
  images: Image[];
}

export const AdminRedactor: React.FC<TestProps> = ({ images }) => {
    const { t } = useTranslation(); 
    const [selectedCountry, setSelectedCountry] = useState(t("Country"));
    const [selectedLanguage, setSelectedLanguage] = useState(t("Language"));
    const [selectedCurrency, setSelectedCurrency] = useState(t("Currency"));
    const [selectedBannerFormat, setSelectedBannerFormat] = useState(t("Banner format"));
    const [selectedBannerTheme, setSelectedBannerTheme] = useState(t("Banner theme"));

    
  const [textPositions, setTextPositions] = useState<{ x: number; y: number }[]>([]);
  const [texts, setTexts] = useState<string[]>([]);
  const [textSizes, setTextSizes] = useState<number[]>([]);
  const [textColors, setTextColors] = useState<string[]>([]);
  const draggableRefs = useRef<(React.RefObject<HTMLDivElement>)[]>([]);

  useEffect(() => {
    if (images) {
      setTextPositions(images.map(() => ({ x: 0, y: 0 })));
      setTexts(images.map(() => "Your Text"));
      setTextSizes(images.map(() => 30)); // Default text size
      setTextColors(images.map(() => "#fff")); // Default text color
      draggableRefs.current = images.map(() => React.createRef<HTMLDivElement>());
    }
  }, [images]);

  const handleDrag = (index: number, e: DraggableEvent, data: DraggableData) => {
    const newTextPositions = [...textPositions];
    newTextPositions[index] = { x: data.x, y: data.y };
    setTextPositions(newTextPositions);
    console.log(`Text ${index} position:`, newTextPositions[index]);
  };

  const handleTextChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newTexts = [...texts];
    newTexts[index] = event.target.value;
    setTexts(newTexts);
  };

  const handleSizeChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newSizes = [...textSizes];
    newSizes[index] = parseInt(event.target.value, 10);
    setTextSizes(newSizes);
  };

  const handleColorChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newColors = [...textColors];
    newColors[index] = event.target.value;
    setTextColors(newColors);
  };

  const handleChangeCountry = (value) => {
    setSelectedCountry(value);
  };

  const handleChangeLanguage = (value) => {
    setSelectedLanguage(value)
  }

  const handleChangeCurrency = (value) => {
    setSelectedCurrency(value);
  };

  const handleChangeBannerFormat = (value) => {
    setSelectedBannerFormat(value);
  };

  const handleChangeBannerTheme = (value) => {
    setSelectedBannerTheme(value);
  };

  return (
    <div className={style.mainBox}>
      {images &&
        images.map((image, index) => (
          <div key={image.picture_id} className={style.redactorBox}>
            <Draggable
              position={textPositions[index]}
              onDrag={(e, data) => handleDrag(index, e, data)}
              bounds="parent"
            //   nodeRef={draggableRefs.current[index].current}
            >
              <div
                ref={draggableRefs.current[index]}
                className={style.draggableBox}
                style={{ fontSize: `${textSizes[index]}px`, color: textColors[index] }}
              >
                {texts[index]}
              </div>
            </Draggable>
            <img
              className={style.redactorImg}
              src={image.url}
              alt={`img-${index}`}
            />
            <input
                className={style.redactorIn}
                type="text"
                value={texts[index] || ""}
                onChange={(event) => handleTextChange(index, event)}
            />
            <input
              className={style.redactorIn}
              type="number"
              value={textSizes[index]}
              onChange={(event) => handleSizeChange(index, event)}
              placeholder="Text Size"
            />
            <input
              className={style.redactorIn}
              type="color"
              value={textColors[index]}
              onChange={(event) => handleColorChange(index, event)}
              placeholder="Text Color"
            />
                    <ul className={`${style.topbar}`}>
            <li className={style.defaultSelect}>
                <ListBox
                defaultValue={t("Country")}
                onChange={handleChangeCountry}
                value={selectedCountry}
                items={[
                    { value: "en", content: "en", id: "1" },
                    { value: "ru", content: "ru", id: "2"},
                    { value: "fr", content: "fr", id: "3" },
                ]}
                />
            </li>

            <li className={style.defaultSelect}>
                <ListBox
                defaultValue={t("Language")}
                onChange={handleChangeLanguage}
                value={selectedLanguage}
                items={[
                    { value: "en", content: "English", id: "1" },
                    { value: "ru", content: "Русский", id: "2"},
                    { value: "fr", content: "Française", id: "3" },
                ]}
                />
            </li>

            <li className={style.defaultSelect}>
                <ListBox
                defaultValue={t("Currency")}
                value={selectedCurrency}
                onChange={handleChangeCurrency}
                items={[{ value: "en", content: "English", id: "1" }]}
                />
            </li>

            <li className={style.defaultSelect}>
                <ListBox
                defaultValue={t("Banner format")}
                value={selectedBannerFormat}
                onChange={handleChangeBannerFormat}
                items={[{ value: "en", content: "English", id: "1" }]}
                />
            </li>

            <li className={`${style.defaultSelect} ${style.lastDefaultSelect}`}>
                <ListBox
                defaultValue={t("Banner theme")}
                value={selectedBannerTheme}
                onChange={handleChangeBannerTheme}
                items={[{ value: "en", content: "English", id: "1" }]}
                />
            </li>
      </ul>
          </div>
        ))}
    </div>
  );
};

export default AdminRedactor;
