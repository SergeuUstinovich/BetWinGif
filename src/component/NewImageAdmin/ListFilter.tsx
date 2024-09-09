import { Button } from "../../ui/Button";
import ListBox from "../../ui/ListBox/ListBox";
import style from "./NewImageAdmin.module.scss";

const ListFilter = ({
  block,
  listBoxItems,
  handleListBoxChange,
  removeBlock,
  t,
}) => (
  <div className={style.listBoxFilter}>
    {Object.keys(listBoxItems).map((listBoxId) => (
      <ListBox
        key={listBoxId}
        defaultValue={t(listBoxId.charAt(0).toUpperCase() + listBoxId.slice(1))}
        value={block.selectedValues[listBoxId] || null}
        onChange={(value) => handleListBoxChange(block.id, listBoxId, value)}
        items={listBoxItems[listBoxId]}
      />
    ))}
    <Button onClick={() => removeBlock(block.id)}>Удалить</Button>
  </div>
);

export default ListFilter
