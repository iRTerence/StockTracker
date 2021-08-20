import React, { useState } from "react";

export default (initialVal) => {
  const [value, setValue] = useState(initialVal);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const reset = (e) => {
    e.preventDefault();
    setValue("");
  };
  return [value, handleChange, reset];
};
