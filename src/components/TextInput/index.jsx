import './styles.css';
import React from 'react';
import P from 'prop-types';
export const TextInput = ({ searchValue, handleChange }) => {
  return (
    <input
      className="text-input"
      value={searchValue}
      onChange={handleChange}
      type="search"
      placeholder="Type your search"
    />
  );
};

TextInput.propTypes = {
  searchValue: P.string.isRequired,
  handleChange: P.func.isRequired,
};
