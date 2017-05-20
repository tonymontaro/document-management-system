import React, { PropTypes } from 'react';

const TextInput = ({ name, onChange, value, error, icon = 'user', options, label }) =>
  <div className="input-field">
    <i className={`fa fa-${icon} prefix`} />
    <select
      className="select-role"
      name={name}
      onChange={onChange}
      value={value} >
      <option value="null" disabled>{label}</option>
      {options.map(option =>
        <option value={option.value} key={option.value} >{option.text}</option>)}
    </select>
    {error && <div className="card-panel error white-text">
      {error}
    </div>}
  </div>;

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string,
};

export default TextInput;
