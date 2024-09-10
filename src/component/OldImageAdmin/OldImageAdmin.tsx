import { useNavigate, useParams } from "react-router-dom";
import { getAdminImg } from "../../providers/StoreProvider/selectors/getAdminImg";
import { useSelector } from "react-redux";
import { Button } from "../../ui/Button";
import style from "./OldImageAdmin.module.scss";
import Draggable from "react-draggable";
import { useEffect, useRef, useState } from "react";

import { listBoxItems } from "../NewImageAdmin/dataImg";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import toast from "react-hot-toast";
import {
  deletePicture,
  getPictureId,
  unifiedPicture,
} from "../../api/adminImg";
import { staticGifDemo } from "../../api/staticGif";
import { getTokenUser } from "../../providers/StoreProvider/selectors/getTokenUser";
import ListFilter from "../../utils/ListFilter";
import { adImage } from "../../types/adminImgType";

const OldImageAdmin = () => {
  const initialSelectedValues = {
    country: "",
    language: "",
    currency: "",
    banner_format: "",
    banner_theme: "",
  };
  const arrImg = useSelector(getAdminImg);
  const navigate = useNavigate();
  const { full_picture_id } = useParams();
  const { t } = useTranslation();
//   const [card, setCard] = useState<adImage>();
  const card = arrImg.find((item) => item.full_picture_id === Number(full_picture_id))
  const token = useSelector(getTokenUser);
  const [demoPrev, setDemoPrev] = useState<string>();
  const draggableRefs = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [text, setText] = useState("Мой текст");
  const [fontSize, setFontSize] = useState("16");
  const [color, setColor] = useState("#000000");
  const [blocks, setBlocks] = useState([
    { id: 1, selectedValues: initialSelectedValues },
  ]);

  useEffect(() => {
    if (card) {
      setFontSize(card.size);
      setColor(card.color_text);
      setPosition({ x: card.left, y: card.top });
      setBlocks([
        {
          id: 1,
          selectedValues: {
            country: card.country || "",
            language: card.language || "",
            currency: card.value || "",
            banner_format: card.format || "",
            banner_theme: card.topic || "",
          },
        },
      ]);
    }
  }, [card]);

  const mutateCreateImg = useMutation(
    {
      mutationFn: (data: { pictures }) => unifiedPicture(data.pictures),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["img"] });
      },
      onError: (err) => {
        toast.error(err.message);
      },
    },
    queryClient
  );

  const mutatePreve = useMutation(
    {
      mutationFn: (data: { token: string; full_picture_id: number }) =>
        staticGifDemo(data.token, data.full_picture_id),
      onSuccess: (data) => {
        setDemoPrev(data);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    },
    queryClient
  );

  const mutateGetPicture = useMutation(
    {
      mutationFn: (data: { full_picture_id: number }) =>
        getPictureId(data.full_picture_id),
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["img"] });
        toast.success(data.data);
      },
    },
    queryClient
  );

  const handleGetPicture = (picture_id: number) => {
    mutateGetPicture.mutate({
      full_picture_id: picture_id,
    });
  };

  const mutateDeletePicture = useMutation(
    {
      mutationFn: (data: { token: string; full_picture_id: number }) =>
        deletePicture(data.token, data.full_picture_id),
      onSuccess: (data) => {
        navigate("/admin-meneger");
        queryClient.invalidateQueries({ queryKey: ["img"] });
        toast.success(data.data);
      },
    },
    queryClient
  );

  const handleDeletePicture = (full_picture_id) => {
    mutateDeletePicture.mutate({ token, full_picture_id });
  };

  const handleDrag = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const addBlock = () => {
    setBlocks([
      ...blocks,
      { id: blocks.length + 1, selectedValues: initialSelectedValues },
    ]);
  };

  const handleListChange = (blockId, listBoxId, value) => {
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

  const saveData = () => {
    const draggableRef = draggableRefs.current;
    if (draggableRef) {
      const textWidth = draggableRef.offsetWidth;
      const textHeight = draggableRef.offsetHeight;
      const data = blocks.map((block) => ({
        full_picture_id: card.full_picture_id,
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
      mutateCreateImg.mutate({ pictures: data });
    }
  };

  const handleDemo = (full_picture_id) => {
    mutatePreve.mutate({ token, full_picture_id });
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
        {card.url && <img className={style.redactorImg} src={card.url} alt={`img`} />}
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
          onChange={(e) => setFontSize(e.target.value)}
          placeholder="Размер шрифта"
        />
        <input
          className={style.color}
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      {blocks.map((block, index) => (
        <ListFilter
          index={index}
          key={block.id}
          block={block}
          listBoxItems={listBoxItems}
          handleListBoxChange={handleListChange}
          removeBlock={removeBlock}
          t={t}
        />
      ))}
      {/* <Button onClick={addBlock}>Добавить блок</Button> */}
      <div className={style.btnBox}>
        <Button
          isLoading={mutateCreateImg.isPending}
          // isDisabled={btnDisable}
          className={style.adminRedactorButton}
          onClick={saveData}
        >
          Изменить
        </Button>
        <Button
          isLoading={mutateGetPicture.isPending}
          className={style.adminRedactorButton}
          onClick={() => handleGetPicture(card.full_picture_id)}
        >
          Опубликовать
        </Button>
        <Button
          isLoading={mutatePreve.isPending}
          className={style.adminRedactorButton}
          onClick={() => handleDemo(card.full_picture_id)}
        >
          Demo
        </Button>
        <Button
          isLoading={mutateDeletePicture.isPending}
          className={style.btnDelete}
          onClick={() => handleDeletePicture(card.full_picture_id)}
        >
          Удалить
        </Button>
      </div>
      <img src={demoPrev} alt="" />
    </div>
  );
};

export default OldImageAdmin;
