import { useState } from "react";
import { useModalContext } from "../../../context/ModalContext";
import styles from "./creation.module.css";
import ManuallyHelp from "./ManuallyHelp/ManuallyHelp";
import { useAppContext } from "../../../context/AppContext";
import { useForm } from "react-hook-form";
import { formValidator } from "../../../utils/transitions";
import { createGraphByText } from "../../../lib/tools";
import { useToasterContext } from "../../../context/ToasterContext";

const formOptions = {
    required: {
        value: true,
        message: "Enter a number",
    },
    validate: {
        value: (e) => formValidator(e),
    },
};

export default function Creation({ defaultPage = 0 }) {
    const { closeModal, setContent } = useModalContext();
    const { restart, restartWithData, configuration } = useAppContext();
    const { setToastConfig } = useToasterContext();

    const [page, setPage] = useState(defaultPage);
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();
    const CREATION_AMOUNT_ERROR = {
        status: "error",
        trigger: true,
        content: {
            title: "Error",
            description: `You must set a lower number than ${configuration.maxNodes}`,
        },
    };

    const onSubmit = handleSubmit((e) => {
        if (page === 0) {
            if (e.amount >= configuration.maxNodes) {
                return setToastConfig(CREATION_AMOUNT_ERROR);
            }
            restart(parseInt(e.amount));
            closeModal();
        } else {
            const data = e.text.trim().split("\n");
            const lines = data.map((text) => text.trim().split(" "));
            let isok = true;
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                if (line.length !== 3) {
                    setError("text", { message: "The sintax is wrong" });
                    isok = false;
                    break;
                }
            }
            if (isok) {
                const [edges, nodes] = createGraphByText(lines);
                restartWithData(edges, nodes);
                closeModal();
            }
        }
    });

    const onHelpClick = () => {
        setContent(<ManuallyHelp />);
    };

    return (
        <form className={styles.creation} onSubmit={onSubmit}>
            <img
                tag="icon"
                className={styles.close}
                src="/icons/close.svg"
                alt="close"
                onClick={closeModal}
            />
            <div className={styles.title}>
                <h2>Create a new graph</h2>
            </div>
            <main className={styles.content}>
                <nav className={styles.nav}>
                    <span
                        aria-selected={page === 0}
                        className={styles.navLink}
                        onClick={() => setPage(0)}
                    >
                        Automatic
                    </span>
                    <span
                        aria-selected={page === 1}
                        className={styles.navLink}
                        onClick={() => setPage(1)}
                    >
                        Manually
                    </span>
                </nav>
                <div className={styles.page}>
                    {page === 0 && (
                        <div className={styles.pageContent}>
                            <div className={styles.subtitle}>
                                <p className={styles.pageTitle}>
                                    Enter a number
                                </p>
                                {errors.amount && (
                                    <span className={styles.error}>
                                        Enter an integer number
                                    </span>
                                )}
                            </div>
                            <input
                                type="text"
                                className={styles.input}
                                {...register("amount", formOptions)}
                                autoComplete="off"
                            />
                        </div>
                    )}
                    {page === 1 && (
                        <div className={styles.pageContent}>
                            <div className={styles.pageTitle}>
                                <div className={styles.subtitle}>
                                    <p>Enter the graph's description</p>
                                    {errors.text && (
                                        <span className={styles.error}>
                                            {errors.text.message}
                                        </span>
                                    )}
                                </div>
                                <img
                                    src="/toolbar/help-icon.svg"
                                    alt="help"
                                    onClick={onHelpClick}
                                />
                            </div>
                            <div className={styles.textareaContainer}>
                                <textarea
                                    className={styles.textarea}
                                    {...register("text", { required: true })}
                                ></textarea>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <p></p>
            <footer className={styles.footer}>
                <button className={styles.button} type="submit">
                    Create
                </button>
            </footer>
        </form>
    );
}
