import React from 'react';
import classNames from 'classnames';

const TextFieldGroup = ({
  type,
  name,
  error,
  text,
  onChange,
  placeholder,
  label
}) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        name={name}
        className={classNames('form-control', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        value={text}
        onChange={onChange}
        id={name}
      />
      {error && <div className="text-left invalid-feedback">{error}</div>}
    </div>
  );
};

TextFieldGroup.defaultProps = {
  type: 'text'
};

export default TextFieldGroup;
