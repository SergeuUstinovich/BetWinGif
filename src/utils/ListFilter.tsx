import { Button } from '../ui/Button'
import ListBox from '../ui/ListBox/ListBox'
import style from '../AdminComponent/NewImageAdmin/NewImageAdmin.module.scss'
import { SelectItems } from '../AdminComponent/NewImageAdmin/dataImg';

interface Block {
  id: number;
  selectedValues: { [key: string]: any };
}

interface ListFilterProps {
  block: Block;
  listBoxItems: SelectItems;
  handleListBoxChange: (blockId: number, listBoxId: string, value: any) => void;
  removeBlock: (id: number) => void;
  t: (key: string) => string;
  index: number;
  className?: string;
  classNameBox?: string;
}

const ListFilter = ({
  block,
  listBoxItems,
  handleListBoxChange,
  removeBlock,
  t,
  index,
  className,
  classNameBox,
}:ListFilterProps) => (
  <div className={`${style.listBoxFilter} ${className}`}>
    {Object.keys(listBoxItems).map((listBoxId) => (
      <ListBox
        key={listBoxId}
        defaultValue={t(listBoxId.charAt(0).toUpperCase() + listBoxId.slice(1))}
        value={block.selectedValues[listBoxId] || null}
        onChange={(value) => handleListBoxChange(block.id, listBoxId, value)}
        items={listBoxItems[listBoxId]}
        className={classNameBox}
      />
    ))}
    {index !== 0 && (
      <Button
        className={style.removeButtonFilter}
        onClick={() => removeBlock(block.id)}
      >
        Удалить
      </Button>
    )}
  </div>
)

export default ListFilter
