import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider, UploadContextProvider } from "./UserContextProvider";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
    (
        <UploadContextProvider>
            <UserContextProvider value={{ user: '', isAuthed: false }}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </UserContextProvider>
        </UploadContextProvider>
    ), document.getElementById('app')
)