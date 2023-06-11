import React from 'react';
import {useState, useEffect} from 'react';
import './FileUploader.css';

function FileUploader() {
    const [files, setFiles] = useState(null);
    
    const handleFile = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            let fileUploaded = e.target.result;
            setFiles(fileUploaded);
        };
    }
    useEffect(() => {
        if (files != null && files != undefined){
        sessionStorage.setItem('files', files);
    }
    }, [files])

  return (
    <div className='FileUploader'>
        <h3>Upload JSON File</h3>
        <div className='UploadForm'>
            <input className="FileInput" type="file" name="FileInput" onChange={handleFile}/>
            
        </div>
        <form>
        <input type="submit" value="Submit" className="submit-file"/>
        </form>
    </div>
  )
}

export default FileUploader;