import React from "react"
import ReactDOM from "react-dom"

import { BrowserRouter } from "react-router-dom"

import { UserContextProvider } from "./UserContextProvider"

import App from "./components/App"

import "bootstrap/dist/css/bootstrap.css"


ReactDOM.render(
    (
        <UserContextProvider value={ {user: '', isAuthed: false} }>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </UserContextProvider>
    ), document.getElementById('app')
)