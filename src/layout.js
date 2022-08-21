import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import GetFile from './getFile';
import Path from './path';
import PathContext from './PathContext'
import Header from './Header'


function Layout() {
    const [change, setChange] = useState("")
    const [path, setPath] = useState("root")
    return (
        <PathContext.Provider value={{ path, setPath }}>

            <>
                <Header />

                {/* <Popup setChange={setChange} /> */}

                {/* <CreatFile setChange={setChange} /> */}
                <Path />

                <GetFile change={change} setChange={setChange} />
            </>
        </PathContext.Provider>
    )
}

export default Layout