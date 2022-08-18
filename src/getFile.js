import React, { useEffect, useState, useContext } from 'react'
import PathContext from './PathContext';
import PopupDelFile from './DelFile';
import PopupRenameFile from './RenameFile';
import PopupDelFolder from './DelFolder';
import PopupRenameFolder from './RenameFolder';
import "./getFile.css";
import iconDownload from './icons/download.png'
import iconFolder from './icons/folder.png'
import png from './icons/png.png'
import jpg from './icons/jpg.png'
import pdf from './icons/pdf.png'
import word from './icons/word.png'
import defualt from './icons/fileDef.png'




import Popup from './popup';
import CreatFile from './creatFile';

function GetFile({ change, setChange }) {
    const [files, setFiles] = useState([])
    const { path, setPath } = useContext(PathContext);



    useEffect(() => {
        async function getFile() {
            const requestOptions = {
                method: 'GET',
                // body: JSON.stringify({
                // path: "root/test",

                // })
            };
            const url = `http://localhost:3000/folder/root/?path=${path}`
            // const url = `http://localhost:3000/folder/getFile`
            const res = await fetch(url, requestOptions);
            const data = await res.json();
            console.log(data);
            setFiles(data);
        }
        getFile()
        console.log(files);
    }, [change, path])

    const download = async ({ fileName }) => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fileName,
                path
            }),
        };
        await fetch(
            `http://localhost:3000/file/download`,
            requestOptions

        ).then(resp => resp.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })



        console.log(fileName);
        console.log(path)
    }







    return (
        <>
            <div className='title'>files:</div>

            <div className='containerFiles'>
                <div className='addfile'>
                    <div className='creatFile'>
                        <CreatFile setChange={setChange} />
                    </div>
                </div>

                {files.map(v => {
                    v.type = v.name.slice((v.name.lastIndexOf(".") + 1))

                    if (v.name.includes(".")) {
                        return (
                            <div className='files'>
                                {/* <button onClick={() => setPath(`${path}/${v.name}`)}>{v.name}</button> */}
                                <div className='fileCard'>
                                    <img
                                        src={v.type == "png" ? png : v.type == "pdf" ? pdf : v.type == "jpg" || v.type == "jpeg" ? jpg : v.type == "docx" ? word : defualt}
                                        alt=""
                                        className="iconFolder"
                                    // onClick={() => download({ fileName: v.name })}
                                    />
                                    <div className='fileName'>{v.name}   </div>
                                    <div className='icons'>
                                        <PopupDelFile fileName={v.name} setChange={setChange} ></PopupDelFile>
                                        <img
                                            src={iconDownload}
                                            alt=""
                                            className="download"
                                            onClick={() => download({ fileName: v.name })}
                                        />
                                        <PopupRenameFile fileName={v.name} setChange={setChange}></PopupRenameFile>
                                    </div>
                                </div>
                            </div>

                        )

                    }

                })}            </div>

            <div className='title'>folders:</div>

            <div className='containerFolders'>
                <div className='addfolder'>
                    <div className='creatFolder'>
                        <Popup setChange={setChange} />
                    </div>
                </div>
                {files.map(v => {
                    if (!(v.name.includes("."))) {
                        return (
                            <div className='folders'>
                                <div className='fileCard'>
                                    <div className='gotofolder' onClick={() => setPath(`${path}/${v.name}`)}>

                                        <img
                                            src={iconFolder}
                                            alt=""
                                            className="iconFolder"
                                        // onClick={() => download({ fileName: v.name })}
                                        />
                                        <div className='fileName'>{v.name}   </div>



                                        {/* <button onClick={() => setPath(`${path}/${v.name}`)}>{v.name}</button> */}
                                    </div>
                                    <div className='iconsFolders'>

                                        <PopupDelFolder folderName={v.name} setChange={setChange}></PopupDelFolder>
                                        <PopupRenameFolder folderName={v.name} setChange={setChange}></PopupRenameFolder>
                                    </div>
                                </div>
                            </div>
                        )

                    }

                })}            </div>

        </>
    )
}

export default GetFile