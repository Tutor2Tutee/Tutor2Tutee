import React from 'react';
import './AppointedClasses.css';
import ClassCard from './../../../component/ClassCard/ClassCard';

function AppointedClasses(props) {
    return (
        <React.Fragment>
            <div className="create__classes">
                <div className="create__classes--head">
                    <button onClick={() => props.history.push('/class/all')}>
                        Explore Classes
                    </button>
                </div>
                <div className="create__classes--main">
                    <h1>Enrolled Classes</h1>
                    <div className="create__classes--list">
                        {/* Classes Array */}
                        <ClassCard number={Math.floor(Math.random() * 4)} />
                        <ClassCard number={Math.floor(Math.random() * 4)} />
                        <ClassCard number={Math.floor(Math.random() * 4)} />
                        <ClassCard number={Math.floor(Math.random() * 4)} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AppointedClasses;
