import styles from "./app.module.css";
import Canva from "./layers/Canva/Canva";
import UI from "./layers/UI/UI";

function App() {
    return (
        <div className={styles.app}>
            <div className={styles.appoverlay}>
                <UI />
                <Canva />
            </div>
        </div>
    );
}

export default App;
