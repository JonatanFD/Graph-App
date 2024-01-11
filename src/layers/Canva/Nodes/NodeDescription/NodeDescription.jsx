import styles from "./nodedescription.module.css";

import { motion } from "framer-motion";
import { EXPAND_TRANSITION_VARIANT } from "../../../../utils/transitions";
import { useInterfaceContext } from "../../../../context/InterfaceContext";
import { useAppContext } from "../../../../context/AppContext";

export default function NodeDescription({ node }) {
    const { deleteNode, connectNode, connecting } = useAppContext();
    const { changeInterface } = useInterfaceContext();

    const onClickDropDown = (e) => {
        e.stopPropagation();
    };
    const connectWith = () => {
        changeInterface({ type: "clear" });
        changeInterface({
            type: "reverse",
            value: { name: "connectingNodes" },
        });
        if (connecting.active) {
            changeInterface({
                type: "hide",
                value: { name: "connectingNodes" },
            })
        }

        connectNode(node.id);
    };

    return (
        <motion.section
            variants={EXPAND_TRANSITION_VARIANT}
            initial={"exit"}
            animate={"enter"}
            exit={"exit"}
            style={{ originY: 0 }}
            onClick={onClickDropDown}
            className={styles.description}
        >
            <div className={styles.header}>
                <h3>{node.name}</h3>
            </div>
            <div className={styles.buttons}>
                <img
                    src="/toolbar/connecting-edge.svg"
                    height={20}
                    width={20}
                    alt="delete"
                    className={styles.connect}
                    onClick={connectWith}
                />
                <img
                    src="/icons/delete.svg"
                    height={20}
                    width={20}
                    alt="delete"
                    className={styles.delete}
                    onClick={() => deleteNode(node.id)}
                />
            </div>
        </motion.section>
    );
}
