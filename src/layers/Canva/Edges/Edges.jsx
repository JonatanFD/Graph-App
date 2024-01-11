import styles from "./edges.module.css";
import { AnimatePresence } from "framer-motion";
import EdgeDescription from "./EdgeDescription/EdgeDescription";
import { useInterfaceContext } from "../../../context/InterfaceContext";
import { paintEdge } from "../../../utils/transitions";
import { useAppContext } from "../../../context/AppContext";
import { getNode } from "../../../lib/tools";

const drawConnecting = (node) => {
    return {
        x1: node.left + 25,
        y1: node.top + 25,
    };
};

export default function Edges() {
    const {
        Edges,
        Prim,
        Kruskal,
        method,
        solution,
        Nodes,
        connecting,
        cursor,
    } = useAppContext();
    const { Interface, changeInterface } = useInterfaceContext();

    const methodToApply = method.toLowerCase();

    const openDescription = (id) => {
        changeInterface({
            type: "display",
            value: { name: "edgeDescription", value: id },
        });
    };


    const connectingNodesTrigger = Interface.connectingNodes && connecting.from;

    return (
        <>
            <svg className={styles.canva}>
                {Edges.map((edge) => (
                    <line
                        key={crypto.randomUUID()}
                        x1={edge.from.left + 25}
                        y1={edge.from.top + 25}
                        x2={edge.to.left + 25}
                        y2={edge.to.top + 25}
                        stroke={paintEdge(
                            solution,
                            methodToApply,
                            Prim,
                            Kruskal,
                            edge.id
                        )}
                        className={styles.line}
                    />
                ))}
                {connectingNodesTrigger && (
                    <line
                        className={styles.line}
                        stroke="green"
                        strokeWidth={2}
                        {...drawConnecting(getNode(connecting.from, Nodes))}
                        x2={cursor.left}
                        y2={cursor.top}
                    ></line>
                )}
            </svg>
            <section about="canva">
                {Edges.map((edge) => {
                    const { id, boxW, boxH, boxLeft, boxTop, weight } = edge;
                    return (
                        <span
                            key={id}
                            style={{
                                width: boxW,
                                height: boxH,
                                left: boxLeft,
                                top: boxTop,
                            }}
                            className={styles.weight}
                        >
                            <span
                                className={styles.data}
                                style={{
                                    backgroundColor: paintEdge(
                                        solution,
                                        methodToApply,
                                        Prim,
                                        Kruskal,
                                        id
                                    ),
                                    zIndex:
                                        Interface.edgeDescription === id
                                            ? "1000"
                                            : "49",
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    openDescription(id);
                                }}
                            >
                                <p>{weight}</p>
                                <AnimatePresence>
                                    {Interface.edgeDescription === id && (
                                        <EdgeDescription edge={edge} />
                                    )}
                                </AnimatePresence>
                            </span>
                        </span>
                    );
                })}
            </section>
        </>
    );
}
