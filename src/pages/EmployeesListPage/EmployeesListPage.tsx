import React from 'react';
import {Typography, Button} from "antd";
import {useNavigate} from "react-router";
import {PlusOutlined} from "@ant-design/icons";

import EmployeeList from '../../components/EmployeeList/EmployeeList';
import EmployeeFilter from '../../components/EmployeeFilter/EmployeeFilter';

import './EmployeesListPage.scss'


const EmployeesListPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="employees-title">
        <Typography.Title>Сотрудники</Typography.Title>
        <Button
          onClick={() => navigate('/add')} // Переход на страницу добавления сотрудника
          icon={<PlusOutlined/>}
        >
          Добавить
        </Button>
      </div>
      <EmployeeFilter/>
      <EmployeeList/>
    </div>
  );
};

export default EmployeesListPage;
