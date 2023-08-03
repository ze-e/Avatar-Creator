import React from "react";
import PropTypes from "prop-types";

/*
  { inputs:
    [
      {
        value,
        onChange,
        placeholder,
        classname
      }
    ]
  }
*/

export default function Input({
  className,
  onSubmit,
  submitText,
  buttonClassName,
  disabled,
  inputs,
}) {
  return (
    <form className={className} onSubmit={onSubmit}>
      {inputs.map((input, index) => (
        <input
          key={index}
          className={input.className}
          onChange={input.onChange}
          value={input.value}
          placeholder={input.placeholder}
        />
      ))}
      <button className={buttonClassName} disabled={disabled()} type="submit">
        {submitText}
      </button>
    </form>
  );
}

Input.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
  submitText: PropTypes.string,
  buttonClassName: PropTypes.string,
  disabled: PropTypes.func,
  inputs: PropTypes.array,
};
