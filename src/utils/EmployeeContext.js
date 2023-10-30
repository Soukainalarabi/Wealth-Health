import { createContext,useState } from "react"
export const EmployeeContext = createContext()
export const EmployeeProvider = ({ children }) => {
    const [employees, setEmployees] = useState([])
    //   const updateEmployee = (newEmployeeData) => {
    //     setEmployee(newEmployeeData);
    //   };
      const addEmployee = (newEmployee) => {
        setEmployees([...employees, newEmployee]);
      };
    
      return (
        <EmployeeContext.Provider value={{ employees, addEmployee }}>
        {children}
        </EmployeeContext.Provider>
      );
}