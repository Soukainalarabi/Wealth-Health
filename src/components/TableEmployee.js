import React from "react";
import { Link } from "react-router-dom";

export default function TableEmployee({ data }) {
  if (!data || data.length === 0) {
    return (
      <div>
        <h1>No employees found</h1>
        <Link to="/">Home</Link>
      </div>
    );
  }

  const keys = Object.keys(data[0]);

  return (
    <div id="employee-div" className="container">
      <h1>Current Employees</h1>
      <div id="employee-table" className="display">
        <table>
          <thead>
            <tr>
              {keys.map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((employee, index) => (
              <tr key={index}>
                {keys.map((key) => (
                  <td key={key}>{employee[key]}</td>
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