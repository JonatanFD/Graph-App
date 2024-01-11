import styles from "./edgedescription.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppContext } from "../../../../context/AppContext";
import { EXPAND_TRANSITION_VARIANT, formValidator } from "../../../../utils/transitions";

export default function EdgeDescription({ edge }) {
    const { deleteEdge, updateEdgeWeight } = useAppContext();
    const { weight, id } = edge;
    const [editWeight, setEditWeight] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

    const onSubmitHandler = handleSubmit((data) => {
        if (!formValidator(data.weight)) {
            setError("weight", { message: "Enter only numbers" });
            return;
        }

        const cantidad = parseInt(data.weight);

        if (cantidad > 10 || cantidad <= 0) {
            setError("weight", { message: "10 is max value" });
        } else {
            updateEdgeWeight(id, cantidad);
            setEditWeight(false)
        }
    });

    const onClickDropDown = (e) => {
        e.stopPropagation();
    };
    const openEditMode = () => {
        setEditWeight(!editWeight);
    };
    return (
        <motion.div
            className={styles.dropdown}
            variants={EXPAND_TRANSITION_VARIANT}
            initial={"exit"}
            animate={"enter"}
            exit={"exit"}
            style={{ originY: 0 }}
            onClick={onClickDropDown}
        >
            <form
                className={styles.header}
                editing={editWeight.toString()}
                onSubmit={onSubmitHandler}
            >
                {editWeight ? (
                    <>
                        <input
                            type="text"
                            className={styles.input}
                            {...register("weight", {
                                required: {
                                    value: true,
                                    message: "Enter a number",
                                },
                            })}
                        />
                        <img
                            src="/icons/confirm.svg"
                            alt="confirm"
                            width={16}
                            height={16}
                            className={styles.confirm}
                            onClick={onSubmitHandler}
                        />
                        <AnimatePresence>
                            {errors.weight && (
                                <motion.div
                                    variants={EXPAND_TRANSITION_VARIANT}
                                    initial={"exit"}
                                    animate={"enter"}
                                    exit={"exit"}
                                    style={{ originY: 1 }}
                                    className={styles.error}
                                >
                                    <p>{errors.weight.message}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </>
                ) : (
                    <h3 className={styles.title}>{weight}</h3>
                )}
            </form>

            <ul className={styles.details}>
                <li className={styles.detail}>
                    <p className={styles.tag}>From: </p>
                    <span className={styles.node}>{edge.from.name}</span>
                </li>
                <li className={styles.detail}>
                    <p className={styles.tag}>To: </p>
                    <span className={styles.node}>{edge.to.name}</span>
                </li>
            </ul>
            <div className={styles.buttons}>
                <img
                    src="/icons/edit.svg"
                    alt="edit"
                    width={20}
                    height={20}
                    className={styles.edit}
                    onClick={openEditMode}
                />
                <img
                    src="/icons/delete.svg"
                    alt="delete"
                    width={20}
                    height={20}
                    className={styles.delete}
                    onClick={() => deleteEdge(id)}
                />
            </div>
        </motion.div>
    );
}
