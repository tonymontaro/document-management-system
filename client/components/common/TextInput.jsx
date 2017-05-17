import React, { PropTypes } from 'react';

const TextInput = ({ name, label, onChange, value, error, icon = 'user', type = 'text' }) => {
  return (
    <div className="input-field">
      <i className={`fa fa-${icon} prefix`}></i >
      <input type={type} name={name} id={name} onChange={onChange} value={value} />
      <label htmlFor={name}>{label}</label>
      {error && <div className="card-panel error white-text">{error}</div>}
    </div>

  );
};

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
