import React from 'react';
import {BrowserRouter as Router} from 'react-router';
import {render, screen, fireEvent, waitFor, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import {Provider} from 'react-redux';

import {createStore} from '../../store'

import EmployeeFilter from './EmployeeFilter';


describe('EmployeeFilter', () => {
  test('renders filter options and updates store on change', async () => {
    const store = createStore()

    act(() => {
      render(
        <Provider store={store}>
          <Router>
            <EmployeeFilter/>
          </Router>
        </Provider>
      );
    })

    // Проверяем, что фильтры отображаются
    expect(screen.getByTestId('resetFilters')).toBeInTheDocument();
    expect(screen.getByText('Выберите должность')).toBeInTheDocument();
    expect(screen.getByText('В архиве')).toBeInTheDocument();


    // Проверка первоначального состояния фильтров
    expect(store.getState().employees.filter.role).toBeUndefined();
    expect(store.getState().employees.filter.isArchive).toBeUndefined();

    // Изменяем фильтр по роли
    // @ts-ignore
    await userEvent.click(screen.getByTestId('roleFilter').querySelector('[role="combobox"]'));
    const waiterOption = await screen.findByTitle('Официант')
    await userEvent.click(waiterOption)
    expect(store.getState().employees.filter.role).toBe('waiter');

    // Изменяем фильтр по архиву
    await userEvent.click(screen.getByLabelText('В архиве'));
    expect(store.getState().employees.filter.isArchive).toBe(true);

    // Проверяем сброс фильтров
    fireEvent.click(screen.getByTestId('resetFilters'));
    expect(store.getState().employees.filter.role).toBeUndefined();
    expect(store.getState().employees.filter.isArchive).toBeUndefined();
  });

  test('renders sort options and updates store on change', async () => {
    const store = createStore()

    act(() => {
      render(
        <Provider store={store}>
          <Router>
            <EmployeeFilter/>
          </Router>
        </Provider>
      );
    })

    // Проверяем, что фильтры отображаются
    expect(screen.getByTestId('sortField')).toBeInTheDocument();
    expect(screen.getByTestId('sortOrder')).toBeInTheDocument();

    // Проверка первоначального состояния сортировки
    expect(store.getState().employees.sort.field).toBe('name');
    expect(store.getState().employees.sort.order).toBe('asc')

    // Изменяем параметр сортировки
    // @ts-ignore
    await userEvent.click(screen.getByTestId('sortField').querySelector('[role="combobox"]'));
    const sortOption = await screen.findByTitle('По дате рождения')
    await userEvent.click(sortOption)
    expect(store.getState().employees.sort.field).toBe('birthday')

    // Изменяем направление сортировки
    fireEvent.click(screen.getByTestId('sortOrder'))
    expect(store.getState().employees.sort.order).toBe('desc')
  });
})

export {}
