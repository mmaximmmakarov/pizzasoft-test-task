// src/pages/EmployeePage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import EmployeeForm from '../../components/EmployeeForm/EmployeeForm';

const EmployeePage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Получаем id сотрудника из URL

  return <EmployeeForm employeeId={parseInt(id || "", 10)} />;
};

export default EmployeePage;
