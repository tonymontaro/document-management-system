import React, { PropTypes } from 'react';

/**
 * Text Input
 *
 * @param {Object} props { name, label, onChange, value, error, icon = 'user', type = 'text' }
 * @returns {Object} jsx object
 */
const TextInput = ({ name, label, onChange, value, error, icon = 'user', type = 'text' }) =>
  <div className="input-field">
    <i className={`fa fa-${icon} prefix`} />
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      name={name}
      id={name}
      onChange={onChange}
      value={value} />
    {error && <div className="card-panel error white-text">{error}</div>}
  </div>;

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string,
};

export default TextInput;
