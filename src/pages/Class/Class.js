import React from 'react';
import './Class.css';
import { Link } from 'react-router-dom';

function Class() {
    return (
        <div className="class_type">
            <div className="class_type--container">
                <Link to="class/created">Created Classes</Link>
                <p>List of classes created by you.</p>
            </div>
            <div className="class_type--container">
                <Link to="class/appointed">Appointed Classes</Link>
                <p>List of classes appointed to you.</p>
            </div>
        </div>
    );
}

export default Class;
