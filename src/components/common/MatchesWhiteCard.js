import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

import Searchfilter from './searchFilter'


const container = {
    maxWidth: '41em',
    marginTop: '1em',
    borderRadius: '4px',
    padding: '1em 2em 1em 2em',
    background: 'rgb(253,254,255)'
}

const searchString = {
    marginBottom: 0,
    display: 'inline-block'
}

const hideButton = {
    float: 'right',
    width: '32px',
    textAlign: 'center'
}

export class MatchesWhiteCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isCollapsed: false
        }

        this.collapseSearchTool = this.collapseSearchTool.bind(this);
    }

    collapseSearchTool() {
        this.setState(isCollapsed => ({
            isCollapsed: !this.state.isCollapsed
        }))
    }

    render() {
        return (
            <div className="container" style={container}>
                <div className="row">
                    <div className="col">

                        <button onClick={this.collapseSearchTool} className="btn btn-primary btn-sm d-none" type="button" style={hideButton}>
                            <FontAwesomeIcon icon={this.state.isCollapsed ? faChevronDown : faChevronUp} className="d-table-row d-xl-flex" />
                        </button>
                    </div>
                </div>
                <div className="collapse show" id="collapse-1" ref="collapse-1">
                    <Searchfilter />

                </div>
            </div>
        )
    }
}