import TableEmployee from "./TableEmployee";
import {useContext} from "react"
import { EmployeeContext } from "../utils/EmployeeContext";
export default function EmployeesList() {
    const { employees } = useContext(EmployeeContext);
console.log({ employees } )

  return (
    <TableEmployee data={employees} />
  );
}