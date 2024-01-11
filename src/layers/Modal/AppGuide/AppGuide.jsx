import Image from "next/image";
import styles from "./appguide.module.css";
import { useModalContext } from "@/context/ModalContext";
import { useState } from "react";
import Welcome from "./Welcome/Welcome";
import IntroHeader from "./IntroHeader/IntroHeader";

const titles = ['Welcome to', 'Tools'];


export default function AppGuide() {
    const { closeModal } = useModalContext();
    const [pagination, setPagination] = useState(0);

    const onClickHandler = (e) => {
        e.stopPropagation();
    };

    const nextPage = () => {
        if (pagination !== titles.length - 1) {
            setPagination(pagination + 1);
        }
    };
    const previousPage = () => {
        if (pagination !== 0) {
            setPagination(pagination - 1);
        }
    };

    return (
        <div className={styles.appguide} onClick={onClickHandler}>
            <Image
                tag="icon"
                className={styles.close}
                src="/close.svg"
                alt="close"
                width={20}
                height={20}
                onClick={closeModal}
            />
            <div className={styles.header}>
                <h1>{titles[pagination]}</h1>
            </div>
            <section className={styles.content}>
                {pagination === 0 && <Welcome />}
                {pagination === 1 && <IntroHeader />}
            </section>

            <div className={styles.buttons}>
                <button className={styles.skip} onClick={closeModal}>
                    Skip
                </button>

                <div className={styles.controllers}>
                    <Image
                        src="/before.svg"
                        alt="before"
                        width={24}
                        height={24}
                        tag="icon"
                        className={styles.controller}
                        onClick={previousPage}
                    />
                    <Image
                        src="/after.svg"
                        alt="before"
                        width={24}
                        height={24}
                        tag="icon"
                        className={styles.controller}
                        onClick={nextPage}
                    />
                </div>
            </div>
        </div>
    );
}
