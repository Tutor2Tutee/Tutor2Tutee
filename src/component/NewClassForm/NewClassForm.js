import React, { useState } from "react";
import "./NewClassForm.css";
import InputField from "./../UI/InputField/InputField";

function NewClassForm(props) {
  const [ClassName, setClassName] = useState("");
  const [ClassType, setClassType] = useState("");
  const [ClassDescription, setClassDescription] = useState("");

  const onNewClassHandler = (event) => {
    event.preventDefault();
    const classData = {
      name: ClassName,
      classType: ClassType,
      description: ClassDescription,
    };
    console.log(classData);

    setClassName("");
    setClassType("");
    setClassDescription("");
    props.closeForm();
  };

  return (
    <div className="new__class--container">
      <form onSubmit={onNewClassHandler} className="new__class--form">
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewClassForm;
