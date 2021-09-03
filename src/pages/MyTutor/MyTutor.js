import React from 'react';
import './MyTutor.css';
import UserCard from './../../component/UserCard/UserCard';

function MyTutor() {
    return (
        <section className="my__tutor--main">
            <h1 className="my__tutor--h1">My Tutors</h1>
            <div className="my__tutor--container">
                <UserCard />
                <UserCard />
            </div>
        </section>
    );
}

export default MyTutor;
