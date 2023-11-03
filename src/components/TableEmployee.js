import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ReactId } from 'reactjs-id';

export default function TableEmployee({ data }) {
  if (!data || data.length === 0) {
    return (
      <div>
        <h1>No employees found</h1>
        <Link to="/">Home</Link>
      </div>
    );
  }

  const keysA = Object.keys(data[0]);

  return (
    <div id="employee-div" className="container">
      <h1>Current Employees</h1>
      <div id="employee-table" className="display">
        <table>
          <thead>
            <tr>
              {keysA.map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((employee, id) => (
              <tr key={`employee-${ReactId()}`} className={`employee-${id}`}>
                {keysA.map((val) => (
                  <td key={`employe-${val}`} className={`${val}employe-${id}`}>{employee[val]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}
TableEmployee.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number })),
};
TableEmployee.defaultProps = {
  data: [],
};
