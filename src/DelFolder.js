import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useContext, useState } from "react";
import iconDelete from './icons/delete.png'

import PathContext from "./PathContext";

const PopupDelFolder = ({ folderName, setChange }) => {
    //   const { snackbarFunc } = useContext(SnackbarContext);
    const { path, setPath } = useContext(PathContext);
    const [show, setShow] = useState(false);
    const [viewMessage, setViewMessage] = useState(false);




    const delFolder = async () => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                folderName,
                path
            }),
        };
        const res = await fetch(
            `http://localhost:3000/folder/root`,
            requestOptions
        );
        console.log(res);

        console.log(folderName);
        console.log(path);

        setChange(folderName);
        if (res.status === 200) {
            handleClose();
            // snackbarFunc("Song deleted");

        } else {
            setViewMessage(true)
        }
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
                    <Modal.Title>Delete Folder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <br />
                    Do you want delete the folder {folderName} ?
                    <br />
                    Note - only an empty folder can be deleted!
                    <br />
                    {viewMessage && <div className="text-info">The folder not empty</div>}

                </Modal.Body>
                <Modal.Footer>
                    <Button className="button_add" variant="secondary" onClick={delFolder}>
                        yes{" "}
                    </Button>
                    <Button variant="secondary" onClick={() => { handleClose(); setViewMessage(false) }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PopupDelFolder;
