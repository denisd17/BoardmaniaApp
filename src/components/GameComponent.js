import React from 'react'
import { useParams } from 'react-router-dom'

const GameComponent = () => {
    const { id } = useParams();

    return (
        <div>GameComponent with id: {id}</div>
    )
}


export default GameComponent