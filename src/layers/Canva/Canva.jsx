import styles from "./canva.module.css";
import { useAppContext } from "../../context/AppContext";
import { useInterfaceContext } from "../../context/InterfaceContext";
import Nodes from "./Nodes/Nodes";
import Edges from "./Edges/Edges";
import { useToasterContext } from "../../context/ToasterContext";

const createNodeToast = {
    status: "ok",
    trigger: true,
    content: {
        title: "Successful",
        description: "Node has been created",
    },
};

export default function Canva() {
    const {
        onMouseMoveHandler,
        onMouseDownHandler,
        onMouseUpHandler,
        createNode,
    } = useAppContext();
    const { setToastConfig } = useToasterContext();
    const { Interface, changeInterface } = useInterfaceContext();
    const onClickCanva = (e) => {
        if (Interface.creatingNode) {
            createNode(e);
            setToastConfig(createNodeToast);
        } else if (Interface.edgeDescription || Interface.nodeDescription) {
            changeInterface({ type: "clear" });
        }
    };

    const onCanvaMouseDown = (e) => {
        e.stopPropagation()
        onMouseDownHandler(e);
    };
    const onCanvaMouseUp = (e) => {
        onMouseUpHandler(e);
    };
    const onCanvaMouseMove = (e) => {
        e.stopPropagation()
        onMouseMoveHandler(e);
    };

    return (
        <section
            className={styles.canva}
            onMouseMove={onCanvaMouseMove}
            onMouseUp={onCanvaMouseUp}
            onMouseDown={onCanvaMouseDown}
            onTouchMove={onCanvaMouseMove}
            onTouchStart={onCanvaMouseDown}
            onTouchEnd={onCanvaMouseUp}
            onClick={onClickCanva}
        >
            <Nodes />
            <Edges />
        </section>
    );
}
