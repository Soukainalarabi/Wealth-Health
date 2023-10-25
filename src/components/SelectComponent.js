import React from 'react';
export default function SelectComponent({ options, name, id,optionSelected }) {
  return (
    <select ref={optionSelected} name={name} id={id}>
      {options.map((option, index) => (
       <option key={typeof option === 'object' ? option.abbreviation : option} value={typeof option === 'object' ? option.name : option}>
       {typeof option === 'object' ? option.name : option}
     </option>
      ))}
    </select>
  );
}
