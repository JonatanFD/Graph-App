import { createContext, useContext, useEffect, useState } from "react";
import { useGraph } from "../hooks/useGraph";
import { createEdgeInfo, getNode } from "../lib/tools";

const AppContext = createContext();

const INITIAL_CONFIG = {
    maxNodes: 20,
    initialNodes: 6,
    showNodesName: true,
    edgesMaxWeight: 10,
    howToGenerate: "alphabetic",
};
const getInitialConfiguration = () => {
    if (!localStorage.getItem("app-config")) {
        return INITIAL_CONFIG;
    }
    return JSON.parse(localStorage.getItem("app-config"));
};

export const AppContextProvider = ({ children }) => {
    const [configuration, setConfiguration] = useState(() =>
        getInitialConfiguration()
    );
    const {
        Edges,
        Kruskal,
        Nodes,
        Prim,
        moveNode,
        restartGraph,
        selectNode,
        setBoxPosition,
        selectedNode,
        deleteEdge,
        deleteNode,
        addEdge,
        updateEdgeWeight,
        restartApp,
        createNode,restartWithData
    } = useGraph(configuration);

    const [solution, setSolution] = useState("off");
    const [drawing, setDrawing] = useState(false);
    const [method, setMethod] = useState("Prim");
    const [connecting, setConnecting] = useState({
        from: "",
        to: "",
        active: false,
    });
    const [cursor, setCursor] = useState({});

    // SE PUEDE MEJORAR
    const onMouseLeave = () => {
        if (!drawing) {
            selectNode();
        }
    };
    const onMouseEnter = (id) => {
        if (!drawing) {
            selectNode(id);
        }
    };
    const onMouseDownNode = (e) => {
        const target = e.target;
        if (target.nodeName === "SPAN") {
            if (e.pageY === undefined) {
                setBoxPosition({
                    top:
                        e.touches[0].clientY - target.parentNode.offsetTop - 65,
                    left: e.touches[0].clientX - target.parentNode.offsetLeft,
                });
            } else {
                setBoxPosition({
                    top: e.pageY - target.parentNode.offsetTop - 65,
                    left: e.pageX - target.parentNode.offsetLeft,
                });
            }
        } else if (!drawing) {
            if (e.pageY === undefined) {
                setBoxPosition({
                    top:
                        e.touches[0].clientY - target.parentNode.offsetTop - 65,
                    left: e.touches[0].clientX - target.parentNode.offsetLeft,
                });
            } else {
                setBoxPosition({
                    top: e.pageY - 65 - e.target.offsetTop,
                    left: e.pageX - e.target.offsetLeft,
                });
            }
        }
    };
    const onMouseMoveHandler = (e) => {
        const target = e.target.nodeName;
        if (target !== "DIV" && target !== "SPAN" && !drawing) {
            selectNode();
        }
        if (drawing && selectedNode !== "") {
            moveNode(e);
        }
        setCursor({ top: e.pageY, left: e.pageX });
    };
    // -----------------------
    const onMouseDownHandler = () => {
        setDrawing(true);
    };
    const onMouseUpHandler = () => {
        setDrawing(false);
        selectNode();
    };
    const changeMethod = (methodToUse) => {
        if (methodToUse === "Prim" || methodToUse === "Kruskal") {
            setMethod(methodToUse);
        }
    };
    const changeSolution = (value = "") => {
        if (value) {
            setSolution(value);
        } else {
            setSolution((prev) => (prev === "on" ? "off" : "on"));
        }
    };

    const connectNode = (id) => {
        if (connecting.from === "") {
            setConnecting({ ...connecting, from: id, active: true });
        } else {
            setConnecting({ ...connecting, to: id });
        }
    };
    const createEdge = (connecting) => {
        const fromNode = getNode(connecting.from, Nodes);
        const toNode = getNode(connecting.to, Nodes);
        if (
            Edges.find(
                (edge) =>
                    (edge.from.id === fromNode.id ||
                        edge.to.id === fromNode.id) &&
                    (edge.from.id === toNode.id || edge.to.id === toNode.id)
            )
        ) {
            return false;
        }

        const newEdge = createEdgeInfo(
            fromNode,
            toNode,
            configuration.edgesMaxWeight
        );
        addEdge(newEdge);

        return true;
    };

    const restart = (amount) => {
        if (0 <= amount <= configuration.maxNodes) {
            restartGraph(amount);
        }
    };

   


    useEffect(() => {
        if (connecting.from !== "" && connecting.to !== "") {
            createEdge(connecting);
            setConnecting({ from: "", to: "", active: false });
        }
    }, [connecting]);

    useEffect(() => {
        localStorage.setItem("app-config", JSON.stringify(configuration));
    }, [configuration]);

    return (
        <AppContext.Provider
            value={{
                Nodes,
                Edges,
                Prim,
                Kruskal,

                restart,
                selectNode,
                setBoxPosition,
                solution,
                onMouseDownNode,
                onMouseLeave,
                onMouseEnter,
                onMouseDownHandler,
                onMouseUpHandler,
                onMouseMoveHandler,
                method,
                changeMethod,
                changeSolution,
                deleteEdge,
                deleteNode,
                connectNode,
                connecting,
                cursor,
                updateEdgeWeight,
                restartApp,
                createNode,

                configuration,
                setConfiguration,

                restartWithData
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
