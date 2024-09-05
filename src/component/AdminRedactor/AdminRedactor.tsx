import style from "./AdminRedactor.module.scss";
import React, { useEffect, useState, useRef } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import ListBox from "../../ui/ListBox/ListBox";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { getPictureId, unifiedPicture } from "../../api/adminImg";
import { Button } from "../../ui/Button";

interface Image {
  picture_id?: number;
  full_picture_id?: number;
  url: string;
  top: string;
  bottom: number;
  left: number;
  right: number;
  language: string;
  name?: string;
  color_text?: string;
  country?: string;
  format?: string;
  topic?: string;
  value?: string;
}

interface TestProps {
  images: Image[];
}

export const AdminRedactor: React.FC<TestProps> = ({ images }) => {
  const { t } = useTranslation();
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);
  const [selectedBannerFormats, setSelectedBannerFormats] = useState<string[]>(
    []
  );
  const [selectedBannerThemes, setSelectedBannerThemes] = useState<string[]>(
    []
  );

  const [textPositions, setTextPositions] = useState<
    { x: number; y: number }[]
  >([]);
  const [texts, setTexts] = useState<string[]>([]);
  const [textSizes, setTextSizes] = useState<number[]>([]);
  const [textColors, setTextColors] = useState<string[]>([]);
  const draggableRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);

  useEffect(() => {
    if (images) {
      setTextPositions(
        images.map((image) => ({ x: image.left || 0, y: image.left || 0 }))
      );
      setTexts(images.map((image) => image.name || "Your Text"));
      setTextSizes(images.map(() => 30)); // Default text size
      setTextColors(images.map((image) => image.color_text || "#ffffff")); // Default text color
      setSelectedCountries(
        images.map((image) => image.country || t("Country"))
      );
      setSelectedLanguages(
        images.map((image) => image.language || t("Language"))
      );
      setSelectedCurrencies(
        images.map((image) => image.value || t("Currency"))
      );
      setSelectedBannerFormats(
        images.map((image) => image.format || t("Banner format"))
      );
      setSelectedBannerThemes(
        images.map((image) => image.topic || t("Banner theme"))
      );
      draggableRefs.current = images.map(() =>
        React.createRef<HTMLDivElement>()
      );
    }
  }, [images]);

  const mutateCreateImg = useMutation(
    {
      mutationFn: (data: {
        picture_id?: number;
        full_picture_id?: number;
        country: string;
        language: string;
        value: string;
        format: string;
        topic: string;
        color: string;
        left: string;
        right: string;
        top: string;
        bottom: string;
      }) =>
        unifiedPicture(
          data.picture_id,
          data.full_picture_id,
          data.country,
          data.language,
          data.value,
          data.format,
          data.topic,
          data.color,
          data.left,
          data.right,
          data.top,
          data.bottom
        ),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["img"] });
      },
    },
    queryClient
  );

  const mutateGetPicture = useMutation(
    {
      mutationFn: (data: { full_picture_id: number }) =>
        getPictureId(data.full_picture_id),
    },
    queryClient
  );

  const handleGetPicture = (id) => {
    mutateGetPicture.mutate({
      full_picture_id: id,
    });
  };

  const handleDrag = (
    index: number,
    e: DraggableEvent,
    data: DraggableData
  ) => {
    const newTextPositions = [...textPositions];
    newTextPositions[index] = { x: data.x, y: data.y };
    setTextPositions(newTextPositions);
    // console.log(`Text ${index} position:`, newTextPositions[index]);
  };

  const handleTextChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTexts = [...texts];
    newTexts[index] = event.target.value;
    setTexts(newTexts);
  };

  const handleSizeChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSizes = [...textSizes];
    newSizes[index] = parseInt(event.target.value, 10);
    setTextSizes(newSizes);
  };

  const handleColorChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newColors = [...textColors];
    newColors[index] = event.target.value;
    setTextColors(newColors);
  };

  const handleSubmit = (id: number) => {
    const position = textPositions[id];
     const image = images[id];
  const pictureId = image.picture_id?.toString();
  const fullPictureId = image.full_picture_id?.toString();
    if (position) {
      const { x, y } = position;
      mutateCreateImg.mutate({
        picture_id: id,
        full_picture_id: id,
        country: selectedCountries[id],
        language: selectedLanguages[id],
        value: selectedCurrencies[id],
        format: selectedBannerFormats[id],
        topic: selectedBannerThemes[id],
        color: textColors[id],
        left: x.toString(),
        right: (x + 100).toString(),
        top: y.toString(),
        bottom: (y + 50).toString(),
      });
    }
  };

  const handleChangeCountry = (index: number, value: string) => {
    const newCountries = [...selectedCountries];
    newCountries[index] = value;
    setSelectedCountries(newCountries);
  };

  const handleChangeLanguage = (index: number, value: string) => {
    const newLanguages = [...selectedLanguages];
    newLanguages[index] = value;
    setSelectedLanguages(newLanguages);
  };

  const handleChangeCurrency = (index: number, value: string) => {
    const newCurrencies = [...selectedCurrencies];
    newCurrencies[index] = value;
    setSelectedCurrencies(newCurrencies);
  };

  const handleChangeBannerFormat = (index: number, value: string) => {
    const newBannerFormats = [...selectedBannerFormats];
    newBannerFormats[index] = value;
    setSelectedBannerFormats(newBannerFormats);
  };

  const handleChangeBannerTheme = (index: number, value: string) => {
    const newBannerThemes = [...selectedBannerThemes];
    newBannerThemes[index] = value;
    setSelectedBannerThemes(newBannerThemes);
  };

  return (
    <div className={style.mainBox}>
      {images &&
        images.map((image, index) => (
          <div
            key={image.picture_id ? image.picture_id : image.full_picture_id}
            className={style.redactorBox}
          >
            <div className={style.draggableImgBox}>
              <Draggable
                position={
                  textPositions[image.picture_id ? image.picture_id : image.full_picture_id]
                }
                onDrag={(e, data) =>
                  handleDrag(image.picture_id ? image.picture_id : image.full_picture_id, e, data)
                }
                bounds="parent"
                //   nodeRef={draggableRefs.current[index].current}
              >
                <div
                  ref={
                    draggableRefs.current[
                      image.picture_id ? image.picture_id : image.full_picture_id
                    ]
                  }
                  className={style.draggableBox}
                  style={{
                    fontSize: `${
                      textSizes[image.picture_id ? image.picture_id : image.full_picture_id]
                    }px`,
                    color:
                      textColors[image.picture_id ? image.picture_id : image.full_picture_id],
                  }}
                >
                  {texts[image.picture_id ? image.picture_id : image.full_picture_id]}
                </div>
              </Draggable>
              <img
                className={style.redactorImg}
                src={image.url}
                alt={`img-${image.picture_id ? image.picture_id : image.full_picture_id}`}
              />
            </div>
            <input
              className={style.redactorIn}
              type="text"
              placeholder="Label"
              value={texts[image.picture_id ? image.picture_id : image.full_picture_id] || ""}
              onChange={(event) =>
                handleTextChange(
                  image.picture_id ? image.picture_id : image.full_picture_id,
                  event
                )
              }
            />
            <input
              className={style.redactorIn}
              type="number"
              value={textSizes[image.picture_id ? image.picture_id : image.full_picture_id]}
              onChange={(event) =>
                handleSizeChange(
                  image.picture_id ? image.picture_id : image.full_picture_id,
                  event
                )
              }
              placeholder="Text Size"
            />
            <input
              className={style.redactorIn}
              type="color"
              value={textColors[image.picture_id ? image.picture_id : image.full_picture_id]}
              onChange={(event) =>
                handleColorChange(
                  image.picture_id ? image.picture_id : image.full_picture_id,
                  event
                )
              }
              placeholder="Text Color"
            />
            <ul className={`${style.topbar}`}>
              <li className={style.defaultSelect}>
                <ListBox
                  defaultValue={t("Country")}
                  onChange={(value) =>
                    handleChangeCountry(
                      image.picture_id ? image.picture_id : image.full_picture_id,
                      value
                    )
                  }
                  value={
                    selectedCountries[image.picture_id ? image.picture_id : image.full_picture_id]
                  }
                  items={[
                    { value: "en", content: "en", id: "1" },
                    { value: "ru", content: "ru", id: "2" },
                    { value: "fr", content: "fr", id: "3" },
                  ]}
                />
              </li>

              <li className={style.defaultSelect}>
                <ListBox
                  defaultValue={t("Language")}
                  onChange={(value) =>
                    handleChangeLanguage(
                      image.picture_id ? image.picture_id : image.full_picture_id,
                      value
                    )
                  }
                  value={
                    selectedLanguages[image.picture_id ? image.picture_id : image.full_picture_id]
                  }
                  items={[
                    { value: "en", content: "English", id: "1" },
                    { value: "ru", content: "Русский", id: "2" },
                    { value: "fr", content: "Française", id: "3" },
                  ]}
                />
              </li>

              <li className={style.defaultSelect}>
                <ListBox
                  defaultValue={t("Currency")}
                  value={
                    selectedCurrencies[
                      image.picture_id ? image.picture_id : image.full_picture_id
                    ]
                  }
                  onChange={(value) =>
                    handleChangeCurrency(
                      image.picture_id ? image.picture_id : image.full_picture_id,
                      value
                    )
                  }
                  items={[{ value: "en", content: "English", id: "1" }]}
                />
              </li>

              <li className={style.defaultSelect}>
                <ListBox
                  defaultValue={t("Banner format")}
                  value={
                    selectedBannerFormats[
                      image.picture_id ? image.picture_id : image.full_picture_id
                    ]
                  }
                  onChange={(value) =>
                    handleChangeBannerFormat(
                      image.picture_id ? image.picture_id : image.full_picture_id,
                      value
                    )
                  }
                  items={[
                    { value: "300*300", content: "300*300", id: "1" },
                    { value: "600*600", content: "600*600", id: "2" },
                    { value: "900*900", content: "900*900", id: "3" },
                  ]}
                />
              </li>

              <li
                className={`${style.defaultSelect} ${style.lastDefaultSelect}`}
              >
                <ListBox
                  defaultValue={t("Banner theme")}
                  value={
                    selectedBannerThemes[
                      image.picture_id ? image.picture_id : image.full_picture_id
                    ]
                  }
                  onChange={(value) =>
                    handleChangeBannerTheme(
                      image.picture_id ? image.picture_id : image.full_picture_id,
                      value
                    )
                  }
                  items={[{ value: "footbal", content: "footbal", id: "1" }]}
                />
              </li>
            </ul>
            <Button
              className={style.adminRedactorButton}
              onClick={() =>
                handleSubmit(image.picture_id ? image.picture_id : image.full_picture_id)
              }
            >
              Отправить
            </Button>
            {image.full_picture_id && (
              <Button onClick={() => handleGetPicture(image.full_picture_id)}>
                Опубликовать
              </Button>
            )}
          </div>
        ))}
    </div>
  );
};

export default AdminRedactor;
