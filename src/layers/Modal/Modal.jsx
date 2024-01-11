import styles from "./modal.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { useModalContext } from "../../context/ModalContext";
import { fadeInAndOutVariant } from "../../utils/transitions";



export function Modal() {
    const { content, closeModal } = useModalContext();

    return (
        <AnimatePresence>
            {content && (
                <motion.section
                    className={styles.modal}
                    variants={fadeInAndOutVariant}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    {content}
                </motion.section>
            )}
        </AnimatePresence>
    );
}
