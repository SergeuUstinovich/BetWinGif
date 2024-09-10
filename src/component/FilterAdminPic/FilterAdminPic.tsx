import { useState } from "react";
import ListFilter from "../../utils/ListFilter";
import { listBoxItems } from "../NewImageAdmin/dataImg";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { filterPicture } from "../../api/adminImg";
import { queryClient } from "../../api/queryClient";

function FilterAdminPic() {
  const initialSelectedValues = {
    country: "",
    language: "",
    currency: "",
    banner_format: "",
    banner_theme: "",
  };
  const { t } = useTranslation();
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

  const mutateFilter = useMutation({
    mutationFn: (data: {
      token: string;
      country: string;
      language: string;
      value: string;
      format: string;
      topic: string;
    }) =>
      filterPicture(
        data.token,
        data.country,
        data.language,
        data.value,
        data.format,
        data.topic
      ),
  }, queryClient);

  const removeBlock = (blockId) =>
    setBlocks(blocks.filter((block) => block.id !== blockId));
  return (
    <div>
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
    </div>
  );
}

export default FilterAdminPic;
