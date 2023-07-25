import React from 'react';
import {useState, useEffect} from 'react';
import './FileUploader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons'


function FileUploader() {
    const [files, setFiles] = useState(null);
    const [fileName, setFileName] = useState("");
    
    const handleFile = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        let fileName = e.target.files[0].name;
        // console.log(fileName);
        fileReader.onload = e => {
            let fileUploaded = e.target.result;
            setFiles(fileUploaded);
            setFileName(fileName);
        };
    }
    useEffect(() => {
        if (files != null && files !== undefined){
        sessionStorage.setItem('files', files);
    }
    }, [files])

  return (
    <div className='FileUploader'>
        <h3>Upload JSON File</h3>
        <div className='UploadForm'>
            <input className="FileInput" type="file" name="FileInput" onChange={handleFile} id="uploadFile"/>
            <label htmlFor="uploadFile" className="fileUploaderButton">Upload File<FontAwesomeIcon className="uploadIcon" icon={faUpload} /></label>
            {
                fileName !== "" ?
                <p id='uploaded-file-label'>Selected File: {fileName}</p>
                :
                <p></p>
            }
        </div>
        <form>
        <input type="submit" value="Submit" className="submit-file"/>
        </form>
    </div>
  )
}

export default FileUploader;