import {
    generateAlphabeticNames,
    generateRandomName,
    generateRandomNumber,
} from "../utils/utils";
import { generateKruskalTree } from "./GraphMethods";

const generateNodePositionY = () => {
    let a = 0, b = 0
    if (window.innerWidth <= 767) {
        b = 72
        a = 36
    }

    return generateRandomNumber(a, window.innerHeight - 50 - b) + a
}

const generateNodePositionX = () => {

    return generateRandomNumber(0, window.innerWidth - 50)
}



// Creation tools
export const createNodes = (amount, howToGenerate) => {
    const listOfNodes = [];

    for (let i = 0; i < amount; i++) {
        const node = {
            id: crypto.randomUUID(),
            top: generateNodePositionY(),
            left: generateNodePositionX(),
            maxEdges: generateRandomNumber(3, 5),
            edges: [],
        };

        listOfNodes.push(node);
    }
    let names = [];
    if (howToGenerate === "alphabetic") {
        names = generateAlphabeticNames(amount);
    }

    for (let i = 0; i < listOfNodes.length; i++) {
        if (howToGenerate === "random") {
            listOfNodes[i].name = generateRandomName();
        } else {
            listOfNodes[i].name = names[i];
        }
    }
    return listOfNodes;
};

export const createEdgesWithNodes = (nodes = [], weightMax) => {
    let listOfEdges = [];
    if (nodes.length === 0) {
        return listOfEdges;
    }
    while (true) {
        restartNodes(nodes);
        listOfEdges = createAllEdges(nodes, weightMax);
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

export const createAllEdges = (nodes = [], weightMax) => {
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

                const edge = createEdgeInfo(nodes[i], nodes[j], weightMax);
                nodes[i].edges.push(edge);
                nodes[j].edges.push(edge);
                edges.push(edge);
            }
        }
    }
    return edges;
};

export const createEdgeInfo = (from = {}, to = {}, weightMax, manually = 0) => {
    let weight;
    if (manually) {
        weight = manually;
    } else {
        weight = generateRandomNumber(1, weightMax);
    }
    return {
        id: crypto.randomUUID(),
        weight: weight,
        from: from,
        to: to,
        // View config
        boxW: Math.abs(from.left - to.left),
        boxH: Math.abs(from.top - to.top),
        boxTop: (from.top > to.top ? to.top : from.top) + 25,
        boxLeft: (from.left > to.left ? to.left : from.left) + 25,
        kruskal: false,
        prim: false,
    };
};

export const sortEdgesWeights = (edges = []) => {
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
    const dx = Math.pow(a.left - b.left, 2);
    const dy = Math.pow(a.top - b.top, 2);

    return Math.sqrt(dx + dy);
};

export const createGraphByText = (lines = []) => {
    const rawnodes = new Set([]);
    lines.forEach((line) => {
        rawnodes.add(line[0]);
        rawnodes.add(line[2]);
    });
    const names = [...rawnodes];

    const Nodes = names.map((el) => ({
        id: crypto.randomUUID(),
        top: generateRandomNumber(0, window.innerHeight - 50),
        left: generateRandomNumber(0, window.innerWidth - 50),
        maxEdges: generateRandomNumber(3, 5),
        edges: [],
        name: el,
    }));

    const edges = [];
    lines.forEach((line) => {
        const name1 = line[0];
        const name2 = line[2];
        const weight = line[1];
        if (name1 !== name2) {
            const fromIndex = findNodeByNameInSubset(line[0], Nodes);
            const toIndex = findNodeByNameInSubset(line[2], Nodes);
            const edge = createEdgeInfo(
                Nodes[fromIndex],
                Nodes[toIndex],
                false,
                parseInt(weight)
            );

            edges.push(edge);
            Nodes[fromIndex].edges.push(edge);
            Nodes[toIndex].edges.push(edge);
        }
    });

    console.log("EDGES", edges);
    console.log("Nodes", Nodes);


    return [edges, Nodes]
};

const findNodeByNameInSubset = (name, nodes) => {
    return nodes.findIndex((node) => node.name === name);
};
