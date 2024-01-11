import { generateRandomNumber } from "../utils/utils";
import { cleanEdges, findNodeInSubset, getMinorEdge, sortEdgesWeights } from "./tools";

export const generateKruskalTree = (edgesOriginal, nodes) => {
    // Copy the original edges array
    const edges = sortEdgesWeights(edgesOriginal);

    let universe = [];
    const kruskal = [];
    while (kruskal.length < nodes.length - 1) {
        let a = -1,
            b = -1;
        if (edges.length === 0) {
            return [];
        }
        const edgeToPush = edges[0];
        for (let i = 0; i < universe.length; i++) {
            if (findNodeInSubset(universe[i], edgeToPush.from)) {
                a = i;
            }
            if (findNodeInSubset(universe[i], edgeToPush.to)) {
                b = i;
            }
        }
        if (a === -1 && b === -1) {
            const newSetNode = [edgeToPush.from, edgeToPush.to];
            universe = [...universe, newSetNode];
        } else if (a === b && a !== -1) {
            edges.shift();
            continue;
        } else if (a !== b && a !== -1 && b !== -1) {
            universe[a] = [...universe[a], ...universe[b]];
            universe = universe.filter((val, index) => index !== b);
        } else if (a !== b && (a === -1 || b === -1)) {
            if (a === -1) {
                universe[b] = [...universe[b], edgeToPush.from];
            } else {
                universe[a] = [...universe[a], edgeToPush.to];
            }
        }
        // Finally
        kruskal.push(edgeToPush);
        edges.shift();
    }

    return kruskal;
};

export const generatePrimTree = (nodes = []) => {
    const baseNode = nodes[generateRandomNumber(0, nodes.length)];
    const prim = [];

    let options = baseNode.edges; 
    const activatedNodes = [baseNode];

    while (prim.length < nodes.length - 1) {
        const edgeToPush = getMinorEdge(options);
        if (!findNodeInSubset(activatedNodes, edgeToPush.to)) {
            options = [...options, ...edgeToPush.to.edges];
            activatedNodes.push(edgeToPush.to);
        }
        if (!findNodeInSubset(activatedNodes, edgeToPush.from)) {
            options = [...options, ...edgeToPush.from.edges];
            activatedNodes.push(edgeToPush.from);
        }
        options = cleanEdges(options, edgeToPush, activatedNodes);
        prim.push(edgeToPush);
    }
    return prim;
};

export const generateMinimunTree = (Nodes = [], Edges, method) => {
    if (allNodesHasEdges(Nodes) && generateKruskalTree(Edges, Nodes).length !== 0) {
        if (method === "Prim") {
            return generatePrimTree(Nodes);
        } else if (method === "Kruskal") {
            return generateKruskalTree(Edges, Nodes);
        }
    }
    return [];
};

const allNodesHasEdges = (nodes = []) => {
    for (let i = 0; i < nodes.length; i++) {
        const element = nodes[i];
        if (element.edges.length === 0) {
            return false;
        }
    }
    return true;
};


