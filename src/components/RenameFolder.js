import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form"
import React, { useContext, useState } from "react";
import iconEdit from '../icons/edit.png'

import PathContext from ".././PathContext";
const axios = require('axios').default;

const PopupRenameFolder = ({ folderName, setChange }) => {
    //   const { snackbarFunc } = useContext(SnackbarContext);
    const { path, setPath } = useContext(PathContext);
    const [show, setShow] = useState(false);
    const [newFolderName, setFolderName] = useState("")
    const [viewMessage, setViewMessage] = useState(false);
    const [message, setMessage] = useState("")




    const renameFolder = async () => {
        console.log(folderName);
        axios({
            method: "PUT",
            url: `http://localhost:3000/folder/root`,
            data:
                JSON.stringify({
                    folderNameOld: folderName,
                    folderNameNew: newFolderName,
                    path
                }),


            headers: { "Content-Type": "application/json" },

        })
            .then(function (response) {
                //handle success
                if (response.status == 200) {
                    handleClose();
                    console.log("success", response);
                    setChange(newFolderName);
                }

            })
            .catch(function (response) {
                //   setError(true)
                setViewMessage(true)
                setMessage(response.response.data.message)
                //handle error
                console.log(response.response.data.message);
            });






        //     const requestOptions = {
        //         method: "PUT",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({
        //             folderNameOld: folderName,
        //             folderNameNew: newFolderName,
        //             path
        //         }),
        //     };
        //     const res = await fetch(
        //         `http://localhost:3000/folder/root`,
        //         requestOptions
        //     );
        //     console.log(res);
        //     // const data = await res.json();
        //     // console.log(data);
        //     // setMessage(data.message)
        //     setChange(newFolderName);
        //     if (res.status === 200) {
        //         handleClose();
        //         // snackbarFunc("Song deleted");

        //     } else {
        //         setViewMessage(true)
        //     }
        //     console.log(folderName, newFolderName, path);
    };


    const handleClose = async () => {
        setShow(false);
    };
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="rename" onClick={handleShow}>
                <img src={iconEdit} alt={iconEdit} className="edit" />
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div className="titlePopup">Rename Folder</div></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label htmlFor="inputnamefolder"></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder='Folder Name...'
                        id="inputnamefolder"
                        aria-describedby="inputnamefolder"
                        value={newFolderName}
                        onChange={(e) => { setFolderName(e.target.value); setViewMessage(false) }}
                    />
                    <br />
                    <Form.Text id="inputnamefolder" muted>
                        ✏️ Enter letters and numbers only
                    </Form.Text>

                    {viewMessage && <div className="textInfo">{message}!<br />
                        {/* <div className="textInfo2">
                            Check if this folder already exists,
                            and note that entered letters and numbers only</div> */}
                        {/* <div className="textInfo">{message}</div> */}
                    </div>}

                </Modal.Body>
                <Modal.Footer>
                    <Button className="button_add btup" variant="secondary" onClick={renameFolder}>
                        update{" "}
                    </Button>
                    <Button variant="secondary" onClick={() => { handleClose(); setViewMessage(false) }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PopupRenameFolder;
