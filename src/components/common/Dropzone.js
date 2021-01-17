import React, { useState, useEffect, useRef, useContext } from 'react';
import "../assets/css/dropzone.css"
import axios from 'axios';
import { UploadContext } from "./../../UserContextProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
const DropZone = () => {
    const [validFiles, setValidFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [unsupportedFiles, setUnsupportedFiles] = useState([]);
    const fileInputRef = useRef();
    const uploadModalRef = useRef();
    const uploadRef = useRef();
    const progressRef = useRef();
    const [isUploaded, setIsUploaded] = useContext(UploadContext);
    const dragOver = (e) => {
        e.preventDefault();
    }

    const dragEnter = (e) => {
        e.preventDefault();
    }

    const dragLeave = (e) => {
        e.preventDefault();
    }


    const handleFiles = (files) => {
        for (let i = 0; i < files.length; i++) {
            if (validateFile(files[i])) {
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
            } else {
                files[i]['invalid'] = true;
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
                setErrorMessage('File type not permitted');
                setUnsupportedFiles(prevArray => [...prevArray, files[i]]);

            }
        }
    }
    const fileSize = (size) => {
        if (size === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(size) / Math.log(k));
        return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    const fileType = (fileName) => {
        return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
    }
    const fileDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length) {
            handleFiles(files);
        }
    }

    const validateFile = (file) => {
        const validTypes = ['video/mp4', 'video/mkv', 'video/avi', 'video/m4a', 'video/mov'];
        if (validTypes.indexOf(file.type) === -1) {
            return false;
        }
        return true;
    }
    useEffect(() => {
        let filteredArray = selectedFiles.reduce((file, current) => {
            const x = file.find(item => item.name === current.name);
            if (!x) {
                return file.concat([current]);
            } else {
                return file;
            }
        }, []);
        setValidFiles([...filteredArray]);

    }, [selectedFiles]);
    const removeFile = (name) => {


        const validFileIndex = validFiles.findIndex(e => e.name === name);
        validFiles.splice(validFileIndex, 1);
        // update validFiles array
        setValidFiles([...validFiles]);
        const selectedFileIndex = selectedFiles.findIndex(e => e.name === name);
        selectedFiles.splice(selectedFileIndex, 1);
        // update selectedFiles array
        setSelectedFiles([...selectedFiles]);
        const unsupportedFileIndex = unsupportedFiles.findIndex(e => e.name === name);
        if (unsupportedFileIndex !== -1) {
            unsupportedFiles.splice(unsupportedFileIndex, 1);
            // update unsupportedFiles array
            setUnsupportedFiles([...unsupportedFiles]);
        }
    }
    const fileInputClicked = () => {
        fileInputRef.current.click();
    }
    const filesSelected = () => {
        if (fileInputRef.current.files.length) {
            handleFiles(fileInputRef.current.files);
        }
    }
    const uploadFiles = () => {
        if (isUploaded) {
            uploadModalRef.current.style.display = 'block';
            uploadRef.current.innerHTML = 'File(s) Uploading...';
            for (let i = 0; i < validFiles.length; i++) {
                const formData = new FormData();
                formData.append('image', validFiles[i]);
                formData.append('key', 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
                axios.post('http://localhost:3000/files', formData, {
                    onUploadProgress: (progressEvent) => {
                        const uploadPercentage = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
                        progressRef.current.innerHTML = `${uploadPercentage}%`;
                        progressRef.current.style.width = `${uploadPercentage}%`;
                        if (uploadPercentage === 100) {
                            uploadRef.current.innerHTML = 'File(s) Uploaded';
                            validFiles.length = 0;
                            setValidFiles([...validFiles]);
                            setSelectedFiles([...validFiles]);
                            setUnsupportedFiles([...validFiles]);
                        }
                    }
                })
                    .catch(() => {
                        uploadRef.current.innerHTML = `<span class="error">Error Uploading File(s)</span>`;
                        progressRef.current.style.backgroundColor = 'red';
                    });
            }
        } else {
            setIsUploaded(prev => !prev);
        }

    }
    const closeUploadModal = () => {
        uploadModalRef.current.style.display = 'none';
    }
    return (
        <>
            <button className="file-upload-btn btn  btn-primary" onClick={() => uploadFiles()}><FontAwesomeIcon icon={faUpload} /> Upload Video </button>
            {isUploaded ? <div className="container" >
                {/* {unsupportedFiles.length === 0 && validFiles.length ? <button className="file-upload-btn btn  btn-primary" onClick={() => uploadFiles()}><FontAwesomeIcon icon={faUpload} /> Upload Video </button> : ''} */}
                {unsupportedFiles.length ? <p>Please remove all unsupported files.</p> : ''}

                <div className="drop-container"
                    onClick={fileInputClicked}
                    onDragOver={dragOver}
                    onDragEnter={dragEnter}
                    onDragLeave={dragLeave}
                    onDrop={fileDrop}
                >
                    <div className="drop-message">
                        <div className="upload-icon"></div>
                                Select up to 10 files or drug here
                              </div>
                    <input
                        ref={fileInputRef}
                        className="file-input"
                        type="file"
                        multiple
                        onChange={filesSelected}
                    />
                    <div className="file-display-container">
                        {
                            validFiles.map((data, i) =>
                                <div className="file-status-bar" key={i}>
                                    <div>
                                        <div className="file-type-logo"></div>


                                        <div className="file-type">{fileType(data.name)}</div>
                                        <span className={`file-name ${data.invalid ? 'file-error' : ''}`}>{data.name}</span>
                                        <span className="file-size">({fileSize(data.size)})</span> {data.invalid && <span className='file-error-message'>({errorMessage})</span>}
                                    </div>
                                    <div className="file-remove" onClick={() => removeFile(data.name)}>X</div>

                                </div>
                            )
                        }
                    </div>

                </div>
                <div className="upload-modal" ref={uploadModalRef}>
                    <div className="overlay"></div>
                    <div className="close" onClick={(() => closeUploadModal())}>X</div>
                    <div className="progress-container">
                        <span ref={uploadRef}></span>
                        <div className="progress">
                            <div className="progress-bar" ref={progressRef}></div>
                        </div>
                    </div>
                </div>
            </div> : <h3>Click above to upload video ↑</h3>}
        </>
    )
}
export default DropZone;