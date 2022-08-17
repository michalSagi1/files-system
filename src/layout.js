import React, { useState, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Popup from './popup'
import CreatFile from './creatFile';
import SowFolder from './showfolder';
import GetFile from './getFile';
import Path from './path';
import PathContext from './PathContext'



function Layout() {
    const [change, setChange] = useState("")
    const [path, setPath] = useState("root")
    return (
        <PathContext.Provider value={{ path, setPath }}>

            <>

                {/* <Popup setChange={setChange} /> */}

                {/* <CreatFile setChange={setChange} /> */}
                <Path />

                <GetFile change={change} setChange={setChange} />
            </>
        </PathContext.Provider>
    )
}

export default Layout