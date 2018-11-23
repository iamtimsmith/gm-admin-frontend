import React from "react";

const TextField = ({ type, name, placeholder, value, error, onChange }) => (
  <div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={error ? "error" : ""}
    />
    <p>{error}</p>
  </div>
);

export default TextField;
