import Image from "next/image";
import styles from "./welcome.module.css";

export default function Welcome() {
    return (
        <article className={styles.welcome}>
            <div className={styles.logo}>
                <Image
                    src="/favicon.svg"
                    width={80}
                    height={80}
                    alt="app icon"
                />
                <h2 className={styles.appname}>Graph App</h2>
            </div>
            <div className={styles.introduction}>
                <p>
                    Graph App has been designed to improve the learning process
                    about graphs and their minimun paths trees.
                </p>
                <p>
                    The Graph app helps students understand how Kruskal and
                    Prim's algorithms work. Additionally, students can easily create their own graphs.
                </p>
                <p>
                    In that sense, this website is for academic purposes only.
                    So let's start with a brief summary.
                </p>
            </div>
        </article>
    );
}
