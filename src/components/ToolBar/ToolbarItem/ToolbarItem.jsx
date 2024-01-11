import { useState } from "react";
import styles from "./toolbaritem.module.css";
import Popover from "../../Popover/Popover";
import { useToolbarContext } from "../ToolBar";

export default function ToolbarItem(props) {
    const { settings = {}, children, ...otherProps } = props;

    const { popover, content, onClick, key, oneTime = false } = settings;

    const { selected, changeSelected, hoverItem } = useToolbarContext();
    const [hover, setHover] = useState(false);

    const isWrapped = typeof selected !== "undefined";

    const onItemClick = (e) => {
        if (isWrapped && !oneTime) {
            changeSelected(key);
        }
        if (onClick) {
            onClick(settings, e);
        }
    };

    let popoverTrigger, isSelected;
    if (isWrapped) {
        popoverTrigger = selected.hover === key;
        isSelected = selected.key === key
    } else {
        popoverTrigger = hover;
    }

    const onItemMouseEnter = () => {
        if (isWrapped) {
            hoverItem(key);
        } else {
            setHover(true);
        }
    };
    const onItemMouseLeave = () => {
        if (isWrapped) {
            hoverItem("");
        } else {
            setHover(false);
        }
    };
    return (
        <div
            className={styles.toolbaritem}
            onClick={onItemClick}
            onMouseEnter={onItemMouseEnter}
            onMouseLeave={onItemMouseLeave}
            aria-selected={isSelected}
            {...otherProps}
            key={key}
        >
            {content ? content : children}
            <Popover trigger={popoverTrigger} orientation="right">
                {popover}
            </Popover>
        </div>
    );
}
