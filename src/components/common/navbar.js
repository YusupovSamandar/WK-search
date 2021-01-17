import React, { Component } from "react"
import { NavLink } from 'react-router-dom'

import { API } from "../API"
import { UserContext } from "../../UserContextProvider"

import "../assets/css/Navigation-with-Button.css"


const navbarStyle = {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'normal'
}

const navbarTextStyle = {
    padding: '0 1em'
}

const navbarLogOutStyle = {
    background: '#2980ef'
}

export class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.handleLogOut = this.handleLogOut.bind(this)
    }

    handleLogOut(event) {
        API.logout()
        .then(
            response => this.context.setAuthData(false)
        )
        .catch(
            error => {
                alert(error.message + '\n' + error.response.data.detail)
            }
        )
    }

    render() {
        return (
            <nav className="navbar navbar-light navbar-expand-md navigation-clean-button">
                <div className="container">
                    <NavLink className="navbar-brand" to="/" style={ navbarStyle }><strong>WK</strong> Search</NavLink>
                    <button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
                    <UserContext.Consumer>
                        {context => (
                            context.isAuthed
                            ? (
                                <div className="collapse navbar-collapse" id="navcol-1">
                                    <ul className="nav navbar-nav mr-auto">
                                        <li className="nav-item"><NavLink className="nav-link" to="/feed">My Search</NavLink></li>
                                        <li className="nav-item"><NavLink className="nav-link" to="/matches-db">Matches DB</NavLink></li>
                                    </ul>
                                    <span className="navbar-text" style={ navbarTextStyle }>{ context.login }</span>
                                    <span className="navbar-text actions">
                                        <NavLink onClick={ this.handleLogOut } className="btn btn-light action-button" to="/login" role="button" style={ navbarLogOutStyle }>Log out</NavLink>
                                    </span>
                                </div>
                            )
                            : (
                                <div className="collapse navbar-collapse" id="navcol-1"></div>
                            )
                        )}
                    </UserContext.Consumer>
                </div>
            </nav>
        )
    }
}

Navbar.contextType = UserContext