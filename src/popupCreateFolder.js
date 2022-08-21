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



    return (
        <>

            <div className="addFolder" onClick={handleShow}>
                <img src={iconFolder} alt={iconFolder} className="addFolder" />
            </div>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><div className="titlePopup">New Folder</div></Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <>

                        <Form.Label htmlFor="inputnamefolder"></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder='Folder Name...'
                            id="inputnamefolder"
                            aria-describedby="inputnamefolder"
                            value={nameFolder}
                            onChange={(e) => { setMessage(false); setNameFolder(e.target.value) }}
                        />
                        <br />
                        <Form.Text id="inputnamefolder" muted>
                            <div className='titlePopup'>
                                ✏️  Enter letters and numbers only</div>
                        </Form.Text>
                        {message &&
                            <div className='textInfo'>error, please enter new name</div>}
                    </>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button className="button_add btup" variant="secondary" onClick={creatrNewFolder}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Popup;