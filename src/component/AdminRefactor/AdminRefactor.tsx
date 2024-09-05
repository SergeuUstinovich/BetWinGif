import { AreaSelector, IArea, IAreaRendererProps } from "@bmunozg/react-image-area";
import ListBox from "../../ui/ListBox/ListBox";
import style from "./AdminRefactor.module.scss";
import MenegerArr from "../MenegerArr/MenegerArr";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../ui/Button";
import { v4 } from "uuid";

interface ITextArea extends IArea {
    id: string;
    text: string;
    fontSize: string;
    color: string;
}

function AdminRefactor({ arr,}) {
  const [areas, setAreas] = useState<ITextArea[]>([]);
  const [areasHelp, setAreasHelp] = useState<ITextArea[]>([]);
  const { t } = useTranslation();
  const [editingId, setEditingId] = useState<string | null>(null);

  const customRender = (areaProps: IAreaRendererProps) => {
    if (!areaProps.isChanging) {
        return (
            <div key={areaProps.areaNumber}>
                {areaProps.areaNumber}
            </div>
        );
    }
    };

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

  const onTextChange = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const newAreas = areas.map(area =>
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
  

  const toggleEditing = (id: string) => {
    if (editingId === id) {
      setEditingId(null);
    //   setAreasHelp(areas)
    //   setAreas([]);
    } else {
      setEditingId(id);
    }
  };

  return (
    <div className={style.admin}>
      <div className={style.managerBox}>
        {arr &&
          arr.map((item) => (
            <div key={item.picture_id} className={style.box}>
              {editingId === item.picture_id ? (
                <div style={{width: "max-content"}}>
                    <AreaSelector key={item.picture_id} customAreaRenderer={customRender} areas={areas} onChange={onChangeHandler}>
                    <div className={`${style.boxImg}`}>
                        <img src={item.url} alt="image" />

                        <MenegerArr arr={areas} />
                    </div>
                    </AreaSelector>
                </div>
              ) : (
                <div className={`${style.boxImg}`}>
                  <img src={item.url} alt="image" />
                  <MenegerArr arr={areas} />
                </div>
              )}
              <Button
                className={style.adminBtn}
                onClick={() => toggleEditing(item.picture_id)}
              >
                {editingId === item.picture_id ? "Завершить" : "Редактировать"}
              </Button>
            </div>
          ))}
      </div>
      {editingId && (
        <div>
          {areas.map((area) => (
            <div key={area.id}>
              <input
                type="text"
                value={area.text}
                onChange={(event) => onTextChange(area.id, event)}
                placeholder="Введите текст"
              />
              <input
              disabled={editingId === null}
              type="text"
              value={area.fontSize}
              onChange={(event) => onFontSizeChange(area.id, event)}
              placeholder="Размер шрифта (например, 16px)"
            />
            <input
              disabled={editingId === null}
              type="color"
              value={area.color}
              onChange={(event) => onColorChange(area.id, event)}
            />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminRefactor;
