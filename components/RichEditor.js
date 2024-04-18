import React from "react";
import ReactQuill from "react-quill";

const RichEditor = ({ value, onChange }) => {
  return <ReactQuill theme="snow" value={value} onChange={onChange} />;
};

export default RichEditor;
