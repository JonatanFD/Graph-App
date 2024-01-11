import { useForm } from "react-hook-form";
import Selector from "../../../components/Selector/Selector";
import SelectorItem from "../../../components/Selector/SelectorItem/SelectorItem";
import { useAppContext } from "../../../context/AppContext";
import { useInterfaceContext } from "../../../context/InterfaceContext";
import { useModalContext } from "../../../context/ModalContext";
import styles from "./configuration.module.css";
import { useState } from "react";
import Switch from "../../../components/Switch/Switch";

export default function Configuration() {
    const { closeModal } = useModalContext();
    const { changeMethod, method, configuration } = useAppContext();
    const { register, handleSubmit } = useForm();

    const onSelectorChange = (value) => {
        changeMethod(value);
    };
    const [localConfig, setLocalConfig] = useState({
        showNodesName: configuration.showNodesName,
    });
    const onShowNodesNameChange = () => {
        setLocalConfig({
            ...localConfig,
            showNodesName: !localConfig.showNodesName,
        });
    };

    const onSubmit = handleSubmit((e) => {
        console.log(e);

        console.log(parseInt(e.initialNodes));
        console.log(parseInt(e.maxNodes));
    });

    return (
        <form className={styles.configuration} onSubmit={onSubmit}>
            <img
                tag="icon"
                className={styles.close}
                src="/icons/close.svg"
                alt="close"
                onClick={closeModal}
            />

            <div>
                <h2 className={styles.title}>Configuration</h2>
            </div>

            <section className={styles.options}>
                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>General</h3>
                    <section className={styles.sectionOptions}>
                        <div className={styles.option}>
                            <label className={styles.label}>
                                Minimum tree path algorithm
                            </label>

                            <Selector value={method} then={onSelectorChange}>
                                <SelectorItem value="Prim" />
                                <SelectorItem value="Kruskal" />
                            </Selector>
                        </div>
                        <div className={styles.option}>
                            <label className={styles.label}>
                                Default initial nodes
                            </label>

                            <input
                                type="text"
                                defaultValue={configuration.initialNodes}
                                {...register("initialNodes")}
                            />
                        </div>
                        <div className={styles.option}>
                            <label className={styles.label}>
                                Max nodes that can be created
                            </label>
                            <input
                                type="text"
                                defaultValue={configuration.maxNodes}
                                {...register("maxNodes")}
                            />
                        </div>
                    </section>
                </section>

                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>Nodes</h3>

                    <section className={styles.sectionOptions}>
                        <div className={styles.option}>
                            <label className={styles.label}>
                                Show node's name
                            </label>

                            <Switch
                                isSelected={localConfig.showNodesName}
                                onValueChange={onShowNodesNameChange}
                            />
                        </div>
                        <div className={styles.radioOption}>
                            <label className={styles.label}>
                                How to generate node's namesnpm
                            </label>

                            <div className={styles.radios}>
                                <label className={styles.radio}>
                                    <input
                                        type="radio"
                                        name="generate"
                                        id="one"
                                    />
                                    <span>Random</span>
                                </label>

                                <label className={styles.radio}>
                                    <input
                                        type="radio"
                                        name="generate"
                                        id="two"
                                    />
                                    <span>Alphanumeric</span>
                                </label>
                            </div>
                        </div>
                    </section>
                </section>

                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>Edges</h3>

                    <section className={styles.sectionOptions}>
                        <div className={styles.option}>
                            <label className={styles.label}>
                                Edges max weight
                            </label>
                            <input
                                type="text"
                                defaultValue={configuration.edgesMaxWeight}
                                {...register("maxEdgesWeight")}
                            />
                        </div>
                    </section>
                </section>
            </section>

            <div className={styles.footer}>
                <button className={styles.save}>Save</button>
            </div>
        </form>
    );
}
