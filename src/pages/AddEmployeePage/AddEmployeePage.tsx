import React, {useCallback} from 'react';
import {useNavigate} from "react-router";

import EmployeeForm from '../../components/EmployeeForm/EmployeeForm';


const AddEmployeePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = useCallback(() => {
    navigate('/')
  }, [navigate])

  return <EmployeeForm onSubmit={handleSubmit}/>; // Здесь мы не передаем employeeId, т.к. это добавление нового сотрудника
};

export default AddEmployeePage;

