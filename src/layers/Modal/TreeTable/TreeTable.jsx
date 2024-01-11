import styles from "./treetable.module.css";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import { useModalContext } from "../../../context/ModalContext";

const TableRow = ({ edge, nro }) => {
    const { from, to, weight } = edge;
    return (
        <li className={styles.row}>
            <p>{nro + 1}</p>
            <p>
                ({from.name}; {to.name})
            </p>
            <p>{weight}</p>
        </li>
    );
};

export default function TreeTable() {
    const { method, Prim, Kruskal } = useAppContext();
    const { closeModal } = useModalContext();
    const [Total, setTotal] = useState(0);

    const onClickModal = (e) => {
        e.stopPropagation();
    };

    useEffect(() => {
        let total = 0;
        if (method === "Prim") {
            Prim.forEach((element) => {
                total += element.weight;
            });
        } else if (method === "Kruskal") {
            Kruskal.forEach((element) => {
                total += element.weight;
            });
        }
        setTotal(total);
    }, []);

    return (
        <section className={styles.treetable} onClick={onClickModal}>
            <img
                tag="icon"
                className={styles.close}
                src="/icons/close.svg"
                alt="close"
                onClick={closeModal}
            />
            <div className={styles.title}>
                <h2>{method}</h2>
            </div>
            <div className={styles.header}>
                <p>Nro Edge</p>
                <p>Lightest Edge</p>
                <p>Weight</p>
            </div>

            <ul className={styles.list}>
                {method === "Prim" &&
                    Prim.map((edge, index) => (
                        <TableRow
                            key={crypto.randomUUID()}
                            edge={edge}
                            nro={index}
                        />
                    ))}
                {method === "Kruskal" &&
                    Kruskal.map((edge, index) => (
                        <TableRow
                            key={crypto.randomUUID()}
                            edge={edge}
                            nro={index}
                        />
                    ))}

                <li className={styles.row}>
                    <p></p>
                    <p>Total</p>
                    <p>{Total}</p>
                </li>
            </ul>
        </section>
    );
}
