
import { generateRandomName, generateRandomNumber } from "../utils/utils";
import { generateKruskalTree } from "./GraphMethods";


// Creation tools
export const createNodes = (amount) => {
    const listOfNodes = [];

    for (let i = 0; i < amount; i++) {
        const node = {
            id: crypto.randomUUID(),
            name: generateRandomName(),
            top: generateRandomNumber(0, window.innerHeight - 50),
            left: generateRandomNumber(0, window.innerWidth - 50),
            maxEdges: generateRandomNumber(3, 5),
            edges: [],
        };

        listOfNodes.push(node);
    }

    return listOfNodes;
};

export const createEdgesWithNodes = (nodes = []) => {
    let listOfEdges = [];
    if (nodes.length === 0) {
        return listOfEdges
    }
    while (true) {
        // This function sets all nodes with empty edge list
        restartNodes(nodes);

        listOfEdges = createAllEdges(nodes);
        // Even if we create all edges, we dont know if all nodes are connected
        // thats why we test it with Kruskal Algorithm
        const kruskal = generateKruskalTree(listOfEdges, nodes);
        if (kruskal.length !== 0) {
            break;
        }
    }
    return listOfEdges;
};



export const restartNodes = (nodes = []) => {
    return nodes.map((node) => {
        node.edges = [];
        return node;
    });
};

export const createAllEdges = (nodes = []) => {
    // define our arrays
    let booleanMatrix = [];
    let totalOfNodes = nodes.length;
    let edges = [];
    // boolean matrix is created
    for (let i = 0; i < totalOfNodes; i++) {
        booleanMatrix.push(new Array(totalOfNodes).fill(0, 0, totalOfNodes));
    }
    for (let i = 0; i < totalOfNodes; i++) {
        for (let j = 0; j < totalOfNodes; j++) {
            if (i === j) {
                booleanMatrix[i][j] = 1;
            }
        }
    }
    // starting to generate edges
    for (let i = 0; i < totalOfNodes; i++) {
        for (let j = 0; j < totalOfNodes; j++) {
            if (
                booleanMatrix[i][j] === 0 &&
                booleanMatrix[j][i] === 0 && // both nodes are not connected, and avoid the main diagonal
                nodes[i].edges.length < nodes[i].maxEdges &&
                nodes[j].edges.length < nodes[j].maxEdges && // both nodes can be connected
                generateRandomNumber(0, 100) > 33 // just make random
            ) {
                booleanMatrix[i][j] = 1;
                booleanMatrix[j][i] = 1;

                const edge = createEdgeInfo(nodes[i], nodes[j]);
                nodes[i].edges.push(edge);
                nodes[j].edges.push(edge);
                edges.push(edge);
            }
        }
    }
    return edges;
};



export const createEdgeInfo = (from = {}, to = {}) => {
    return {
        id: crypto.randomUUID(),
        weight: generateRandomNumber(1, 10),
        from: from,
        to: to,

        // View config
        boxW: Math.abs(from.left - to.left),
        boxH: Math.abs(from.top - to.top),
        boxTop: (from.top > to.top ? to.top : from.top) + 25,
        boxLeft: (from.left > to.left ? to.left : from.left) +25,
        kruskal: false,
        prim: false,
    };
};



export const sortEdgesWeights = (edges = []) => {
    // VERIFICAR SI HAY CAMBIO SIN EL SLICE 
    return edges.slice().sort((a, b) => {
        if (a.weight >= b.weight) {
            return 1;
        }
        return -1;
    });
};


export const findNodeInSubset = (set = [], node) => {
    for (let i = 0; i < set.length; i++) {
        if (set[i].id === node.id) {
            return true;
        }
    }
    return false;
};


export const getMinorEdge = (edges) => {
    let minorIndex = 0;
    for (let i = 0; i < edges.length; i++) {
        if (edges[i].weight <= edges[minorIndex].weight) {
            minorIndex = i;
        }
    }
    return edges[minorIndex];
};


export const cleanEdges = (edgesOriginal, edgeToPush, activatedNodes) => {
    const ids = [];
    const limpio = [];

    for (let i = 0; i < edgesOriginal.length; i++) {
        let encontrado = false;

        for (let j = 0; j < ids.length; j++) {
            if (edgesOriginal[i].id === ids[j]) {
                encontrado = true;
                break;
            }
        }
        if (
            findNodeInSubset(activatedNodes, edgesOriginal[i].from) &&
            findNodeInSubset(activatedNodes, edgesOriginal[i].to)
        ) {
            continue;
        }

        if (!encontrado && edgesOriginal[i].id !== edgeToPush.id) {
            ids.push(edgesOriginal[i].id);
            limpio.push(edgesOriginal[i]);
        }
    }

    return limpio;
};


export const getNode = (id = "", nodes) => {
    return nodes.find((node) => node.id === id);
};


export const getDistanceBetweenNodes = (a, b) => {
    const dx = Math.pow(a.left - b.left, 2)
    const dy = Math.pow(a.top - b.top, 2)

    return Math.sqrt(dx + dy)
}
