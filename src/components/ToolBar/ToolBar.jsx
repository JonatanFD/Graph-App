import { createContext, useContext, useState } from "react";
import styles from "./toolbar.module.css";
import ToolbarItem from "./ToolbarItem/ToolbarItem";

const ToolbarContext = createContext("");
export const useToolbarContext = () => useContext(ToolbarContext);

export default function ToolBar(props) {
    const {
        items, // si se proporciona por objetos
        children, // si se renderiza por fuera de la lista
        className,
        defaultSelected = "",
        ...otherProps
    } = props;
    const [selected, setSelected] = useState({
        key: defaultSelected,
        hover: "",
    });

    const changeSelected = (key) => {
        if (key !== selected.key) {
            setSelected({
                ...selected,
                key: key,
            }) ;
        }
    };
    const hoverItem = (key) => {
        setSelected({ ...selected, hover: key });
    };

    let content = undefined;
    if (items) {
        content = items.map((item) => (
            <ToolbarItem item={item} key={item.key} />
        ));
    }

    return (
        <ToolbarContext.Provider
            value={{ selected, changeSelected, hoverItem }}
        >
            <div
                className={`${styles.toolbar} ${className}`}
                {...otherProps}
            >
                {content ? content : children}
            </div>
        </ToolbarContext.Provider>
    );
}
