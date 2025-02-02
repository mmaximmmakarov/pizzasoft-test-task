import React from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Employee } from '../../store/employeeSlice';
import roles from "../../helpers/roles";

const EmployeeList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employees, filter } = useSelector((state: any) => state.employees);

  // Фильтруем сотрудников на основе выбранных фильтров
  const filteredEmployees = employees.filter((employee: Employee) => {
    const roleFilter = filter.role ? employee.role === filter.role : true;
    const archiveFilter = filter.isArchive !== undefined ? employee.isArchive === filter.isArchive : true;
    return roleFilter && archiveFilter;
  });

  const handleRowClick = (employeeId: number) => {
    // Переход на страницу редактирования сотрудника
    navigate(`/edit/${employeeId}`);
  };

  const columns = [
    { title: 'Имя', dataIndex: 'name' },
    {
      title: 'Должность',
      dataIndex: 'role',
      render: (role: string) => {
        return roles[role] || 'Неизвестная должность'; // Если должность не найдена
      },
    },
    { title: 'Телефон', dataIndex: 'phone' },
  ];

  return (
      <div>
        <Table
            dataSource={filteredEmployees}
            columns={columns}
            rowKey="id"
            onRow={(record: Employee ) => ({
              onClick: () => handleRowClick(record.id),
            })}
            pagination={false}
        />
      </div>
  );
};

export default EmployeeList;
