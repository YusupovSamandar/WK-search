import React from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'

import { numberWithCommas } from "./Formatter"


const jumbotronStyle = {
    marginTop: '1em',
    padding: '1em',
    background: 'rgb(253,254,255)'
}

const leftStyle = {
    textAlign: 'left'
}

const rightColorStyle = {
    textAlign: 'right',
    color: '#4ad862'
}

const paddingRightStyle = {
    paddingRight: '7px'
}

function WhiteCardDate(props) {
    const date = new Date(props.date)
    const monthList = [
        'January', 'February', 'March',
        'April', 'May', 'June',
        'July', 'August', 'September',
        'October', 'November', 'December'
    ]

    let whiteCardDate = (<p style={ leftStyle }></p>)
    if (date instanceof Date) {
        whiteCardDate = (
            <p style={ leftStyle }>
                <strong>{ monthList[date.getMonth()] + ' ' + date.getDay() }</strong>, <strong>{ date.getFullYear() }</strong>, { date.getHours() + ':' + date.getMinutes() } (UTC+{ date.getTimezoneOffset() / 60 * (-1) })<br />
            </p>
        )
    }

    return whiteCardDate
}

export function WhiteCard(props) {
    let targetList = []

    // {'VK': 656745, 'Vimeo': 45863...}
    if (props.targets) {
        let targetsSorted = []
        for(let key in props.targets) {
            targetsSorted[targetsSorted.length] = key
        }
        targetsSorted.sort()
        let targetKey = 0
        targetsSorted.forEach(target => {
            targetList.push(<span key={ targetKey } className="d-inline-block" style={ paddingRightStyle }><strong>{ target } </strong>{ numberWithCommas(props.targets[target]) } <br /></span>)
            targetKey++
        })
    }

    return (
        <div className="jumbotron" style={ jumbotronStyle }>
            <div className="row">
                <div className="col col-9">
                    <WhiteCardDate date={ props.date }/>
                </div>
                <div className="col col-3">
                    <p style={ rightColorStyle }>{ props.status || '' }<br /></p>
                </div>
            </div>
            <h1 className="text-center">{ props.title || '' }</h1>
            <div className="row pb-2">
                <div className="col text-right col-2"><span className="d-inline-block">Matches:<br /></span></div>
                <div className="col text-left col-10">
                    <span className="d-inline-block" style={ paddingRightStyle }>
                        { targetList }
                    </span>
                </div>
            </div>
            <div className="row">
                <div className="col text-right col-2"><span className="d-inline-block">Titles:<br /></span></div>
                <div className="col text-left col-7"><span><strong>{ numberWithCommas(props.titlesCount) || '' }</strong><br /></span></div>
                <div className="col text-right align-self-end col-3">
                    <a className="btn btn-primary" role="button">Results <FontAwesomeIcon icon={faCaretRight} /></a>
                </div>
            </div>
        </div>
    )
}