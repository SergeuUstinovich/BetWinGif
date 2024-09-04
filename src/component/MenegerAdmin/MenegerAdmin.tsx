import { AreaSelector, IArea } from "@bmunozg/react-image-area";
import { useState } from "react";
import img from "../../assets/img/png/image.png";
import { v4 } from "uuid";
import style from "./MenegerAdmin.module.scss";
import ListBox from "../../ui/ListBox/ListBox";
import { useTranslation } from "react-i18next";

interface ITextArea extends IArea {
  id: string;
  text: string;
  fontSize: string;
  color: string;
}

const MenegerAdmin = () => {
  const [areas, setAreas] = useState<ITextArea[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const { t } = useTranslation();
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [selectedCurrency, setSelectedCurrency] = useState();

  const onChangeHandler = (areas: IArea[]) => {
    setAreas(
      areas.map((area) => ({
        ...area,
        id: v4(),
        text: "",
        fontSize: "16",
        color: "#000000",
      }))
    );
  };

  const onTextChange = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newAreas = areas.map((area) =>
      area.id === id ? { ...area, text: event.target.value } : area
    );
    setAreas(newAreas);
  };

  const onFontSizeChange = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newAreas = areas.map((area) =>
      area.id === id ? { ...area, fontSize: event.target.value } : area
    );
    setAreas(newAreas);
  };

  const onColorChange = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newAreas = areas.map((area) =>
      area.id === id ? { ...area, color: event.target.value } : area
    );
    setAreas(newAreas);
  };

  const removeArea = (id: string) => {
    const newAreas = areas.filter((area) => area.id !== id);
    setAreas(newAreas);
  };

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    setImageDimensions({ width: naturalWidth, height: naturalHeight });
  };

  const handleChangeCountry = (value) => {
    setSelectedCountry(value);
  };

  const handleChangeLanguage = (value) => {
    setSelectedLanguage(value);
  };

  const handleChangeCurrency = (value) => {
    setSelectedCurrency(value);
  };

  return (
    <div
      className={style.managerBox}
      // style={{ width: `${imageDimensions.width}px` }}
    >
      <div>
        <img style={{ display: "none" }} src={img} alt="" />
        <button className={style.managerButton} onClick={toggleEditing}>
          {isEditing ? "Завершить" : "Редактировать"}
        </button>
      </div>

      {!isEditing ? (
        <div
          className={style.box}
          style={{
            width: `${imageDimensions.width}px`,
            height: `${imageDimensions.height}px`,
          }}
        >
          <img src={img} alt="my image" onLoad={handleImageLoad} />

          {areas.map((area) => (
            <div
              key={area.id}
              className={style.boxInfo}
              style={{
                position: "absolute",
                left: area.x,
                top: area.y,
                width: area.width,
                height: area.height,
                fontSize: `${area.fontSize}px`,
                color: area.color,
              }}
            >
              {area.text}
            </div>
          ))}
        </div>
      ) : (
        <AreaSelector areas={areas} onChange={onChangeHandler}>
          <div className={style.box}>
            
            <img src={img} alt="my image" />
            {areas.map((area) => (
              <div
                className={style.boxInfo}
                key={area.id}
                style={{
                  position: "absolute",
                  left: area.x,
                  top: area.y,
                  width: area.width,
                  height: area.height,
                  fontSize: `${area.fontSize}px`,
                  color: area.color,
                }}
              >
                {area.text}
              </div>
            ))}
          </div>
        </AreaSelector>
      )}

      <div>
        {areas.map((area, index) => (
          
          <div key={area.id}>
            <input
              disabled={!isEditing}
              type="text"
              value={area.text}
              onChange={(event) => onTextChange(area.id, event)}
              placeholder="Введите текст"
            />
            <input
              disabled={!isEditing}
              type="text"
              value={area.fontSize}
              onChange={(event) => onFontSizeChange(area.id, event)}
              placeholder="Размер шрифта (например, 16px)"
            />
            <input
              disabled={!isEditing}
              type="color"
              value={area.color}
              onChange={(event) => onColorChange(area.id, event)}
            />
            <div>
              Area {index + 1}: x={area.x}, y={area.y}, width={area.width},
              height={area.height}, text={area.text}, fontSize={area.fontSize}
              px, color={area.color}
            </div>
            <div>
              <ListBox
                defaultValue={t("Country")}
                onChange={handleChangeCountry}
                value={selectedCountry}
                hiddenArrow
                items={[
                  { value: "en", content: "en", id: "1" },
                  { value: "ru", content: "ru", id: "2" },
                  { value: "fr", content: "fr", id: "3" },
                  { value: "es", content: "es", id: "4" },
                  { value: "pr", content: "pr", id: "5" },
                ]}
              />
              <ListBox
                defaultValue={t("Language")}
                onChange={handleChangeLanguage}
                value={selectedLanguage}
                hiddenArrow
                items={[
                  { value: "en", content: "en", id: "1" },
                  { value: "ru", content: "ru", id: "2" },
                  { value: "fr", content: "fr", id: "3" },
                  { value: "es", content: "es", id: "4" },
                  { value: "pr", content: "pr", id: "5" },
                ]}
              />
              <ListBox
                defaultValue={t("Currency")}
                onChange={handleChangeCurrency}
                value={selectedCurrency}
                hiddenArrow
                items={[
                  { value: "en", content: "en", id: "1" },
                  { value: "ru", content: "ru", id: "2" },
                  { value: "fr", content: "fr", id: "3" },
                  { value: "es", content: "es", id: "4" },
                  { value: "pr", content: "pr", id: "5" },
                ]}
              />
            </div>
            <button onClick={() => removeArea(area.id)}>Удалить</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenegerAdmin;
