import React, { Component } from 'react'

import { API } from '../API'

import { numberWithCommas } from './Formatter'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'


const fpCountStyle = {
    color: '#8f8f8f',
    fontSize: '12px'
}

export class DropdownItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            backgroundColor: '#ffffff',
            cursor: 'default',
            data: undefined
        }

        this.setWhiteColor = this.setWhiteColor.bind(this)
        this.setGrayColor = this.setGrayColor.bind(this)
    }

    setWhiteColor() {
        this.setState({
            backgroundColor: '#ffffff',
            cursor: 'default'
        })
    }

    setGrayColor() {
        this.setState({
            backgroundColor: '#f1f7fc',
            cursor: 'pointer'
        })
    }

    render() {
        const fpCount = ( <span style={ fpCountStyle }> { this.props.fpCount ? '(' + numberWithCommas(this.props.fpCount) + ' fingerprints)' : '' } </span> )
        const goRight = this.props.fpCount ? ( <FontAwesomeIcon className="float-right pt-1 mt-1" icon={ faChevronRight } /> ) : ( <span></span> )

        return (
            <tr>
                <td style={{background: this.state.backgroundColor, cursor: this.state.cursor}}
                    onMouseEnter={ this.setGrayColor }
                    onMouseLeave={ this.setWhiteColor } >
                    { this.props.title }
                    { fpCount }
                    { goRight }
                </td>
            </tr>
        )
    }
}

export class AutocompleteDropdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            left: undefined,
            right: []
        }
    }

    render() {
        return (
            <table className="table table-sm mt-1">
                <tbody>
                    <DropdownItem title='100' fpCount={ 8473 } />
                    <DropdownItem title='1001' />
                    <DropdownItem title='1002' />
                    <DropdownItem title='1003' fpCount={ 8473 } />
                </tbody>
            </table>
        )
    }
}
