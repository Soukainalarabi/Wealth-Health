import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ReactId } from 'reactjs-id';

const StyledTable = styled.table`
border-collapse: collapse;
  border: 2px solid #6e8511;
    width: 100%;
    padding:10px;
th,td {
    border: 1px solid #6e8511;
    padding: 8px;
    text-align: justify;

  
}
`;
const StyledBody = styled.tbody`  border: 2px solid #6e8511;
  `;
export default function TableEmployee({ data, head }) {
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
        <StyledTable>
          <thead>
            <tr>
              {keysA.map((key) => (
                <th key={key}>{head[key]}</th>
              ))}
            </tr>
          </thead>
          <StyledBody>
            {data.map((employee, id) => (
              <tr key={`employee-${ReactId()}`} className={`employee-${id}`}>
                {keysA.map((val) => (
                  <td key={`employe-${val}`} className={`${val}employe-${id}`}>{employee[val]}</td>
                ))}
              </tr>
            ))}
          </StyledBody>
        </StyledTable>
      </div>
    </div>
  );
}
TableEmployee.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number })),
  head: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    dateOfBirth: PropTypes.string,
    startDate: PropTypes.string,
    street: PropTypes.string,
    city: PropTypes.string,
    zipCode: PropTypes.string,
    stateValue: PropTypes.string,
    departmentValue: PropTypes.string,
  }),
};
TableEmployee.defaultProps = {
  data: [],
  head: [],
};
