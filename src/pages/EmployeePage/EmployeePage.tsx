import React, {useCallback} from 'react';
import {useNavigate, useParams} from 'react-router';
import EmployeeForm from '../../components/EmployeeForm/EmployeeForm';
import {useSelector} from "react-redux";

const EmployeePage: React.FC = () => {
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>(); // Получаем id сотрудника из URL
  const employee = useSelector((state: any) =>
    state.employees.employees.find((_employee: any) => _employee.id == id)
  );

  const handleSubmit = useCallback(() => {
    navigate('/')
  }, [navigate])

  return <EmployeeForm employee={employee} onSubmit={handleSubmit}/>;
};

export default EmployeePage;
