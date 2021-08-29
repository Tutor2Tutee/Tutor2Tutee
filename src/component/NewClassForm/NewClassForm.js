import React, { useState } from "react";
import "./NewClassForm.css";
import InputField from "./../UI/InputField/InputField";

function NewClassForm() {
  const [ClassName, setClassName] = useState("");
  const [ClassType, setClassType] = useState("");
  const [ClassDescription, setClassDescription] = useState("");

  return (
    <div className="new__class--container">
      <form className="new__class--form">
        <h1>Add New Class</h1>
        <InputField
          type="text"
          placeholder="Class Name"
          onChange={(event) => setClassName(event.target.value)}
          value={ClassName}
        />
        <InputField
          type="text"
          placeholder="Class Type"
          onChange={(event) => setClassType(event.target.value)}
          value={ClassType}
        />
        <InputField
          type="text"
          placeholder="Class Description"
          onChange={(event) => setClassDescription(event.target.value)}
          value={ClassDescription}
        />
        <button type="button">Submit</button>
      </form>
    </div>
  );
}

export default NewClassForm;
