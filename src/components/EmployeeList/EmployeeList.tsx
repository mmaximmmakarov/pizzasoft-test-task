import React, {useCallback, useMemo} from 'react';
import {Table} from 'antd';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {Employee} from '../../store/employeeSlice';
import roles from "../../helpers/roles";
import dayjs from "dayjs";

const EmployeeList: React.FC = () => {
  const navigate = useNavigate();
  const {
    employees,
    filter,
    sort: {order: sortOrder, field: sortField}
  } = useSelector((state: any) => state.employees);

  // Фильтруем сотрудников на основе выбранных фильтров
  const filteredEmployees = useMemo(() =>
      employees
        .filter((employee: Employee) => {
          const roleFilter = filter.role ? employee.role === filter.role : true;
          const archiveFilter = filter.isArchive !== undefined ? employee.isArchive === filter.isArchive : true;
          return roleFilter && archiveFilter;
        })
        .sort((a: Employee, b: Employee) => {
          const aBirthday = dayjs(a.birthday, 'DD.MM.YYYY')
          const bBirthday = dayjs(b.birthday, 'DD.MM.YYYY')

          const compareValue = sortField === 'name'
            ? a.name.localeCompare(b.name)
            : bBirthday.diff(aBirthday);
          return sortOrder === 'asc' ? compareValue : -compareValue;
        }),
    [filter, sortField, sortOrder, employees]);

  const handleRowClick = useCallback((employeeId: number) => {
    // Переход на страницу редактирования сотрудника
    navigate(`/edit/${employeeId}`);
  }, [navigate]);

  const columns = [
    {title: 'Имя', dataIndex: 'name'},
    {
      title: 'Должность',
      dataIndex: 'role',
      render: (role: string) => {
        return roles[role] || 'Неизвестная должность'; // Если должность не найдена
      },
    },
    {title: 'Телефон', dataIndex: 'phone'},
  ];

  return (
    <div>
      <Table
        dataSource={filteredEmployees}
        columns={columns}
        rowKey="id"
        onRow={(record: Employee) => ({
          onClick: () => handleRowClick(record.id),
        })}
        pagination={false}
      />
    </div>
  );
};


export default EmployeeList;
