// src/store/employeeSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import employees from './employees.json'

export interface Employee {
  id: number;
  name: string;
  role: string;
  phone: string;
  birthday: string;
  isArchive: boolean;
}

export interface Filter {
  role?: string;
  isArchive?: boolean;
}

export interface EmployeeState {
  employees: Employee[];
  filter: Filter;
}

const initialState: EmployeeState = {
  employees, // Здесь будут наши данные
  filter: {
    role: undefined,
    isArchive: undefined,
  },
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    // Редьюсер для обновления фильтров
    updateFilters(state, action: PayloadAction<Filter>) {
      state.filter = {...state.filter, ...action.payload};
    },
    // Обновление данных сотрудников
    setEmployees(state, action: PayloadAction<Employee[]>) {
      state.employees = action.payload;
    },
    updateEmployee(state, action: PayloadAction<Employee>) {
      const index = state.employees.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    addEmployee(state, action: PayloadAction<Employee>) {
      state.employees.push(action.payload);
    },
  },
});

export const {updateEmployeesFilter, setEmployees, updateEmployee, addEmployee} = employeeSlice.actions;
export default employeeSlice.reducer;
