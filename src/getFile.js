import React, { useEffect, useState } from 'react'

function GetFile() {
    const [files, setFiles] = useState([])

    useEffect(() => {
        async function getFile() {
            const requestOptions = {
                method: 'GET',
                // body: JSON.stringify({
                //     dir: "/test",

                // })
            };
            const url = `http://localhost:3000/folder/getFile`
            const res = await fetch(url, requestOptions);
            const data = await res.json();
            setFiles(data);
        }
        getFile()
        console.log(files);
    }, [])
    return (
        <>
            {files.map(v => {
                return (
                    <button>{v.name}</button>

                )
            })}            </>

    )
}

export default GetFile