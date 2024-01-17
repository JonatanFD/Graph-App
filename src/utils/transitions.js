export const ANIMATION_ORIENTATION = {
    right: {
        originX: 0,
    },
    bottom: {
        originY: 0,
    },
};

const GENERAL_DELAY = 0;

export const EXPAND_TRANSITION_VARIANT = {
    enter: {
        transform: "scale(1)",
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0,
            duration: 0.3,
            delay: GENERAL_DELAY,
        },
    },
    exit: {
        transform: "scale(0)",
        opacity: 0,
        transition: {
            type: "easeOut",
            duration: 0.2,
            delay: GENERAL_DELAY,
        },
    },
};
export const COLOR_NORMAL = "#945C01";
export const COLOR_SELECCIONADO = "#0070f0";

export const paintEdge = (solution, method, prim, kruskal, id) => {
    if (solution === "on") {
        if (method == "kruskal") {
            if (kruskal.find((krus) => krus.id === id)) {
                return COLOR_SELECCIONADO;
            }
        } else if (method === "prim") {
            if (prim.find((pri) => pri.id === id)) {
                return COLOR_SELECCIONADO;
            }
        }
    }
    return COLOR_NORMAL;
};

export const formValidator = (data) => {
    const re = new RegExp(/^([0-9])*$/);
    return re.test(data);
};

export const structure = (data, type = "number") => {
    
    if (type === "number") {
        const re = new RegExp(/^([0-9])*$/);

        if (re.test(data)) {
            return true;
        }
    }
    console.log("INGRESANDO STRING");
    if (data) {
        return true;
    }
    return false;
};

export const objectValidator = (obj) => {

    const properties = global.Object.getOwnPropertyNames(obj);
    let itsOk = true;
    for (let i = 0; i < properties.length; i++) {
        const prop = properties[i];

        if (typeof obj[prop] === "boolean") {
            continue
        }

        if (!structure(obj[prop])) {
            console.log("INTENTANDO", i);
            itsOk = false;
            break;
        }
    }

    return itsOk
};

export const fadeInAndOutVariant = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
    },
};