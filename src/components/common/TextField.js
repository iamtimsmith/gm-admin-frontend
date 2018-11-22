import React from "react";

const TextField = ({ type, name, placeholder, value, errors, onChange }) => (
  <div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      errors={errors}
    />
    <small>{errors}</small>
  </div>
);

export default TextField;
