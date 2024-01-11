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
    }
}




export default function Canva() {
    const {
        onMouseMoveHandler,
        onMouseDownHandler,
        onMouseUpHandler,
        createNode,
    } = useAppContext();

    const { setMessage, setToastConfig } = useToasterContext();
    const { Interface, changeInterface } = useInterfaceContext();

    // Here u can add some more interactions
    const onClickCanva = (e) => {
        if (Interface.creatingNode) {
            createNode(e);

            setToastConfig(createNodeToast)
        } else if (Interface.edgeDescription || Interface.nodeDescription) {
            changeInterface({ type: "clear" });
        }
    };
    return (
        <section
            className={styles.canva}
            onMouseMove={onMouseMoveHandler}
            onMouseUp={onMouseUpHandler}
            onMouseDown={onMouseDownHandler}
            onTouchMove={onMouseMoveHandler}
            onTouchStart={onMouseDownHandler}
            onTouchEnd={onMouseUpHandler}
            onClick={onClickCanva}
        >
            <Nodes />
            <Edges />
        </section>
    );
}
