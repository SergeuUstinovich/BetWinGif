import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import style from "../NewImageAdmin/NewImageAdmin.module.scss";
import Draggable from "react-draggable";
import { Button } from "../../ui/Button";
import { useTranslation } from "react-i18next";
import { queryClient } from "../../api/queryClient";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { unifiedPicture } from "../../api/adminImg";
import ListFilter from "../../utils/ListFilter";
import { listBoxItems } from "../NewImageAdmin/dataImg";
import { getAdminGif } from "../../providers/StoreProvider/selectors/getAdminGif";

const NewGifAdmin = () => {
  const arrImg = useSelector(getAdminGif);
  const { t } = useTranslation();
  const { picture_id } = useParams();
  const navigate = useNavigate();
  const draggableRefs = useRef<HTMLDivElement>(null);
  const card = arrImg.find((item) => item.picture_id === Number(picture_id));
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [text, setText] = useState("Тест текст");
  const [fontSize, setFontSize] = useState(30);
  const [color, setColor] = useState("#000000");
  const [startFrame, setStartFrame] = useState<number>(1);
  const [endFrame, setEndFrame] = useState<number>(1000);

  const mutateCreateImg = useMutation(
    {
      mutationFn: (data: { pictures }) => unifiedPicture(data.pictures),
      onSuccess: () => {
        navigate(-1);
        queryClient.invalidateQueries({queryKey: ['adminGif']})
      },
      onError: (err) => {
        toast.error(err.message);
      },
    },
    queryClient
  );

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
        start_frame: startFrame,
        end_frame: endFrame,
      }));
      mutateCreateImg.mutate({ pictures: data });
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
        {card.url && (
          <img className={style.redactorImg} src={card.url} alt={`img`} />
        )}
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
        <div>
          <p>Начало анимации*кадры*</p>
          <input
            className={`${style.text} ${style.inputAdmin}`}
            type="text"
            value={startFrame}
            onChange={(e) => {
              setStartFrame(Number(e.target.value));
            }}
            placeholder="Начало анимации"
          />
          <p>Конец анимации*кадры*</p>
          <input
            className={`${style.text} ${style.inputAdmin}`}
            type="text"
            value={endFrame}
            onChange={(e) => {
              setEndFrame(Number(e.target.value));
            }}
            placeholder="Конец анимации"
          />
        </div>
      </div>
      {blocks.map((block, index) => (
        <ListFilter
          index={index}
          key={block.id}
          block={block}
          listBoxItems={listBoxItems}
          handleListBoxChange={handleListBoxChange}
          removeBlock={removeBlock}
          t={t}
        />
      ))}
      <div className={style.btnBox}>
        <Button className={style.adminRedactorButton} onClick={addBlock}>
          Добавить фильтр
        </Button>
        <Button
          isLoading={mutateCreateImg.isPending}
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

export default NewGifAdmin;
