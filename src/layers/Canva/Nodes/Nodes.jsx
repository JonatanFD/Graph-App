"use client";
import styles from "./nodes.module.css";
import { AnimatePresence, motion } from "framer-motion";
import NodeDescription from "./NodeDescription/NodeDescription";
import { useInterfaceContext } from "../../../context/InterfaceContext";
import { useAppContext } from "../../../context/AppContext";

export default function Nodes() {
    const {
        Nodes,
        onMouseDownNode,
        onMouseLeave,
        onMouseEnter,
        cursor,
        connectNode,
        configuration,
    } = useAppContext();

    const { Interface, changeInterface } = useInterfaceContext();

    const onDoubleClickHandler = (id) => {
        changeInterface({
            type: "display",
            value: { name: "nodeDescription", value: id },
        });
    };

    const onNodeClick = (id) => {
        if (Interface.connectingNodes) {
            connectNode(id);
        }
    };
    return (
        <section about="canva">
            {Nodes.map((node) => (
                <motion.div
                    key={node.id}
                    className={styles.node}
                    onMouseDown={onMouseDownNode}
                    onTouchStart={(e) => {
                        onMouseDownNode(e);
                        onMouseEnter(node.id);
                    }}
                    onMouseLeave={onMouseLeave}
                    onTouchEnd={onMouseLeave}
                    onMouseEnter={() => onMouseEnter(node.id)}
                    onDoubleClick={() => onDoubleClickHandler(node.id)}
                    style={{ left: node.left, top: node.top, zIndex: 999 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.1 }}
                    onClick={() => onNodeClick(node.id)}
                >
                    {configuration.showNodesName && <span>{node.name}</span>}
                    <AnimatePresence>
                        {Interface.nodeDescription === node.id && (
                            <NodeDescription node={node} />
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
            {Interface.creatingNode && (
                <motion.div
                    className={styles.node}
                    style={{
                        left: cursor.left - 25,
                        top: cursor.top - 25,
                        zIndex: 999,
                    }}
                    whileTap={{ scale: 1.2 }}
                    whileHover={{ scale: 1.1 }}
                ></motion.div>
            )}
        </section>
    );
}
