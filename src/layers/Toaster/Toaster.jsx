import styles from "./toaster.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useToasterContext } from "../../context/ToasterContext";

const getToastImage = (status) => {
    switch (status) {
        case "ok":
            return "/toaster/confirm-icon.svg";
        case "error":
            return "/icons/error.svg";
        default:
            break;
    }
};

export default function Toaster() {
    const { Toast, toastConfig } = useToasterContext();

    const {
        status,
        trigger,
        content = undefined,
        ...otherToastProps
    } = toastConfig;


    if (Toast) {
        return (
            <AnimatePresence>
                {toastConfig.activate && (
                    <motion.div
                        className={styles.toast}
                        status={toastConfig.status}
                        initial={{ opacity: 0, top: "0px" }}
                        animate={{ opacity: 1, top: "10px" }}
                        exit={{ opacity: 0, top: "0px" }}
                        {...otherToastProps}
                    >
                        {Toast}
                    </motion.div>
                )}
            </AnimatePresence>
        );
    } else if (content) {
        const { title = undefined, description = undefined } = content;
        return (
            <AnimatePresence>
                {toastConfig.trigger && (
                    <motion.div
                        className={styles.personalized}
                        status={toastConfig.status}
                        initial={{ opacity: 0, top: "0px" }}
                        animate={{ opacity: 1, top: "16px" }}
                        exit={{ opacity: 0, top: "0px" }}
                        {...otherToastProps}
                    >
                        <div>
                            <img src={getToastImage(status)} alt={status} />
                        </div>
                        <div>
                            <h3 className={styles.customTitle}>{title}</h3>
                            <p className={styles.customDescription}>
                                {description}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        );
    }
}
