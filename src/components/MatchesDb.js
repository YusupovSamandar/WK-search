import React, { Component } from 'react'

import { MatchesWhiteCard } from './common/MatchesWhiteCard'
import { Container } from './common/Container'
import { MatchesTable } from './common/MatchesTable'
import { numberWithCommas, scoreNumber, keyArrayFromDict } from './common/Formatter'

import { API } from './API'


const matchesInfoStyle = {
    fontSize: '18px'
}

export class MatchesDb extends Component {
    updateCheckboxes() {
        API.getCollectionsTargets().then(
            response => {
                this.setState({
                    collectionsObject: response.data.collections,
                    collections: keyArrayFromDict(response.data.collections, 'title'),
                    targetsObject: response.data.targets,
                    targets: keyArrayFromDict(response.data.targets, 'title')
                })
            }
        )
    }

    constructor(props) {
        super(props)
        this.state = {
            collections: [],
            targets: []
        }

        this.updateCheckboxes()
    }

    render() {
        const headers = ['#', 'Title', 'Url', 'Video name', 'Views', 'Score']
        const rows = [
            ['1', 'Conspiracy.1930.mp4', 'https://www.dailymotion.com/video/x7wyv4s?playlist=x6lgtp', 'Ведьмак 1 серия 1 сезон / Ведьмак 1 сезон 1 серия / Witcher 1 серия / TheWitcher / Ведьмак первый сезон /', numberWithCommas(5454365), scoreNumber('0.635643')],
            ['2', 'Conspiracy.1930.mp4', 'https://www.dailymotion.com/video/x7wyv4s?playlist=x6lgtp', 'Ведьмак Сереал 1 серия', numberWithCommas(74365), scoreNumber('0.7')],
            ['3', 'Conspiracy.1930.mp4', 'https://www.dailymotion.com/video/x7wyv4s?playlist=x6lgtp', 'Ведьмак 1 серия 1 сезон / Ведьмак 1 сезон 1 серия / Witcher 1 серия / TheWitcher / Ведьмак первый сезон /', numberWithCommas(5454365), scoreNumber('0.635643')],
            ['4', 'Conspiracy.1930.mp4', 'https://www.dailymotion.com/video/x7wyv4s?playlist=x6lgtp', 'Ведьмак Сереал 1 серия', numberWithCommas(74365), scoreNumber('0.7')],
            ['5', 'Conspiracy.1930.mp4', 'https://www.dailymotion.com/video/x7wyv4s?playlist=x6lgtp', 'Ведьмак 1 серия 1 сезон / Ведьмак 1 сезон 1 серия / Witcher 1 серия / TheWitcher / Ведьмак первый сезон /', numberWithCommas(5454365), scoreNumber('0.635643')],
        ]

        return (
            <div>
                <MatchesWhiteCard collections={this.state.collections} targets={this.state.targets} />
                <Container>
                    <h4 className="text-break"><strong>NBCU</strong><br /></h4>
                    <h5 className="pt-2"><strong>Dailymotion </strong><br /></h5>
                    <div className="row pb-2">
                        <div className="col"><span style={matchesInfoStyle}>Matches: 534<br /></span></div>
                        <div className="col"><span style={matchesInfoStyle}>Views: 6,567,456<br /></span></div>
                    </div>
                    <MatchesTable headers={headers} rows={rows} />
                </Container>
            </div>
        )
    }
}