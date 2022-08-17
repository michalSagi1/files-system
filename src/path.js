import React, { useContext } from 'react'
import PathContext from './PathContext';

function Path() {
    const { path } = useContext(PathContext);

    return (
        <div>{path}</div>
    )
}

export default Path