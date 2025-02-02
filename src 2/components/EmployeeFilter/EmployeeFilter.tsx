// src/components/EmployeeFilter.tsx
import React from 'react';
import { Select, Button, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router";
import { updateEmployeesFilter } from '../../store/employeeSlice';
import roles from '../../helpers/roles'

import './EmployeeFilter.scss'


const EmployeeFilter: React.FC = () => {
    const dispatch = useDispatch();
    const filter = useSelector((state: any) => state.employees.filter);

    const handleReset = () => {
        dispatch(updateEmployeesFilter({ role: undefined, isArchive: undefined }));
    };

    return (
        <div className="filters-container">
            <div className="filters">
                <Select
                    value={filter.role}
                    placeholder="Выберите должность"
                    style={{ width: 200 }}
                    onChange={(value) => dispatch(updateEmployeesFilter({ role: value }))}
                >
                    {Object.entries(roles).map(([key, value]) => (
                        <Select.Option key={key} value={key}>
                            {value}
                        </Select.Option>
                    ))}
                </Select>

                <Checkbox
                    checked={filter.isArchive}
                    onChange={(e) => dispatch(updateEmployeesFilter({ isArchive: e.target.checked }))}
                >
                    В архиве
                </Checkbox>
            </div>
            <div className="reset-button">
                <Button type="link" onClick={handleReset}>
                    Сбросить фильтры
                </Button>
            </div>
        </div>
    );
};

export default EmployeeFilter;
