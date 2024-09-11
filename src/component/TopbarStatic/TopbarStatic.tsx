import style from "./TopbarStatic.module.scss";
import { useTranslation } from "react-i18next";
import { Button } from "../../ui/Button";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { useDispatch, useSelector } from "react-redux";
import { gifActions } from "../../providers/StoreProvider";
import { getTokenUser } from "../../providers/StoreProvider/selectors/getTokenUser";
import { useState } from "react";
import { staticGif } from "../../api/clientGif";
import toast from "react-hot-toast";
import ListFilter from "../../utils/ListFilter";
import { listBoxFil } from "../Topbar/dataFilter";

export const TopbarStatic = () => {
  const initialSelectedValues = {
    country: "",
    language: "",
    currency: "",
    banner_format: "",
    banner_theme: "",
  };
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const token = useSelector(getTokenUser);

  const [blocks, setBlocks] = useState([
    { id: 1, selectedValues: initialSelectedValues },
  ]);
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

  const mutateStaticGif = useMutation(
    {
      mutationFn: (data: {
        token: string;
        country: string;
        language: string;
        value: string;
        format: string;
        topic: string;
      }) =>
        staticGif(
          data.token,
          data.country,
          data.language,
          data.value,
          data.format,
          data.topic
        ),
      onSuccess: (data) => {
        dispatch(gifActions.gifAdd(data));
      },
      onError: () => {
        toast.error("По текущим фильтрам изображений нет");
      },
    },
    queryClient
  );

  const handleSubmit = () => {
    blocks.forEach((block) => {
      mutateStaticGif.mutate({
        token,
        country:
          block.selectedValues.country === t("Country")
            ? ""
            : block.selectedValues.country,
        language:
          block.selectedValues.language === t("Language")
            ? ""
            : block.selectedValues.language,
        value:
          block.selectedValues.currency === t("Currency")
            ? ""
            : block.selectedValues.currency,
        format:
          block.selectedValues.banner_format === t("Banner_format")
            ? ""
            : block.selectedValues.banner_format,
        topic:
          block.selectedValues.banner_theme === t("Banner_theme")
            ? ""
            : block.selectedValues.banner_theme,
      });
    });
  };

  return (
    <div className={`${style.topbarStatic}`}>
      <div>
        {blocks.map((block, index) => (
          <ListFilter
            index={index}
            key={block.id}
            block={block}
            listBoxItems={listBoxFil}
            handleListBoxChange={handleListChange}
            removeBlock={() => {}}
            t={t}
          />
        ))}
      </div>
      <div>
        <Button
          isLoading={mutateStaticGif.isPending}
          onClick={handleSubmit}
          className={style.topBtn}
        >
          {t("Generare Now")}
        </Button>
      </div>
    </div>
  );
};
