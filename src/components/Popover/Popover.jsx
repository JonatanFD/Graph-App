import { AnimatePresence, motion } from "framer-motion";
import styles from "./popover.module.css";
import { ANIMATION_ORIENTATION, EXPAND_TRANSITION_VARIANT } from "../../utils/transitions";

export default function Popover({
    children,
    content = "",
    trigger,
    orientation = "right",
}) {
    return (
        <AnimatePresence>
            {trigger && (
                <motion.div
                    className={styles.popover}
                    variants={EXPAND_TRANSITION_VARIANT}
                    initial="exit"
                    animate="enter"
                    exit="exit"
                    style={ANIMATION_ORIENTATION[orientation]}
                    orientation={orientation}
                >
                    {content ? <p>{content}</p> : children}

                    <span className={styles.triangulo}></span>

                </motion.div>
            )}
        </AnimatePresence>
    );
}
