import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom"

export default function EmployeesList(){
    return(
        <div id="employee-div" className="container">
        <h1>Current Employees </h1>
        <div id="employee-table" class="display">
        <Table striped bordered hover >
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Start Date</th>
          <th>Department</th>
          <th>Date of Birth</th>
          <th>Street</th>
          <th>City</th>
          <th>State</th>
          <th>Zip Code</th>
        </tr>
      </thead>
      <tbody>
        <tr>
        <td colSpan={2}>Mark stark</td>
          <td>Otto</td>
          <td>Otto</td>
          <td>Otto</td>
          <td>Otto</td>
          <td>Otto</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td colSpan={2}>Jacob vtrfcd</td>
          <td>Otto</td>
          <td>Otto</td>
          <td>Otto</td>
          <td>Otto</td>
          <td>Otto</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
        <td colSpan={2}>Larry the Bird</td>
          <td>Otto</td>
          <td>Otto</td>
          <td>Otto</td>
          <td>Otto</td>
          <td>Otto</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
      </tbody>
    </Table>
        <Link to="/">Home</Link>
    </div>  
    </div>
      )
}