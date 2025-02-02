import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import employees from './employees.json'

export interface Employee {
  id: number;
  name: string;
  role: string;
  phone: string;
  birthday: string;
  isArchive?: boolean;
}

export interface Filter {
  role?: string;
  isArchive?: boolean;
}

export interface Sort {
  field: string;
  order: string;
}

export interface EmployeeState {
  employees: Employee[];
  filter: Filter;
  sort: Sort
}

const initialState: EmployeeState = {
  employees, // Здесь будут наши данные
  filter: {
    role: undefined,
    isArchive: undefined,
  },
  sort: {
    field: 'name',  // по умолчанию сортировка по имени
    order: 'asc',   // по умолчанию сортировка по возрастанию
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
    updateSortParams: (state, action) => {
      const {sortField, sortOrder} = action.payload;
      if (sortField) state.sort.field = sortField;
      if (sortOrder) state.sort.order = sortOrder;
    },
    addEmployee(state, action: PayloadAction<Employee>) {
      state.employees.push(action.payload);
    },
  },
});


export const {updateFilters, setEmployees, updateEmployee, addEmployee, updateSortParams} = employeeSlice.actions;

export default employeeSlice.reducer;
