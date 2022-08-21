import React, { useState, useEffect } from 'react'

function ItemNum({ _path, setChange, change }) {

    const [files, setFiles] = useState("")
    useEffect(() => {

        async function getFile() {
            const requestOptions = {
                method: 'GET',

            };
            const url = `http://localhost:3000/folder/root/?path=${_path}`
            const res = await fetch(url, requestOptions);
            const data = await res.json();
            setFiles(data);
            setChange(_path)
        }
        getFile()
    }, [change])

    return (
        <div>
            {files.length} items
        </div>

    )
}

export default ItemNum