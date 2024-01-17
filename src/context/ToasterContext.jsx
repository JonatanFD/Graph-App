const { createContext, useState, useContext, useEffect } = require("react");

const ToasterContext = createContext();

export const ToasterContextProvider = ({ children }) => {
    const [Toast, setToast] = useState(false);
    const [toastConfig, setToastConfig] = useState({
        status: "nothing",
        trigger: false,
        content: false,
    });

    const setMessage = (newconfig, content) => {
        const newToastConfig = { ...toastConfig, activate: true, ...newconfig };
        setToastConfig(newToastConfig);
        setToast(content);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (toastConfig.trigger) {
                setMessage({ ...toastConfig, trigger: false }, false);
            }
        }, 3000);
        return () => {
            clearTimeout(timer);
        };
    }, [toastConfig]);
    return (
        <ToasterContext.Provider
            value={{ setMessage, Toast, toastConfig, setToastConfig }}
        >
            {children}
        </ToasterContext.Provider>
    );
};

export const useToasterContext = () => useContext(ToasterContext);

/* 
    Toast: es el contenido que se va a mostrar y siempre tiene que cambiar 

    toastConfig: {
        status: "ok", "error", "warning" // Basicamente es el diseño del toast 
        trigger:  // renderiza el toast
        content: {
            title: "",
            description: ""
        }


        ...otherContainerProps
        className: por si se quiere cambiar el estilo del modal,
    }


*/
