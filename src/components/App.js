import React, { Component } from "react"
import { Switch, Route } from 'react-router-dom'

import { API } from "./API"
import { MainBody } from "./common/MainBody"
import { LoginPage } from "./LoginPage"
import { FeedPage } from "./FeedPage"
import { MatchesDb } from "./MatchesDb"
import { UserContext } from "../UserContextProvider"
import Upload from "./Uploads.js"

function RouteMap(props) {
    return (
        <UserContext.Consumer>
            {context => (
                context.isAuthed
                    ? (<Switch>
                        <Route exact path='/' component={FeedPage}></Route>
                        <Route exact path='/login' component={LoginPage}></Route>
                        <Route exact path='/upload' component={Upload}></Route>

                        <Route exact path='/feed' component={FeedPage}></Route>
                        <Route exact path='/matches-db' component={MatchesDb}></Route>

                    </Switch>)
                    : (<Switch>
                        <Route path='/' component={LoginPage}></Route>
                    </Switch>)
            )}
        </UserContext.Consumer>
    )
}

class MainContent extends Component {
    constructor(props) {
        super(props)
        this.state = {}

        API.isAuthed()
            .then(
                response => {
                    this.context.setAuthData(true, response.data.username)
                }
            )
    }

    render() {
        return (
            <RouteMap />
        )
    }
}

const App = () => (
    <div className='app'>
        <MainBody />
        <MainContent />
    </div>
)

MainContent.contextType = UserContext

export default App