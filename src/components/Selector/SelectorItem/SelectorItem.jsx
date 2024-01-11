import { useSelectorContext } from "../Selector";
import styles from "./selectoritem.module.css";

export default function SelectorItem({ value = "", ...props }) {
    const { className, onClick, ...otherItemProps } = props;
    const { key, select } = useSelectorContext();

    const onItemClick = (e) => {
        if (onClick) {
            onClick(e);
        }
        console.log("Selecting", value);
        select(value);
    };
    return (
        <div
            selected={key === value}
            onClick={onItemClick}
            {...otherItemProps}
            className={`${styles.selectedItem} ${className}`}
        >
            <p>{value}</p>
        </div>
    );
}
