import { AreaSelector, IArea } from "@bmunozg/react-image-area";
import { useState } from "react";
import img from "../../assets/img/png/image.png";
import { v4 } from "uuid";
import style from "./MenegerAdmin.module.scss";

interface ITextArea extends IArea {
  id: string;
  text: string;
}

const MenegerAdmin = () => {
  const [areas, setAreas] = useState<ITextArea[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const onChangeHandler = (areas: IArea[]) => {
    setAreas(areas.map((area) => ({ ...area, id: v4(), text: "" })));
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

  return (
    <div style={{width: `${imageDimensions.width + 10}px`}}>
      <div>
        <img style={{ display: "none" }} src={img} alt="" />
        <button onClick={toggleEditing}>
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
            <div>
              Area {index + 1}: x={area.x}, y={area.y}, width={area.width},
              height={area.height} text={area.text}
            </div>
            <button onClick={() => removeArea(area.id)}>Удалить</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenegerAdmin;
