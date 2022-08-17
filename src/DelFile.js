import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useContext, useState } from "react";
import iconDelete from './icons/delete.png'

import PathContext from "./PathContext";

const PopupDelFile = ({ fileName, setChange }) => {
    //   const { snackbarFunc } = useContext(SnackbarContext);
    const { path, setPath } = useContext(PathContext);
    const [show, setShow] = useState(false);



    const delFile = async () => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fileName,
                path
            }),
        };
        const res = await fetch(
            `http://localhost:3000/file/root`,
            requestOptions
        );
        console.log(fileName);
        console.log(path);

        setChange(fileName);
        handleClose();
        // snackbarFunc("Song deleted");
    };

    const handleClose = async () => {
        setShow(false);
    };
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="del" onClick={handleShow}>
                <img src={iconDelete} alt={iconDelete} className="delete" />
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete File</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <br />
                    Do you want delete the file {fileName} ?
                </Modal.Body>
                <Modal.Footer>
                    <Button className="button_add" variant="secondary" onClick={delFile}>
                        yes{" "}
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PopupDelFile;
