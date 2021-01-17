import Cookies from 'js-cookie'

const axios = require('axios')


function getCsrfToken() {
    return Cookies.get('csrftoken')
}

export class API {
    constructor() {}

    static auth(login, password) {
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
        axios.defaults.headers.common['X-csrftoken'] = getCsrfToken()

        const username = login

        return axios.post( '/api/login',
            { username, password }
        )
    }

    static logout() {
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
        axios.defaults.headers.common['X-csrftoken'] = getCsrfToken()

        return axios.post( '/api/logout' )
    }

    static isAuthed() {
        return axios.get( '/api/user',
            { withCredentials: true }
        )
    }

    static getCollectionsTargets() {
        return axios.get( '/api/user/access' )
    }

    static searchComplete(searchString, collections){
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
        axios.defaults.headers.common['X-csrftoken'] = getCsrfToken()

        const query = searchString
        const postData = { query, collections }

        return axios.post( '/api/complete' ,
            postData
        )
    }

}

