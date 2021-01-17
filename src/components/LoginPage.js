import React, { Component } from "react"

import { API } from "./API.js"
import { UserContext } from "../UserContextProvider"

import "./assets/css/Login-Form-Clean.css"


const loginCleanStyle = {
    background: 'transparent',
}

const loginFormStyle = {
    background: 'rgba(255,255,255,0.51)'
}

const loginH3Style = {
    paddingBottom: '1em',
    color: '#222222'
}

const loginButtonStyle = {
    background: '#2980ef'
}

export class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: '',
            password: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleLoginChange = this.handleLoginChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }

    handleLoginChange(event) {
        this.setState({ login: event.target.value })
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value })
    }

    handleSubmit(event) {
        API.auth(
            this.state.login,
            this.state.password,
        )
            .then(
                response => {
                    this.context.setAuthData(true, this.state.login)
                    this.props.history.push('/feed')
                }
            )
            .catch(
                error => {
                    alert(error.message + '\n' + error.response.data.detail)
                }
            )


        event.preventDefault()
    }

    render() {
        return (
            <div className="login-clean" style={loginCleanStyle}>
                <form method="post" style={loginFormStyle} onSubmit={this.handleSubmit}>
                    <h3 className="text-break text-center" style={loginH3Style}><strong>WEBKONTROL</strong><br />Search</h3>
                    <div className="form-group"><input onChange={this.handleLoginChange} className="form-control" type="text" name="Login" placeholder="Login" /></div>
                    <div className="form-group"><input onChange={this.handlePasswordChange} className="form-control" type="password" name="password" placeholder="Password" /></div>
                    <div className="form-group"><button className="btn btn-primary btn-block" type="submit" style={loginButtonStyle}>Log In</button></div>
                </form>
            </div>
        )
    }
}

LoginPage.contextType = UserContext