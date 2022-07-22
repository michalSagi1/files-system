// import React from 'react'
// import Button from 'react-bootstrap/Button';
// import { useState } from 'react';
// const axios = require('axios').default;



// function CreatFile() {
//   const [file, setFile] = useState({ fileName: "", size: "", type: "" });

//   const upFile = (e) => {
//     e.preventDefault();
//     let bodyFormData = new FormData();
//     bodyFormData.append('fileName', e.target.fileInput.files[0]);
//     axios({
//       method: "post",
//       url: "http://localhost:3000/file/root/",
//       data: bodyFormData,
//       headers: { "Content-Type": "multipart/form-data" },
//     })
//       .then(function (response) {
//         //handle success
//         console.log(response);
//       })
//       .catch(function (response) {
//         //handle error
//         console.log(response);
//       });
//   }

//   const onChangeHandler = (e) => {
//     const fileSize = (e.target.files[0].size / 1000) + "KB";

//     setFile((current) => {
//       return {
//         ...current,
//         fileName: e.target.files[0].name,
//         size: fileSize,
//         type: e.target.files[0].types
//       }
//     });
//   }
//   return (
//     <div>
//       <form onSubmit={upFile}>
//         <input name="fileInput" type="file" onChange={onChangeHandler}>
//         </input>
//         <Button variant="primary" onClick={upFile}>New File </Button>
//       </form>
//     </div>
//   )

// }

// export default CreatFile;

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
const axios = require('axios').default;



function Form() {

  const [file, setFile] = useState({ fileName: "", size: "", type: "" });


  const onSubmit = (e) => {
    e.preventDefault();

    let bodyFormData = new FormData();

    bodyFormData.append('fileName', e.target.fileInput.files[0]);
    // console.dir(e.target.fileInput)

    axios({
      method: "post",
      url: "http://localhost:3000/file/root/",
      data: {
        bodyFormData,
        name: file.fileName,
        size: file.size,
        type: file.type,
        dir: "/test"
      },

      headers: { "Content-Type": "multipart/form-data" },

    })
      .then((e) => {
        console.log("success", e);
      })
      .catch((e) => {
        console.log(e);
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
  }

  return (
    <div className="form">
      <form onSubmit={onSubmit}>
        <input name="fileInput" type="file" onChange={onChangeHandler}>
        </input>
        <button><Button variant="primary" >New File </Button></button>
        <h3>File Name: {file.fileName} </h3>
        <h3> File Size: {file.size} </h3>
        <h3> File Type: {file.type}</h3>
      </form>
    </div>
  )
}

export default Form;