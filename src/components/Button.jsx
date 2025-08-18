import React from 'react'
import './Button.css'

const button = ({ text, type = "", onClick }) => {
    return (
        <button onClick={onClick} className={`Button ${type}`}>{text}</button>
    )
}

export default button