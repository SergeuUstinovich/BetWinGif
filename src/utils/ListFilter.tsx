import { Button } from '../ui/Button'
import ListBox from '../ui/ListBox/ListBox'
import style from '../AdminComponent/NewImageAdmin/NewImageAdmin.module.scss'

const ListFilter = ({
  block,
  listBoxItems,
  handleListBoxChange,
  removeBlock,
  t,
  index,
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
