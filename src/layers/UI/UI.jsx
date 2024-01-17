import styles from "./ui.module.css";
import UserToolBar from "./UserToolBar/UserToolBar";
import Header from "../../components/Header/Header";
import { useModalContext } from "../../context/ModalContext";
import Creation from "../Modal/Creation/Creation";

export default function UI() {
    const { setContent } = useModalContext();

    const onCreationOpen = () => {
        setContent(<Creation />);
    };

    return (
        <div className={styles.uioverlay}>
            <main className={styles.ui}>
                <div className={styles.overlay}>
                    <Header />
                    <UserToolBar />

                    <button
                        className={styles.createButton}
                        onClick={onCreationOpen}
                    >
                        Create New Graph
                        <img
                            src="/toolbar/graph-icon.svg"
                            alt="graph"
                            as="icon"
                        />
                    </button>
                </div>
            </main>
        </div>
    );
}
