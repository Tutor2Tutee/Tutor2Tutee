import React, { useState } from 'react';
import './CreatedClasses.css';
import ClassCard from './../../../component/ClassCard/ClassCard';
import NewClassForm from './../../../component/NewClassForm/NewClassForm';

function CreatedClasses() {
    const [showAddClass, setShowAddClass] = useState(false);

    return (
        <React.Fragment>
            {showAddClass && (
                <NewClassForm closeForm={() => setShowAddClass(false)} />
            )}
            <div className="create__classes">
                <div className="create__classes--head">
                    <button onClick={() => setShowAddClass(true)}>
                        Create New Class
                    </button>
                </div>
                <div className="create__classes--main">
                    <h1>Created Classes</h1>
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

export default CreatedClasses;
