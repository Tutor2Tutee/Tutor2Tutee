import React from 'react';
import './MyTutee.css';
import UserCard from './../../component/UserCard/UserCard';

function MyTutee() {
    return (
        <section className="my__tutee--main">
            <h1 className="my__tutee--h1">My Tutee</h1>
            <div className="my__tutee--container">
                <UserCard />
                <UserCard />
            </div>
        </section>
    );
}

export default MyTutee;
