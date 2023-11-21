import React from 'react';
import PropTypes from 'prop-types';

export default function SelectComponent({ options, name, id, optionSelected }) {
  return (
    <select ref={optionSelected} name={name} id={id}>
      {options.map(option => (
        <option
          key={typeof option === 'object' ? option.abbreviation : option}
          value={typeof option === 'object' ? option.name : option}
        >
          {typeof option === 'object' ? option.name : option}
        </option>
      ))}
    </select>
  );
}
SelectComponent.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string,
  id: PropTypes.string,
  optionSelected: PropTypes.object,
};
SelectComponent.defaultProps = {
  options: [],
  name: '',
  id: '',
  optionSelected: null,
};
