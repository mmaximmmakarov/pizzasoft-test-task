import React, {useCallback} from 'react';
import {Select, Button, Checkbox, Space, Typography} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {CaretUpOutlined, CaretDownOutlined, ClearOutlined} from '@ant-design/icons';

import {updateFilters, updateSortParams} from '../../store/employeeSlice';
import roles from '../../helpers/roles'

import './EmployeeFilter.scss'


const EmployeeFilter: React.FC = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: any) => state.employees.filter);
  const {field: sortField, order: sortOrder} = useSelector((state: any) => state.employees.sort);

  const handleSortChange = useCallback((value: 'name' | 'birthday') => {
    dispatch(updateSortParams({sortField: value, sortOrder: sortOrder || 'asc'}));
  }, [dispatch, sortOrder]);

  const toggleSortOrder = useCallback(() => {
    dispatch(updateSortParams({sortOrder: sortOrder === 'asc' ? 'desc' : 'asc'}));
  }, [dispatch, sortOrder]);

  const handleReset = useCallback(() => {
    dispatch(updateFilters({role: undefined, isArchive: undefined}));
  }, [dispatch]);

  return (
    <div className="filters-container">
      <div className="filters">
        <Select
          value={filter.role}
          placeholder="Выберите должность"
          style={{width: 200}}
          onChange={(value) => dispatch(updateFilters({role: value}))}
          data-testid="roleFilter"
        >
          {Object.entries(roles).map(([key, value]) => (
            <Select.Option key={key} value={key}>
              {value}
            </Select.Option>
          ))}
        </Select>

        <Checkbox
          checked={filter.isArchive}
          onChange={(e) => dispatch(updateFilters({isArchive: e.target.checked}))}
        >
          В архиве
        </Checkbox>

        <Button data-testid="resetFilters" onClick={handleReset} icon={<ClearOutlined/>}/>
      </div>
      <Space>
        <Typography>Сортировка:</Typography>
        <Button data-testid="sortOrder" onClick={toggleSortOrder}
            icon={sortOrder === 'asc' ? <CaretUpOutlined/> : <CaretDownOutlined/>}/>
        <Select
          value={sortField}
          style={{width: 200}}
          onChange={handleSortChange}
          data-testid="sortField"
        >
          <Select.Option value="name">По имени</Select.Option>
          <Select.Option value="birthday">По дате рождения</Select.Option>
        </Select>
      </Space>
    </div>
  );
};

export default EmployeeFilter;
