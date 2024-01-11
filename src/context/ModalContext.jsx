const { createContext, useContext, useState } = require("react");

const ModalContext = createContext(false);

export const ModalContextProvider = ({ children }) => {
    const [content, setContent] = useState(false);

    const closeModal = () => setContent(false)
    return (
        <ModalContext.Provider value={{ setContent, content, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModalContext = () => useContext(ModalContext);
