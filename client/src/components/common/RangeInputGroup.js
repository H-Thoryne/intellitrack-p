import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';

const RangeInputGroup = ({
  label,
  step,
  min,
  max,
  value,
  onChange,
  name,
  tooltip
}) => {
  const [isOpen, toggle] = useState(false);

  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type="range"
        step={step}
        min={min}
        max={max}
        value={value}
        name={name}
        id={name}
        onChange={onChange}
        className="custom-range"
      />
      {tooltip && (
        <Tooltip
          isOpen={isOpen}
          toggle={() => toggle(!isOpen)}
          placement="auto"
          target={name}
        >
          {value}
        </Tooltip>
      )}
    </div>
  );
};

export default RangeInputGroup;
