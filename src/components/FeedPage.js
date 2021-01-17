import React, { Component } from "react"

import { Container } from "./common/Container"
import { WhiteCard } from "./common/WhiteCard"


export class FeedPage extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const searchDate = new Date(2020, 11, 16, 23, 45)
        const targetDict = {
            VK: 801283,
            Dailymotion: 57924,
            Vimeo: 895675
        }

        return (
            <Container>
                <WhiteCard
                    date={searchDate}
                    title={'NBCU'}
                    status={'Complete'}
                    titlesCount={634674}
                    targets={targetDict}
                />
            </Container>
        )
    }
}

