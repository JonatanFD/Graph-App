import { createContext, useContext, useEffect, useState } from "react";

const InterfaceContext = createContext();
const initialState = {
    edgeDescription: "", // id
    nodeDescription: "", // id
    connectingNodes: false,
    displayMenu: false,
    creatingNode: false,
};

export const InterfaceContextProvider = ({ children }) => {
    const [Interface, setInterface] = useState(() => initialState);

    const changeInterface = (action) => {
        setInterface((prevInterface) => {
            switch (action.type) {
                case "display":
                    return {
                        ...initialState,
                        [action.value.name]: action.value.value,
                    };
                case "hide":
                    return { ...initialState, [action.value.name]: false };
                case "reverse":
                    return {
                        ...initialState,
                        [action.value.name]: !prevInterface[action.value.name],
                    };
                case "clear":
                    return initialState;
                default:
                    return prevInterface;
            }
        });
    };

    const openMenu = (e) => {
        e.stopPropagation();
        changeInterface({ type: "reverse", value: { name: "displayMenu" } });
    };

    return (
        <InterfaceContext.Provider
            value={{
                openMenu,
                changeInterface,
                Interface,
            }}
        >
            {children}
        </InterfaceContext.Provider>
    );
};

export const useInterfaceContext = () => useContext(InterfaceContext);
