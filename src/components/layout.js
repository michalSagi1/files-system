import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import GetFile from '../pages/getFile';
import Path from './path/path';
import PathContext from '../PathContext'
import Header from './header/Header'


function Layout() {
    const [change, setChange] = useState("")
    const [path, setPath] = useState("root")
    return (
        <PathContext.Provider value={{ path, setPath }}>

            <>
                <Header />


                <Path />

                <GetFile change={change} setChange={setChange} />
            </>
        </PathContext.Provider>
    )
}

export default Layout