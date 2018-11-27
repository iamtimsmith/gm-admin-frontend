import React from "react";

const TextField = ({
  type,
  name,
  placeholder,
  value,
  error,
  onChange,
  disabled
}) => (
  <div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={error ? "error" : ""}
      disabled={disabled}
    />
    <small>{error}</small>
  </div>
);

export default TextField;
