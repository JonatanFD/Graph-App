import styles from "./ui.module.css";
import UserToolBar from "./UserToolBar/UserToolBar";
import Header from "../../components/Header/Header";

export default function UI() {
    return (
        <main layer="true" className={styles.ui}>
            <Header />
            <UserToolBar />

            <button className={styles.createButton}>
                Create New Graph
                <img src="/toolbar/graph-icon.svg" alt="graph" as="icon" />
            </button>
            <div className={styles.helpButton}>
                <div className={styles.help}>
                    <img src="/toolbar/help-icon.svg" alt="help" as="icon" />
                </div>
            </div>
        </main>
    );
}
