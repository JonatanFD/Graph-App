import ToolBar from "../../../components/ToolBar/ToolBar";
import ToolbarItem from "../../../components/ToolBar/ToolbarItem/ToolbarItem";
import styles from "./usertoolbar.module.css";
import { useInterfaceContext } from "../../../context/InterfaceContext";
import { useAppContext } from "../../../context/AppContext";
import { useModalContext } from "../../../context/ModalContext";
import TreeTable from "../../Modal/TreeTable/TreeTable";
import Configuration from "../../Modal/Configuration/Configuration";

export default function UserToolBar() {
    const { changeSolution, solution } = useAppContext();
    const { changeInterface } = useInterfaceContext();
    const { setContent } = useModalContext();

    const TOOLBAR_ITEMS = [
        {
            icon: "/toolbar/select-icon.svg",
            key: "select",
            popover: "Select",
            onClick: (item, e) => {
                changeInterface({ type: "clear" });
            },
        },
        {
            icon: "/toolbar/node-icon.svg",
            key: "create-node",
            popover: "Create Node",
            onClick: () => {
                changeInterface({
                    type: "display",
                    value: { name: "creatingNode", value: true },
                });
            },
        },
        {
            icon: "/toolbar/connecting-edge.svg",
            key: "connect-nodes",
            popover: "Connect Nodes",
            onClick: () => {
                changeInterface({
                    type: "display",
                    value: { name: "connectingNodes", value: true },
                });
            },
        },
        {
            icon: `/toolbar/solution-${solution}.svg`,
            key: "show-solution",
            popover: "Show Solution",
            onClick: () => {
                changeSolution();
            },
        },
        {
            icon: "/toolbar/path-table.svg",
            key: "solution-table",
            popover: "Solution Table",
            oneTime: true,
            onClick: (item, e) => {
                e.stopPropagation();
                setContent(<TreeTable />);
            },
        },
    ];

    const CONFIG_ITEM = {
        popover: "Configuration",
        onClick: (item, e) => {
            e.stopPropagation();
            setContent(<Configuration />);
        },
    };

    return (
        <section className={styles.toolbar}>
            <ToolBar orientation="vertical">
                {TOOLBAR_ITEMS.map((item, index) => (
                    <ToolbarItem key={item.key} settings={item}>
                        <img
                            src={item.icon}
                            className={styles.configuration}
                            alt="configuration"
                        ></img>
                    </ToolbarItem>
                ))}
            </ToolBar>
            <ToolbarItem
                className={styles.config}
                key="configuration"
                settings={CONFIG_ITEM}
            >
                <img
                    src="/icons/settings-icon.svg"
                    className={styles.configicon}
                    alt="configuration"
                ></img>
            </ToolbarItem>
        </section>
    );
}

