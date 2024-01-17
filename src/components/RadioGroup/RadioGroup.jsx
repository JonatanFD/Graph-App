import { createContext, useContext, useState } from "react";
import styles from "./radiogroup.module.css"

const RadioContext = createContext();
export const useRadioContext = () => useContext(RadioContext);

export default function RadioGroup({ children, value, onValueChange }) {
    return (
        <RadioContext.Provider value={{ onValueChange, groupValue: value }}>
            <div className={styles.radiogroup}>{children}</div>
        </RadioContext.Provider>
    );
}
