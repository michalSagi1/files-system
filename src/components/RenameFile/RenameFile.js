import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form"

import React, { useContext, useState } from "react";

import PathContext from '../../PathContext';
import iconEdit from '../../icons/edit.png'
import './RenameFile.css'


const PopupRenameFile = ({ fileName, setChange }) => {
    //   const { snackbarFunc } = useContext(SnackbarContext);
    const { path, setPath } = useContext(PathContext);
    const [show, setShow] = useState(false);
    const [newFileName, setNewFileName] = useState("")
    const [viewMessage, setViewMessage] = useState(false);





    const renameFile = async () => {
        console.log(fileName);

        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                fileNameOld: fileName,
                fileNameNew: newFileName + fileName.slice((fileName.lastIndexOf("."))),
                path
            }),
        };
        const res = await fetch(
            `http://localhost:3000/file/root`,
            requestOptions
        );
        console.log(res);
        if (res.status === 200) {
            handleClose();
            setChange(newFileName);
        } else {
            setViewMessage(true)
        }
        console.log(fileName, newFileName + fileName.slice((fileName.lastIndexOf("."))), path);
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
                    <Modal.Title><div className="titlePopup">Rename File</div></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="titlePopup">
                        enter new name:</div>
                    <Form.Label htmlFor="inputnamefile"></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name file..."
                        id="inputnamefile"
                        aria-describedby="inputnamefile"
                        value={newFileName}
                        onChange={(e) => { setNewFileName(e.target.value); setViewMessage(false) }}
                    />
                    <br />
                    <Form.Text id="inputnamefolder" muted>
                        ✏️ Enter letters and numbers only

                    </Form.Text>

                    {viewMessage && <div className="textInfo">It is not possible to change the file name.<br />
                        <div className="textInfo2">
                            Check if file with this name already exists,
                            and note that entered letters and numbers only</div>
                    </div>}

                </Modal.Body>
                <Modal.Footer>
                    <Button className="button_add btup" variant="secondary" onClick={renameFile}>
                        update{" "}
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PopupRenameFile;
