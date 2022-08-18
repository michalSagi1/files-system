import React, { useContext } from 'react'
import PathContext from './PathContext';
import iconNext from './icons/next.png'
import './path.css'

function Path() {
    const { path, setPath } = useContext(PathContext);
    let arrPath = path.split("/")

    return (<div className='path'>
        {/* <div>{path}</div> */}
        {arrPath.map(v => {
            return (
                <div className='pathline' onClick={() => setPath(`${path.slice(0, (path.indexOf(v) + v.length))}`)}>{`${v}`}
                    <img src={iconNext} alt={iconNext} className="iconNext" />
                </div>)
        })}


    </div>
    )
}

export default Path