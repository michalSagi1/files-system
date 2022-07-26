import { useState, useContext } from 'react';
import PathContext from '../../PathContext';
import './creatFile.css'
import iconFile from '../../icons/addFile.png'
import iconFileUp from '../../icons/upload.png'



const axios = require('axios').default;



function Form({ setChange }) {

  const [file, setFile] = useState({ fileName: "", size: "", type: "" });
  const { path } = useContext(PathContext);
  const [getFile, setGetFile] = useState(false)
  const [error, setError] = useState(false)




  const onSubmit = async (e) => {
    e.preventDefault();

    let bodyFormData = new FormData();

    bodyFormData.append('fileName', e.target.fileInput.files[0]);
    console.dir(e.target.fileInput.files[0])

    axios({
      method: "POST",
      url: `http://localhost:3000/file/root/?path=${path}`,
      data:
        bodyFormData,
      // name: file.fileName,
      // size: file.size,
      // dir: "/test"


      headers: { "Content-Type": "multipart/form-data" },

    })
      .then(function (response) {
        //handle success
        if (response.status == 200) {
          setGetFile(false)
          console.log("success", response);
          setChange(file.fileName)
        }

      })
      .catch(function (response) {
        setError(true)

        //handle error
        console.log(response);
      });

  }





  const onChangeHandler = (e) => {
    const fileSize = (e.target.files[0].size / 1000) + "KB";
    console.log(e.target.files[0]);

    setFile((current) => {
      return {
        ...current,
        fileName: e.target.files[0].name,
        size: fileSize,
        type: e.target.files[0].type
      }
    });
    setGetFile(true)
  }

  return (
    <div className="form">
      <form onSubmit={onSubmit}>
        <div className='add'>
          <label for="fileInput">
            <img src={iconFile} alt={iconFile} className="addFile" />
            <input id="fileInput" type="file" onChange={(e) => { onChangeHandler(e); setError(false) }} />
          </label>
        </div>
        {getFile &&
          <div className='information'>
            <b>File Name:</b> {file.fileName}<br />
            {/* <b>File Size:</b> {file.size}<br />
          <b>File Type:</b> {file.type} */}
            {error &&
              <div className='errormessage'>this file alredy exists</div>
            }
          </div>
        }
        {getFile &&
          <div className='up'>

            <button className='btnadd'>
              <img src={iconFileUp} alt={iconFileUp} className="upload" />
            </button>
          </div>
        }

      </form>


    </div>


  )
}

export default Form;