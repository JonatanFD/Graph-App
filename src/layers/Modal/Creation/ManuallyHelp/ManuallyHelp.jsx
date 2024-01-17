import { useModalContext } from "../../../../context/ModalContext";
import Creation from "../Creation";
import { motion } from "framer-motion";
import styles from "./manuallyhelp.module.css";
import { fadeInAndOutVariant } from "../../../../utils/transitions";

export default function ManuallyHelp() {
    const { closeModal, setContent } = useModalContext();

    return (
        <motion.div
            className={styles.manually}
            variants={fadeInAndOutVariant}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <img
                tag="icon"
                className={styles.close}
                src="/icons/close.svg"
                alt="close"
                onClick={closeModal}
            />

            <h2 className={styles.title}>How to create a graph manually</h2>
            <main className={styles.content}>
                <div className={styles.subtitle}>
                    <p>Follow the next steps to create a graph properly</p>
                    <p>You have to know:</p>
                </div>

                <ul className={styles.items}>
                    <li>Each line is a connection between nodes</li>
                    <li>The sintax that you must use is</li>

                    <div className={styles.codeContainer}>
                        <code className={styles.code}>name1 number name2</code>
                    </div>

                    <li>
                        name1 and name2 are the node's names, and the middle
                        number is edge's weight
                    </li>
                    <li>
                        Be carefull with your nodes naming because any
                        difference will create a new node
                    </li>
                    <li>If there is an edge with the same node's names, the last one will be created</li>
                </ul>

                <div className={styles.example}>
                    <p className={styles.exampleTitle}>For example:</p>
                    <div className={styles.codeContainer}>
                        <p>Your input:</p>
                        <code className={styles.code}>A 5 B</code>
                    </div>
                    <p className={styles.exampleTitle}>The result is</p>
                    <div className={styles.codeContainer}>
                        <img src="/createexample.svg" alt="example" />
                    </div>
                </div>
            </main>
            <footer className={styles.footer}>
                <button
                    className={styles.button}
                    onClick={() => setContent(<Creation defaultPage={1} />)}
                >
                    Go to create
                </button>
            </footer>
        </motion.div>
    );
}
