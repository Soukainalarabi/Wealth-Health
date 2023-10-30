import React,{useState,useEffect} from 'react';
import TableEmployee from './TableEmployee';

export default function EmployeesList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("NewEmployee");    


    if (storedData) { // Vérifiez si des données existent dans localStorage
      const parsedData = JSON.parse(storedData);
      
      if (Array.isArray(parsedData)) {        // Si les données sont un tableau, mettez-les à jour dans l'état local

        setEmployees(parsedData);
      }
    }
  }, []);

  return (
    <TableEmployee data={employees} />
  );
}