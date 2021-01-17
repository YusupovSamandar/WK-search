import React, { Component } from 'react'
import DropZone from './common/Dropzone.js'
import { Container } from "./common/Container"
import "./assets/css/upload.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function Uploads() {
    console.log('it wurks')
    return (
        <div>

            <Container>
                <div className="container">
                    <p className="title">Welcome to your own search request tool
                    There is no search request yet
                    Let's create your first step in WK Search </p>
                    <div className='row' >
                        <button className="btn  upload btn-primary " type="button"><FontAwesomeIcon icon={faSearch} /> Search Matches</button>
                    </div>
                </div>

                <div className="content">
                    <DropZone /></div>


            </Container>
        </div >
    )
}

export default Uploads
