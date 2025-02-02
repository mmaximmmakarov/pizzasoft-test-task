import React from 'react';
import EmployeeForm from '../../components/EmployeeForm/EmployeeForm';

const AddEmployeePage: React.FC = () => {
  return <EmployeeForm />; // Здесь мы не передаем employeeId, т.к. это добавление нового сотрудника
};

export default AddEmployeePage;
