import React, { useEffect, useState } from 'react'
import DropZone from './common/Dropzone.js'
import { Container } from "./common/Container"
import "./assets/css/upload.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

const Uploads = () => {
    console.log('it works');
    const [doesFileExist, setDoesFileExist] = useState(false);

    // useEffect(() => {
    //     fetchApi();
    // }, []);

    // const fetchApi = () => {
    //     axios.get("http://localhost:3000/files").then(({ data }) => {
    //         setDoesFileExist(data.length > 0 ? true : false);
    //     });
    // }

    return (
        <div>

            <Container>
                <div className="container">
                    <p className="title">Welcome to your own search request tool
                    There is no search request yet
                    Let's create your first step in WK Search </p>
                    <div className='row' >
                        <button className="btn  upload btn-primary " disabled={doesFileExist} type="button"><FontAwesomeIcon icon={faSearch} /> Search Matches</button>
                    </div>
                </div>

                <div className="content">
                    <DropZone /></div>


            </Container>
        </div >
    )
}

export default Uploads
