import React, { Component } from 'react'

import { API } from '../API'
import { AutocompleteDropdown } from './AutocompleteDropdown'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons'


const jumbotron = {
    padding: '1em 1em 0 1em',
    background: 'rgb(223,232,238)',
    marginBottom: '0',
}

const spacer = {
    height: '1em'
}

const toolButton = {
    width: '28px'
}

const iconMarginRight = {
    marginRight: '5px'
}

class CheckBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isChecked: this.props.checked ? true : false
        }

        this.checkBoxChoose = this.checkBoxChoose.bind(this)
    }

    checkBoxChoose() {
        const newState = !this.state.isChecked
        this.setState({
            isChecked: newState
        })

        this.props.onStateChange(
            this.props.id,
            newState
        )
    }

    render() {
        return (
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id={ this.props.id } onChange={ this.checkBoxChoose} />
                <label className="form-check-label" htmlFor={ this.props.id }>{ this.props.label }</label>
            </div>
        )
    }
}

class CheckBoxGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            choosenIds: new Set()
        }

        this.updateChoosenIds = this.updateChoosenIds.bind(this)
    }

    updateChoosenIds(id, isChecked) {
        isChecked
            ? this.state.choosenIds.add(id)
            : this.state.choosenIds.delete(id)

        this.setState({
            choosenIds: new Set(this.state.choosenIds)
        })

        this.props.onChange(collections, choosenIds)
    }

    render() {
        let checkBoxes = []
        this.props.items.forEach((item, i) => {
            const checkBoxId = this.props.title + "-checkbox-" + i
            checkBoxes.push(
                <CheckBox id={ checkBoxId } label={ item } key={ checkBoxId } onStateChange={ this.updateChoosenIds } />
            )
        })

        return (
            <div><span>{ this.props.title + ':' }<br /></span>
                { checkBoxes }
            </div>
        )
    }
}

function TitleItem(props) {
    return (
        <div className="btn-group m-1" role="group">
            <button className="btn btn-light btn-sm text-break" type="button">{ props.title }<br /></button>
            <button className="btn btn-light btn-sm" type="button"><span style={ iconMarginRight } ><FontAwesomeIcon icon={ faTimes } className="d-table-row d-xl-flex" /></span></button>
        </div>
    )
}

function TitleList(props) {
    let titleList = []
    props.titleList.sort().forEach((title, i) => {
        titleList.push(<TitleItem  title={ title } key={ 'title-' + i } />)
    })

    return (
        <div className="row">
            <div className="col">
                { titleList }
            </div>
        </div>
    )
}

class TitleInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchString: '',
            choosenTitles: [],
            collections: [],
            typingTimer: undefined
        }

        this.keyUp = this.keyUp.bind(this)
        this.keyDown = this.keyDown.bind(this);
    }

    refreshAutocomlete() {
        API.searchComplete(
            this.state.searchString,
            this.state.collections
        )
        .then(
            response => {
                alert('Got it!' + response)
            }
        )
    }

    keyUp(event) {
        const doneTypingInterval = 2000
        const searchString = event.target.value

        if (searchString.length > 2) {
            this.setState({ typingTimer: clearTimeout(this.state.typingTimer) })
            this.setState({ typingTimer: setTimeout( () => { this.doneTyping(searchString) }, doneTypingInterval) })
        }
    }

    keyDown() {
        this.setState({ typingTimer: clearTimeout(this.state.typingTimer) })
    }

    doneTyping(searchString) {
        API.searchComplete(searchString, this.state.collections)
        .then(
            response => {
                console.log(response.data)
            }
        )
    }

    render() {
        return (
            <div id="title-input">
                <div className="row">
                    <div className="col">
                        <div className="input-group input-group-sm">
                            <div className="input-group-prepend"><span className="input-group-text">Title</span></div><input className="form-control" onKeyUp={ this.keyUp } onKeyDown={ this.keyDown } type="text" />
                            <div className="input-group-append"><button className="btn btn-primary" type="button" style={ toolButton }><span><FontAwesomeIcon icon={ faPlus } className="d-table-row d-xl-flex" /></span></button></div>
                        </div>
                    </div>
                </div>
                <AutocompleteDropdown />
                <TitleList titleList={ this.state.choosenTitles } />
            </div>
        )
    }
}

export class SearchTool extends Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.onCollectionsChange = this.onCollectionsChange.bind(this)
    }

    onCollectionsChange(collections) {
        this.setState({
            collections: collections
        })
    }

    render() {
        return (
            <div className="jumbotron mt-3" style={ jumbotron }>
                <div className="row">
                    <div className="col">
                        <CheckBoxGroup title='Collection' items={ this.props.collections } onChange={ this.onCollectionsChange } />
                    </div>
                    <div className="col">
                        <CheckBoxGroup title='Target' items={ this.props.targets }/>
                    </div>
                </div>
                <div style={ spacer }></div>
                <TitleInput titleList={ ['Conspiracy.1930.mp4', 'Debbie.Does.Dallas.1978.mp4', 'Glen.or.Glenda.1953.avi', 'Superman 3', 'Superman 4'] } />
                <div style={ spacer }></div>
            <div className="row">
                <div className="col"><button className="btn btn-primary btn-sm ml-1 mb-3" type="button"><span style={ iconMarginRight } ><FontAwesomeIcon icon={ faCheck } /></span>Select all</button><button className="btn btn-primary btn-sm ml-1 mb-3" type="button"><span style={ iconMarginRight } ><FontAwesomeIcon icon={ faTimes } /></span>Clear all</button></div>
                <div
                    className="col text-right"><button className="btn btn-success btn-sm mb-3" type="button"><span style={ iconMarginRight } ><FontAwesomeIcon icon={ faSearch } /></span>Search</button></div>
                </div>
            </div>
        )
    }
}