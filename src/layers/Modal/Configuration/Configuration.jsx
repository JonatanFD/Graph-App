import { useForm } from "react-hook-form";
import Selector from "../../../components/Selector/Selector";
import SelectorItem from "../../../components/Selector/SelectorItem/SelectorItem";
import { useAppContext } from "../../../context/AppContext";
import { useModalContext } from "../../../context/ModalContext";
import styles from "./configuration.module.css";
import { useState } from "react";
import Switch from "../../../components/Switch/Switch";
import RadioGroup from "../../../components/RadioGroup/RadioGroup";
import Radio from "../../../components/RadioGroup/Radio/Radio";
import { formValidator, objectValidator } from "../../../utils/transitions";
import { useToasterContext } from "../../../context/ToasterContext";

const CONFIGURATION_ERROR = {
    status: "error",
    trigger: true,
    content: {
        title: "Error",
        description: "There is an error",
    },
};

const CONFIGURATION_OK = {
    status: "ok",
    trigger: true,
    content: {
        title: "Succesfull",
        description: "All changes was saved",
    },
};
const formOptions = {
    required: {
        value: true,
        message: "Enter a number",
    },
    validate: {
        value: (e) => formValidator(e),
    },
};
export default function Configuration() {
    const { closeModal } = useModalContext();
    const { changeMethod, method, configuration, setConfiguration } =
        useAppContext();
    const { setToastConfig } = useToasterContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSelectorChange = (value) => {
        changeMethod(value);
    };
    const [localConfig, setLocalConfig] = useState({
        showNodesName: configuration.showNodesName,
        howToGenerate: configuration.howToGenerate,
    });
    const onShowNodesNameChange = () => {
        setLocalConfig({
            ...localConfig,
            showNodesName: !localConfig.showNodesName,
        });
    };
    const onHowToChange = (value) => {
        setLocalConfig({ ...localConfig, howToGenerate: value });
    };

    const onSubmit = handleSubmit((e) => {
        const newConfiguration = { ...localConfig, ...e };
        console.log(newConfiguration);
        if (objectValidator(newConfiguration)) {
            newConfiguration.initialNodes = parseInt(
                newConfiguration.initialNodes
            );
            newConfiguration.maxNodes = parseInt(newConfiguration.maxNodes);
            newConfiguration.edgesMaxWeight = parseInt(
                newConfiguration.edgesMaxWeight
            );

            setConfiguration(newConfiguration);
            setToastConfig(CONFIGURATION_OK);
        } else {
            setToastConfig(CONFIGURATION_ERROR);
        }
        closeModal();
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

                            <span className={styles.inputField}>
                                {errors.initialNodes && (
                                    <div className={styles.error}>
                                        Enter a number
                                    </div>
                                )}

                                <input
                                    type="text"
                                    autoComplete="off"
                                    defaultValue={configuration.initialNodes}
                                    {...register("initialNodes", formOptions)}
                                />
                            </span>
                        </div>
                        <div className={styles.option}>
                            <label className={styles.label}>
                                Max nodes that can be created
                            </label>
                            <span className={styles.inputField}>
                                {errors.maxNodes && (
                                    <div className={styles.error}>
                                        Enter a number
                                    </div>
                                )}
                                <input
                                    type="text"
                                    autoComplete="off"
                                    defaultValue={configuration.maxNodes}
                                    {...register("maxNodes", formOptions)}
                                />
                            </span>
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
                                How to generate node's names
                            </label>

                            <RadioGroup
                                value={localConfig.howToGenerate}
                                onValueChange={onHowToChange}
                            >
                                <Radio value="random">Random</Radio>
                                <Radio value="alphabetic">Alphabetic</Radio>
                            </RadioGroup>
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

                            <span className={styles.inputField}>
                                {errors.edgesMaxWeight && (
                                    <div className={styles.error}>
                                        Enter a number
                                    </div>
                                )}

                                <input
                                    type="text"
                                    defaultValue={configuration.edgesMaxWeight}
                                    autoComplete="off"
                                    {...register("edgesMaxWeight", formOptions)}
                                />
                            </span>
                        </div>
                    </section>
                </section>
            </section>

            <div className={styles.footer}>
                <button
                    className={styles.discard}
                    type="button"
                    onClick={closeModal}
                >
                    Discard
                </button>
                <button className={styles.save} type="submit">
                    Save
                </button>
            </div>
        </form>
    );
}
