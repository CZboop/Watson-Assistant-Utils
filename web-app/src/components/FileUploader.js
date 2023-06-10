import React from 'react';
import {useState} from 'react';
import './FileUploader.css';

function FileUploader() {
    const [file, setFile] = useState();

    const handleFile = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            setFile(e.target.result);
        };
    }

  return (
    <div className='FileUploader'>
        <h3>Upload JSON File</h3>
        <form className='UploadForm'>
            <input className="FileInput" type="file" name="FileInput" onChange={handleFile}/>

        </form>
    </div>
  )
}

export default FileUploader;