import React from 'react';
import './SingleClass.css';
import ImgSrc from './../../../shared/ImgSrc';

function SingleClass() {
    return (
        <section className="single__class--container">
            <figcaption className="single__class--image">
                <img src={ImgSrc.lecturesDash} alt="logo" />
            </figcaption>
            <div>
                <ul className="single__class--ul">
                    <li>Name : Python MasterClass</li>
                    <li>Tutor : Test Test</li>
                    <li>Number of Listeners : 10/10</li>
                    <li>Rating : 5</li>
                    <li>Class Type : Online Lecture</li>
                    <li>
                        <label>Description:</label>
                        <p>lorem ipsum</p>
                    </li>
                </ul>
                <button className="single__class--button">Join Class</button>
            </div>
        </section>
    );
}

export default SingleClass;
