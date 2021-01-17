import React, { Component } from "react";


const UserContext = React.createContext()

export const UploadContext = React.createContext();

export function UploadContextProvider(props) {
    const [isUploaded, setIsUploaded] = React.useState(false);
    return (
        <UploadContext.Provider value={[isUploaded, setIsUploaded]}>
            {props.children}
        </UploadContext.Provider>
    );
}

class UserContextProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: props.login || '',
            isAuthed: props.isAuthed || false
        }

        this.setAuthData = this.setAuthData.bind(this)
    }

    setAuthData(isAuthed, login = '') {
        if (isAuthed) {
            this.setState({
                isAuthed: true,
                login: login
            })
        } else {
            this.setState({
                isAuthed: false,
                login: ''
            })
        }
    }

    render() {
        return (
            <UserContext.Provider
                value={{ login: this.state.login, isAuthed: this.state.isAuthed, setAuthData: this.setAuthData }}
            >
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

export { UserContext, UserContextProvider }