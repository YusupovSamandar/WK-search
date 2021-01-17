import React, { Component } from 'react'


const breakWordStyle = {
    wordWrap: 'break-word'
}

const centerStyle = {
    textAlign: 'center'
}

function MatchesTableCell(props) {
    const urlPattern = new RegExp(
        '^(https?:\\/\\/)?'+                                // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+                      // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+                  // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+                         // query string
        '(\\#[-a-z\\d_]*)?$','i'                            // fragment locator
    )

    let cell = <td className="text-center text-break">{ props.link }</td>
    if (!!urlPattern.test(props.cell)) {
        cell = <td className="text-center text-break"><a href={ props.cell }>{ props.cell }</a></td>
    }

    return cell
}

function TableNavButtons(props) {
    return (
        <div className="row">
            <div className="col" style={ centerStyle }>
                <div role="group" className="btn-group">
                    <button className="btn btn-secondary btn-sm" type="button">&lt;</button>
                    <button className="btn btn-primary btn-sm" type="button">1</button>
                    <button className="btn btn-light btn-sm" type="button">2</button>
                    <button className="btn btn-light btn-sm" type="button">3</button>
                    <button className="btn btn-light btn-sm" type="button">...</button>
                    <button className="btn btn-light btn-sm" type="button">9</button>
                    <button className="btn btn-light btn-sm" type="button">10</button>
                    <button className="btn btn-light btn-sm" type="button">11</button>
                    <button className="btn btn-primary btn-sm" type="button">&gt;</button>
                </div>
            </div>
        </div>
    )
}

function MatchesTableRow(props) {
    let cells = []

    props.cells.forEach(cell => {
        cells.push(
            <MatchesTableCell cell={ cell } />
        )
    });

    return (
        <tr style={ breakWordStyle }>{ cells }</tr>
    )
}

export class MatchesTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 0
        }
    }

    render() {
        let headers = []
        this.props.headers.forEach((header, i) => {
            headers.push(<th className="text-center" key={ 'tableHeader' + i } >{ header }</th>)
        })

        let rows = []
        this.props.rows.forEach((row, i) => {
            let cells = []
            row.forEach((cell, j) => {
                cells.push(<td className="text-center text-break" key={ i + 'tableCell' + j }>{ cell }</td>)
            })

            rows.push(
                <tr style={ breakWordStyle } key={ 'tableRow' + i } >{ cells }</tr>
            )
        })

        return (
            <div>
                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>{ headers }</tr>
                        </thead>
                        <tbody>
                            { rows }
                        </tbody>
                    </table>
                </div>
                <TableNavButtons/>
            </div>
        )
    }
}