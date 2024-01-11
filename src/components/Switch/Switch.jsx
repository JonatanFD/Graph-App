import {motion} from "framer-motion"
import styles from './switch.module.css'
import { useState } from "react"

export default function Switch({isSelected = false, onValueChange = () => {}, size = "sm"}) {
  const [selected, setSelected] = useState(isSelected)

  const onClickHandler = () => {
    onValueChange((prev) => !prev);
    setSelected(!selected);
  }

  return (
    <div 
      className={styles.Switch}
      is-active={selected.toString()}
      switch-size={size}
      onClick={onClickHandler}
    >
      <motion.span 
      className={styles.SwitchThumb}
        layout
      />
    </div>
  )
}

/*
  CAMBIAR DE MARGIN A JUSTIFY CONTENT END - START
 */