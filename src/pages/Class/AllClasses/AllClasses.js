import React, { useState } from "react";
import "./AllClasses.css";
import ClassCard from "./../../../component/ClassCard/ClassCard";
function AllClasses(props) {
  return (
    <React.Fragment>
      <div className="create__classes">
        <div className="create__classes--main">
          <h1 className="all__classes--h1">All Classes</h1>
          <div className="create__classes--list">
            {/* Classes Array */}
            <ClassCard
              isAllClass={true}
              number={Math.floor(Math.random() * 4)}
            />
            <ClassCard
              isAllClass={true}
              number={Math.floor(Math.random() * 4)}
            />
            <ClassCard
              isAllClass={true}
              number={Math.floor(Math.random() * 4)}
            />
            <ClassCard
              isAllClass={true}
              number={Math.floor(Math.random() * 4)}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AllClasses;
