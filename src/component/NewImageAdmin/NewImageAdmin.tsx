import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAdminImg } from "../../providers/StoreProvider/selectors/getAdminImg";
import { useRef, useState } from "react";
import style from "./NewImageAdmin.module.scss";
import Draggable from "react-draggable";
import { Button } from "../../ui/Button";
import { useTranslation } from "react-i18next";
import { listBoxItems } from "./dataImg";
import ListFilter from "./ListFilter";

const NewImageAdmin = () => {
  const arrImg = useSelector(getAdminImg);
  const { t } = useTranslation();
  const { picture_id } = useParams();
  const draggableRefs = useRef<HTMLDivElement>(null);
  const card = arrImg.find((item) => item.picture_id === Number(picture_id));
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [text, setText] = useState("Мой текст");
  const [fontSize, setFontSize] = useState(16);
  const [color, setColor] = useState("#000000");

  const initialSelectedValues = {
    country: "",
    language: "",
    currency: "",
    banner_format: "",
    banner_theme: "",
  };

  const [blocks, setBlocks] = useState([
    { id: 1, selectedValues: initialSelectedValues },
  ]);

  const handleDrag = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const addBlock = () => {
    setBlocks([
      ...blocks,
      { id: blocks.length + 1, selectedValues: initialSelectedValues },
    ]);
  };

  const handleListBoxChange = (blockId, listBoxId, value) => {
    setBlocks(
      blocks.map((block) =>
        block.id === blockId
          ? {
              ...block,
              selectedValues: { ...block.selectedValues, [listBoxId]: value },
            }
          : block
      )
    );
  };

  const validateBlocks = () => {
    return blocks.every((block) =>
      Object.values(block.selectedValues).every((value) => value !== "")
    );
  };

  const saveData = () => {
    if (!validateBlocks()) {
      alert("Все поля должны быть заполнены!");
      return;
    }
    const draggableRef = draggableRefs.current;
    if (draggableRef) {
      const textWidth = draggableRef.offsetWidth;
      const textHeight = draggableRef.offsetHeight;
      const data = blocks.map((block) => ({
        picture_id: card.picture_id,
        country: block.selectedValues.country,
        language: block.selectedValues.language,
        value: block.selectedValues.currency,
        format: block.selectedValues.banner_format,
        topic: block.selectedValues.banner_theme,
        color: color,
        left: position.x.toString(),
        right: (position.x + textWidth).toString(),
        top: position.y.toString(),
        bottom: (position.y + textHeight).toString(),
        size: fontSize,
      }));
      console.log({ pictures: data });
    }
  };

  const removeBlock = (blockId) =>
    setBlocks(blocks.filter((block) => block.id !== blockId));

  return (
    <div className={style.redactorBox}>
      <div className={style.draggableImgBox}>
        <Draggable
          nodeRef={draggableRefs}
          bounds="parent"
          position={position}
          onDrag={handleDrag}
        >
          <div
            ref={draggableRefs}
            className={style.draggableBox}
            style={{
              fontSize: `${fontSize}px`,
              color: color,
            }}
          >
            {text}
          </div>
        </Draggable>
        <img className={style.redactorImg} src={card.url} alt={`img`} />
      </div>
      <div className={style.controls}>
        <input
          className={`${style.text} ${style.inputAdmin}`}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Введите текст"
        />
        <input
          className={`${style.size} ${style.inputAdmin}`}
          type="number"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          placeholder="Размер шрифта"
        />
        <input
          className={style.color}
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      {blocks.map((block) => (
        <ListFilter
          key={block.id}
          block={block}
          listBoxItems={listBoxItems}
          handleListBoxChange={handleListBoxChange}
          removeBlock={removeBlock}
          t={t}
        />
      ))}
      <Button onClick={addBlock}>Добавить блок</Button>
      <div className={style.btnBox}>
        <Button
          // isLoading={mutateCreateImg.isPending}
          // isDisabled={btnDisable}
          className={style.adminRedactorButton}
          onClick={saveData}
        >
          Отправить
        </Button>
      </div>
    </div>
  );
};

export default NewImageAdmin;
