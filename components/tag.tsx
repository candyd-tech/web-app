import styles from '@/styles/imageView.module.scss'
import React, { useState } from 'react';

const Tag = ({tag}: {tag: string}) => {
  return (
    <div className={`${styles.tag} text-xs`}>
      <p>{`${tag}`}</p>
    </div>
  )
}

export interface DropdownOptionInterface {
  id: string
  name: string
}

export const Dropdown = (
  {pick, options, setValue}: {
    pick: React.ReactNode,
    options: DropdownOptionInterface[],
    value: string
    setValue: (param: string) => void
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => {
    setDropdownOpen(!dropdownOpen);
  }

  return (
    <div onClick={toggle} className={`z-100 pb-2 text-sm`}>
      {pick}
      {dropdownOpen &&
      <div className="absolute bg-white border-r border-b border-black border-solid
        px-2 py-3 flex flex-col items-start gap-3
      ">
        {
          options.map(option => {
            return <div key={option.id}>
              <button onClick={() => setValue(option.id)}>{option.name}</button>
            </div>
          })
        }
      </div>}
    </div>
  )
}

export default Tag;
