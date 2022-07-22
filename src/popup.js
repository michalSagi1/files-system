import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
const axios = require('axios').default;


function Popup() {

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState(false);
    const [nameFolder, setNameFolder] = useState("")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const creatrNewFolder = async () => {
        axios({
            method: "post",
            url: `http://localhost:3000/folder/creatfolder/${nameFolder}`,
            headers: { "Content-Type": "application/json" },
            data: { type: "folder", dir: "/test" }

        })
            .then((e) => {
                console.log("success", e); handleClose()
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
            <Button variant="primary" onClick={handleShow}>
                New Folder
            </Button>

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