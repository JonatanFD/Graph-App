import styles from "./app.module.css";
import Canva from "./layers/Canva/Canva";
import UI from "./layers/UI/UI";

function App() {
    return (
        <div className={styles.app}>
            <UI />
            <Canva />
        </div>
    );
}

export default App;
