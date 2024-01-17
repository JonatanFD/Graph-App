import { useRadioContext } from "../RadioGroup";
import styles from "./radio.module.css";

export default function Radio({ label = "", children, value }) {
    const { onValueChange, groupValue } = useRadioContext();

    return (
        <div className={styles.radio}>
            <span
                aria-selected={groupValue === value}
                className={styles.checkAria}
                onClick={() => onValueChange(value)}
            >
                <span className={styles.dot}></span>
            </span>
            <label
                onClick={() => onValueChange(value)}
                className={styles.radioLabel}
            >
                {children || label}
            </label>
        </div>
    );
}
