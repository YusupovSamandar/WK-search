import React, { Component } from "react"

import { Navbar } from "./Navbar.js"
import "../assets/css/body.css"


export class MainBody extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div id='MainBody'>
                <Navbar />
            </div>
        )
    }
}
