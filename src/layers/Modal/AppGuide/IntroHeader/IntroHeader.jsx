import Image from "next/image";
import styles from "./introheader.module.css";

export default function IntroHeader() {
    return (
        <article className={styles.introheader}>
            <div>
                <p>
                    At the top of the page, you can enter the number of nodes
                    you want your graph to have, the number must be less than
                    20.
                </p>

                <div className={styles.image}>
                    <Image src='/appguide/introheader_1.svg' width={420} height={40} alt="form" />
                
                </div>
            </div>
        </article>
    );
}
