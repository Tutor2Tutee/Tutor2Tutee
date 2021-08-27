import React from "react";
import "./CreatedClasses.css";
import ClassCard from "./../../../component/ClassCard/ClassCard";

function CreatedClasses() {
  return (
    <div className="create__classes">
      <div className="create__classes--head">
        <button>Create New Class</button>
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
  );
}

export default CreatedClasses;
