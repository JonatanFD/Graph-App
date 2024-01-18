import styles from "./logo.module.css";

export default function Logo() {
    return (
        <div
            className={styles.logo}
            onClick={() => window.location.reload(true)}
        >
            <img className={styles.img} src="/graph-app.svg" alt="logo" />
            <h1 className={styles.title}>Graph App</h1>
        </div>
    );
}
