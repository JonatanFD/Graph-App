import { useEffect, useState } from "react";
import {
    createEdgeInfo,
    createEdgesWithNodes,
    createNodes,
    getDistanceBetweenNodes,
} from "../lib/tools";
import { generateMinimunTree } from "../lib/GraphMethods";
import { generateRandomName, generateRandomNumber } from "../utils/utils";

export const useGraph = (amountOfNodes = 6) => {
    // Basics
    const [Nodes, setNodes] = useState(() => createNodes(amountOfNodes));
    const [Edges, setEdges] = useState(() => createEdgesWithNodes(Nodes));
    const [restartApp, setRestartApp] = useState(false);

    // Movement
    const [selectedNode, setSelectedNode] = useState("");
    const [boxPosition, setBoxPosition] = useState({ top: 0, left: 0 });

    // Trees
    const [Prim, setPrim] = useState(() =>
        generateMinimunTree(Nodes, Edges, "Prim")
    );
    const [Kruskal, setKruskal] = useState(() =>
        generateMinimunTree(Nodes, Edges, "Kruskal")
    );

    // Behaviors
    const selectNode = (id = "") => setSelectedNode(id);
    const moveNode = (e) => {
        let top, left;
        if (e.clientX === undefined) {
            e.preventDefault();
            top = e.touches[0].clientY - boxPosition.top;
            left = e.touches[0].clientX - boxPosition.left;
        } else {
            top = e.clientY - boxPosition.top;
            left = e.clientX - boxPosition.left;
        }
        let newtop, newleft;

        const updatedNodes = Nodes.map((node) => {
            if (selectedNode === node.id) {
                if (top > 65 && top < window.innerHeight) newtop = top - 65;
                else newtop = node.top;
                if (left > 5 && left < window.innerWidth - 55) newleft = left;
                else newleft = node.left;

                node.left = newleft;
                node.top = newtop;
            }

            return node;
        });
        setNodes([...updatedNodes]);
    };

    // RESTART WITH AMOUNT OF NODES
    const restartGraph = (newAmount) => {
        const newGraphNodes = createNodes(newAmount);
        setNodes(newGraphNodes);
        setEdges(createEdgesWithNodes(newGraphNodes));
        setRestartApp(true);
    };
    const updateEdgesFromNode = (id = "") => {
        const updatedEdges = Edges.map((edge) => {
            if (edge.from.id === id || edge.to.id === id) {
                const newedge = {
                    ...edge,
                    boxW: Math.abs(edge.from.left - edge.to.left),
                    boxH: Math.abs(edge.from.top - edge.to.top),
                    boxTop:
                        (edge.from.top > edge.to.top
                            ? edge.to.top
                            : edge.from.top) + 25,
                    boxLeft:
                        (edge.from.left > edge.to.left
                            ? edge.to.left
                            : edge.from.left) + 25,
                };
                return newedge;
            }
            return edge;
        });
        setEdges([...updatedEdges]);
    };

    const deleteEdge = (id) => {
        const newEdgesList = Edges.filter((edge) => edge.id !== id);
        setEdges(newEdgesList);
        const newNodesList = Nodes.map((node) => {
            const newNodeEdges = node.edges.filter((value) => value.id !== id);
            node.edges = newNodeEdges;
            return node;
        });
        setNodes(newNodesList);
        setRestartApp(true);
    };

    const deleteNode = (id = "") => {
        let newNodesList = Nodes.filter((node) => node.id !== id);
        newNodesList = newNodesList.map((node) => {
            const newEdges = node.edges.filter((edge) => {
                if (edge.from.id === id || edge.to.id === id) {
                    return false;
                }
                return true;
            });
            node.edges = newEdges;
            return node;
        });
        setNodes(newNodesList);

        const newEdgesList = Edges.filter((edge) => {
            if (edge.from.id === id || edge.to.id === id) {
                return false;
            }
            return true;
        });
        setEdges(newEdgesList);
        setRestartApp(true);
    };

    const addEdge = (edge) => {
        setEdges([...Edges, edge]);
        const updatedNodeList = Nodes.map((node) => {
            if (node.id === edge.from.id || node.id === edge.to.id) {
                node.edges = [...node.edges, edge];
            }
            return node;
        });
        setNodes(updatedNodeList);
        setRestartApp(true);
    };

    const updateEdgeWeight = (id, weight) => {
        const updatedEdges = Edges.map((edge) => {
            if (edge.id === id) {
                edge.weight = weight;
            }
            return edge;
        });
        const updatedNodes = Nodes.map((node) => {
            const index = node.edges.findIndex((edge) => edge.id === id);
            if (index >= 0) {
                node.edges[index].weight = weight;
            }

            return node;
        });

        setNodes(updatedNodes);
        setEdges(updatedEdges);
        setRestartApp(true);
    };

    const createNode = (e) => {
        const newNode = {
            id: crypto.randomUUID(),
            name: generateRandomName(),
            top: e.clientY - 25,
            left: e.clientX - 25,
            maxEdges: generateRandomNumber(3, 5),
            edges: [],
        };

        let pairNode = Nodes[0];

        Nodes.forEach((node) => {
            const distance = getDistanceBetweenNodes(node, newNode);
            if (distance < getDistanceBetweenNodes(pairNode, newNode)) {
                pairNode = node;
            }
        });

        let newNodesList = [];
        if (pairNode !== undefined) {
            const newEdge = createEdgeInfo(newNode, pairNode);
            newNode.edges.push(newEdge);
            newNodesList = Nodes.map((node) => {
                if (node.id === pairNode.id) {
                    node.edges.push(newEdge);
                }
                return node;
            });
            setEdges([...Edges, newEdge]);
        }
        setNodes([...newNodesList, newNode]);
        setRestartApp(true);
    };

    useEffect(() => {
        if (selectedNode) {
            updateEdgesFromNode(selectedNode);
        }
    }, [Nodes]);

    useEffect(() => {
        if (restartApp) {
            setKruskal(generateMinimunTree(Nodes, Edges, "Kruskal"));
            setPrim(generateMinimunTree(Nodes, Edges, "Prim"));
            setRestartApp(false);
        }
    }, [restartApp]);

    return {
        Nodes,
        Edges,
        selectNode,
        setBoxPosition,
        moveNode,
        restartGraph,
        Kruskal,
        Prim,
        selectedNode,
        deleteEdge,
        deleteNode,
        addEdge,
        updateEdgeWeight,
        restartApp,
        createNode,
    };
};
