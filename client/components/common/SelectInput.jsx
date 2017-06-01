import React, { PropTypes } from 'react';

/**
 * Select input
 *
 * @param {Object} props { name, onChange, value, error, icon = 'user', options, label }
 * @returns {Object} jsx object
 */
const SelectInput = ({ name, onChange, value, error, icon = 'user', options, label }) =>
  <div className="input-field">
    <i className={`fa fa-${icon} prefix`} />
    <select
      className="select-role"
      id="selectInput"
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

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  error: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string,
};

export default SelectInput;
