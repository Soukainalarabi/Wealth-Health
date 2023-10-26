import TableEmployee from "./TableEmployee";
export default function EmployeesList() {
  const employe = JSON.parse(localStorage.getItem("NewEmployee"));

  return (
    <TableEmployee data={employe} />
  );
}