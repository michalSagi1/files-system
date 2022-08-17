import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useContext, useState } from "react";

import PathContext from "./PathContext";
import iconEdit from './icons/edit.png'


const PopupRenameFile = ({ fileName, setChange }) => {
    //   const { snackbarFunc } = useContext(SnackbarContext);
    const { path, setPath } = useContext(PathContext);
    const [show, setShow] = useState(false);
    const [newFileName, setNewFileName] = useState("")




    const renameFile = async () => {
        console.log(fileName);

        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fileNameOld: fileName,
                fileNameNew: newFileName,
                path
            }),
        };
        const res = await fetch(
            `http://localhost:3000/file/root`,
            requestOptions
        );
        // const data = await res.json();
        setChange(newFileName);
        handleClose();
        console.log(fileName, newFileName, path);
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
                    <Modal.Title>Rename File</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    enter new name:
                    <br />
                    <form>
                        <input
                            className="button_add"
                            placeholder="Name file..."
                            value={newFileName}
                            onChange={(e) => setNewFileName(e.target.value)}
                        ></input>
                    </form>
                    Must add "." and then the file type
                </Modal.Body>
                <Modal.Footer>
                    <Button className="button_add" variant="secondary" onClick={renameFile}>
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
