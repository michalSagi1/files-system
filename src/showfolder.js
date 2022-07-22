import React, { useState, useEffect } from 'react';


function SowFolder() {
    const [folders, setFolfers] = useState([])
    useEffect(() => {
        async function showFolder() {

            const url = "http://localhost:3000/folder/root"
            const res = await fetch(url);
            const data = await res
            setFolfers(data);

        }
        showFolder()
    }, [])
    console.log(folders);

    // const showFolder = async () => {
    //     const requestOptions = {
    //         method: "GET",
    //         headers: { "Content-Type": "application/json" },

    //     };
    //     const res = await fetch(
    //         `http://localhost:3000/folder/root`,
    //         requestOptions
    //     );
    //     const data = await res.json()
    //     setData(data)
    //     console.log(data);
    // };



    return (
        <>
            {/* <div className='home'>
                {folders.map(folder =>
                    <div>{folder}</div>

                )}


            </div> */}
        </>
    );
}

export default SowFolder;