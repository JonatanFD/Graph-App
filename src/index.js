import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppContextProvider } from "./context/AppContext";
import { ModalContextProvider } from "./context/ModalContext";
import { Modal } from "./layers/Modal/Modal";
import { ToasterContextProvider } from "./context/ToasterContext";
import Toaster from "./layers/Toaster/Toaster";
import { InterfaceContextProvider } from "./context/InterfaceContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AppContextProvider>
        <ToasterContextProvider>
            <InterfaceContextProvider>
                <ModalContextProvider>
                    <App />
                    <Modal />
                    <Toaster />
                </ModalContextProvider>
            </InterfaceContextProvider>
        </ToasterContextProvider>
    </AppContextProvider>
);
