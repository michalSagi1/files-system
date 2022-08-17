import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
// import { AiFillFolderAdd } from 'react-icons/ai'
import PathContext from './PathContext';
import iconFolder from './icons/addFolder.png'

const axios = require('axios').default;



function Popup({ setChange }) {

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState(false);
    const [nameFolder, setNameFolder] = useState("")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { path } = useContext(PathContext);


    const creatrNewFolder = async () => {
        axios({
            method: "post",
            url: `http://localhost:3000/folder/creatfolder/${nameFolder}`,
            headers: { "Content-Type": "application/json" },
            data: { path, type: "folder" }

        })
            .then((e) => {
                console.log("success", e); handleClose()
                setChange(nameFolder)

            })
            .catch((e) => {
                console.log(e);
                setMessage(true)

            });

    }


    //     const requestOptions = {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },

    //     };
    //     const res = await fetch(
    //         `http://localhost:3000/folder/creatfolder/${nameFolder}`,
    //         requestOptions
    //     );
    //     const data = await res.json()
    //     setData(data)
    //     console.log(data);
    // };



    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                <AiFillFolderAdd />    New Folder
            </Button> */}
            <div className="addFolder" onClick={handleShow}>
                <img src={iconFolder} alt={iconFolder} className="addFolder" />
            </div>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Folder</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <>
                        {message &&
                            <div>error, please enter new name</div>}
                        <Form.Label htmlFor="inputnamefolder"></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder='Folder Name...'
                            id="inputnamefolder"
                            aria-describedby="inputnamefolder"
                            value={nameFolder}
                            onChange={(e) => { setMessage(false); setNameFolder(e.target.value) }}
                        />
                        <Form.Text id="inputnamefolder" muted>
                            Enter letters and numbers only
                        </Form.Text>
                    </>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={creatrNewFolder}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Popup;