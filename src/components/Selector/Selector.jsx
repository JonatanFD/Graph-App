import { AnimatePresence, motion } from "framer-motion";
import styles from "./selector.module.css";
import {
    ANIMATION_ORIENTATION,
    EXPAND_TRANSITION_VARIANT,
} from "../../utils/transitions";
import { createContext, useContext, useEffect, useState } from "react";

const SelectorContext = createContext();
export const useSelectorContext = () => useContext(SelectorContext);

const LabelComponent = ({
    className,
    onLabelClick,
    otherLabelProps,
    content,
    formProps,
}) => (
    <div
        className={`${styles.header} ${className}`}
        onClick={onLabelClick}
        {...otherLabelProps}
        {...formProps}
    >
        <input
            type="text"
            readOnly
            value={content}
            className={styles.defaultInput}
        />
    </div>
);

export default function Selector({
    label = {},
    orientation = "bottom",
    children,
    then=() => {},
    value,
    formProps = {}
}) {
    const [open, setOpen] = useState(false);
    const [key, setKey] = useState(value);

    const { content = "", onClick, className = "", ...otherLabelProps } = label;

    const renderLabelComponent = typeof content === "string";
    const onLabelClick = (e) => {
        if (onClick) {
            onClick(e);
        }
        setOpen(!open);
    };

    const select = (value) => {
        setKey(value)
        setOpen(false)
        then(value)
    }
    return (
        <SelectorContext.Provider value={{key, select}}>
            <div className={styles.wrapper}>
                {renderLabelComponent ? (
                    <LabelComponent
                        className={className}
                        onLabelClick={onLabelClick}
                        otherLabelProps={otherLabelProps}
                        content={key}
                        register={formProps}
                    />
                ) : (
                    content
                )}
                <AnimatePresence>
                    {children && open ? (
                        <motion.div
                            className={styles.selector}
                            variants={EXPAND_TRANSITION_VARIANT}
                            initial="exit"
                            animate="enter"
                            exit="exit"
                            style={ANIMATION_ORIENTATION[orientation]}
                            orientation={orientation}
                        >
                            {children}
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>
        </SelectorContext.Provider>
    );
}
