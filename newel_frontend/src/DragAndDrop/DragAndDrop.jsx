import React from "react";
import "./DragAndDrop.css";
import DropFileInput from "../components/drop-file-input/DropFileInput";

const DragAndDrop = () => {
  const onFileChange = (files) => {
    console.log(files);
  };

  window.onbeforeunload = function () {
    return "Data will be lost if you leave the page, are you sure?";
  };

  return (
    <div className="box">
      <h2 className="header">Drop files for input</h2>
      <DropFileInput onFileChange={(files) => onFileChange(files)} />
    </div>
  );
};

export default DragAndDrop;
