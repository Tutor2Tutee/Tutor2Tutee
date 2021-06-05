import React from 'react'
import "./ClassCard.css"

const ClassCard = (props) => (
    <li className="classcard__container">
        <h1>{props.title}</h1>
        <p>{props.date}</p>
    </li>
)

export default ClassCard