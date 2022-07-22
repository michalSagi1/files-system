import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Popup from './popup'
import CreatFile from './creatFile';
import SowFolder from './showfolder';
import GetFile from './getFile';



function Layout() {
    return (
        <>
            <Popup />

            <CreatFile />

            <GetFile />
        </>
    )
}

export default Layout