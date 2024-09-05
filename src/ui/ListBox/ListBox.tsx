import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'
import { Fragment, ReactNode, useState } from 'react'
import style from './ListBox.module.scss'
import { classNames } from '../../utils/classNames'
import { SelectArrowSvg } from '../../assets/svg/SelectArrowSvg'

interface ListBoxItem {
  id: string
  value: string
  content: ReactNode
  disabled?: boolean
}

interface ListBoxProps {
  items?: ListBoxItem[]
  className?: string
  value?: string
  defaultValue?: string
  hiddenArrow?: boolean
  onChange?: (value) => void
}

function ListBox(props: ListBoxProps) {
  const { className, items, value, defaultValue, onChange } = props

  return (
    <Listbox
      as={'div'}
      className={classNames(style.listbox, {}, [className])}
      value={value}
      onChange={onChange}
    >
      <ListboxButton className={style.trigger}>
        {value ?? defaultValue}
        <SelectArrowSvg />
      </ListboxButton>
      <ListboxOptions className={style.options} anchor="bottom">
        {items?.map((item) => (
          <ListboxOption
            key={item.id}
            disabled={item.disabled}
            value={item.value}
            as={Fragment}
          >
            {({ focus, selected }) => (
              <li
                className={classNames(style.item, {
                  [style.active]: focus,
                  [style.disabled]: item.disabled,
                  [style.select]: selected,
                })}
              >
                {/*пример как можно на выбранный элемент повесить флажок */}
                {item.content}
              </li>
            )}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  )
}

export default ListBox
