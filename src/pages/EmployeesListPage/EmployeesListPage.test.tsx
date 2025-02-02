import React from 'react';
import {BrowserRouter as Router} from 'react-router';
import {render, screen, fireEvent, waitFor, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import {Provider} from 'react-redux';

import {createStore} from '../../store'

import EmployeesListPage from './EmployeesListPage';


describe('EmployeesListPage', () => {
  test('renders the employee list page with filters', () => {
    const employees = [
      {id: 1, name: 'Илья Емельянов', role: 'driver', phone: '+7 (883) 508-3269'},
      {id: 2, name: 'Александр Ларионов', role: 'waiter', phone: '+7 (823) 440-3602'},
      {id: 3, name: 'Алексей Семёнов', role: 'cook', phone: '+7 (915) 779-4671'},
    ];
    const store = createStore()

    store.dispatch({type: 'employees/setEmployees', payload: employees});

    act(() => {
      render(
        <Provider store={store}>
          <Router>
            <EmployeesListPage/>
          </Router>
        </Provider>
      );
    })

    // Проверяем, что сотрудники отображаются
    expect(screen.getByText('Илья Емельянов')).toBeInTheDocument();
    expect(screen.getByText('Александр Ларионов')).toBeInTheDocument();
    expect(screen.getByText('Алексей Семёнов')).toBeInTheDocument();
  });

  test('filters employees by role correctly', async () => {
    const employees = [
      {id: 1, name: 'Илья Емельянов', role: 'driver', phone: '+7 (883) 508-3269'},
      {id: 2, name: 'Александр Ларионов', role: 'waiter', phone: '+7 (823) 440-3602'},
      {id: 3, name: 'Алексей Семёнов', role: 'cook', phone: '+7 (915) 779-4671'},
    ];

    const store = createStore()

    store.dispatch({type: 'employees/setEmployees', payload: employees});

    act(() => {
      render(
        <Provider store={store}>
          <Router>
            <EmployeesListPage/>
          </Router>
        </Provider>
      );
    })

    // Применяем фильтр по роли
    // @ts-ignore
    await userEvent.click(screen.getByTestId('roleFilter').querySelector('[role="combobox"]'));
    const waiterOption = await screen.findByTitle('Официант')
    await userEvent.click(waiterOption);

    // Проверяем, что отображается только один сотрудник с ролью "waiter"
    await waitFor(() => expect(screen.getByText('Александр Ларионов')).toBeInTheDocument());
    expect(screen.queryByText('Илья Емельянов')).not.toBeInTheDocument();
    expect(screen.queryByText('Алексей Семёнов')).not.toBeInTheDocument();
  });

  test('filters employees by archive status correctly', async () => {
    const employees = [
      {id: 1, name: 'Илья Емельянов', role: 'driver', phone: '+7 (883) 508-3269', isArchive: true},
      {id: 2, name: 'Александр Ларионов', role: 'waiter', phone: '+7 (823) 440-3602', isArchive: false},
    ];

    const store = createStore()

    store.dispatch({type: 'employees/setEmployees', payload: employees});

    act(() => {
      render(
        <Provider store={store}>
          <Router>
            <EmployeesListPage/>
          </Router>
        </Provider>
      );
    })

    // Применяем фильтр по архиву
    await userEvent.click(screen.getByLabelText('В архиве'));

    // Проверяем, что отображается только сотрудник в архиве
    await waitFor(() => expect(screen.getByText('Илья Емельянов')).toBeInTheDocument());
    expect(screen.queryByText('Александр Ларионов')).not.toBeInTheDocument();
  });

  test('resets role filters correctly', async () => {
    const employees = [
      {id: 1, name: 'Илья Емельянов', role: 'driver', phone: '+7 (883) 508-3269', isArchive: true},
      {id: 2, name: 'Александр Ларионов', role: 'waiter', phone: '+7 (823) 440-3602', isArchive: false},
    ];

    const store = createStore()

    store.dispatch({type: 'employees/setEmployees', payload: employees});
    store.dispatch({type: 'employees/updateFilters', payload: {role: 'waiter'}})

    act(() => {
      render(
        <Provider store={store}>
          <Router>
            <EmployeesListPage/>
          </Router>
        </Provider>
      );
    })

    // Применяем фильтр по архиву
    await userEvent.click(screen.getByTestId('resetFilters'));

    // Проверяем, что отображается только сотрудник в архиве
    await waitFor(() => expect(screen.getByText('Илья Емельянов')).toBeInTheDocument());
    expect(screen.queryByText('Александр Ларионов')).toBeInTheDocument();
  })

  test('resets archive filters correctly', async () => {
    const employees = [
      {id: 1, name: 'Илья Емельянов', role: 'driver', phone: '+7 (883) 508-3269', isArchive: true},
      {id: 2, name: 'Александр Ларионов', role: 'waiter', phone: '+7 (823) 440-3602', isArchive: false},
    ];

    const store = createStore()

    store.dispatch({type: 'employees/setEmployees', payload: employees});
    store.dispatch({type: 'employees/updateFilters', payload: {isArchive: true}})

    act(() => {
      render(
        <Provider store={store}>
          <Router>
            <EmployeesListPage/>
          </Router>
        </Provider>
      );
    })

    // Применяем фильтр по архиву
    await userEvent.click(screen.getByTestId('resetFilters'));

    // Проверяем, что отображается только сотрудник в архиве
    await waitFor(() => expect(screen.getByText('Илья Емельянов')).toBeInTheDocument());
    expect(screen.queryByText('Александр Ларионов')).toBeInTheDocument();
  })

  test('sorts employees by name correctly (ascending)', async () => {
    const employees = [
      {id: 1, name: 'Илья Емельянов', role: 'driver', phone: '+7 (883) 508-3269', birthday: '1990-01-01'},
      {id: 2, name: 'Александр Ларионов', role: 'waiter', phone: '+7 (823) 440-3602', birthday: '1988-06-15'},
      {id: 3, name: 'Алексей Семёнов', role: 'cook', phone: '+7 (915) 779-4671', birthday: '1995-10-03'},
    ];

    const store = createStore()

    store.dispatch({type: 'employees/setEmployees', payload: employees});

    act(() => {
      render(
        <Provider store={store}>
          <Router>
            <EmployeesListPage/>
          </Router>
        </Provider>
      );
    })

    // Применяем сортировку по имени (по возрастанию)
    // @ts-ignore
    await userEvent.click(screen.getByTestId('sortField').querySelector('[role="combobox"]'));
    const sortFieldOptions = await screen.findAllByText('По имени');
    // @ts-ignore
    await userEvent.click(sortFieldOptions.find((element: Element) => element.classList.contains('ant-select-item-option-content')));

    // Проверяем, что сотрудники отсортированы по имени (по возрастанию)
    const names = screen.getAllByRole('row').map((row) => row.textContent);
    expect(names[1]).toContain('Александр Ларионов');
    expect(names[2]).toContain('Алексей Семёнов');
    expect(names[3]).toContain('Илья Емельянов');
  });

  test('sorts employees by name correctly (descending)', async () => {
    const employees = [
      {id: 1, name: 'Илья Емельянов', role: 'driver', phone: '+7 (883) 508-3269', birthday: '1990-01-01'},
      {id: 2, name: 'Александр Ларионов', role: 'waiter', phone: '+7 (823) 440-3602', birthday: '1988-06-15'},
      {id: 3, name: 'Алексей Семёнов', role: 'cook', phone: '+7 (915) 779-4671', birthday: '1995-10-03'},
    ];

    const store = createStore()

    store.dispatch({type: 'employees/setEmployees', payload: employees});

    act(() => {
      render(
        <Provider store={store}>
          <Router>
            <EmployeesListPage/>
          </Router>
        </Provider>
      );
    })

    // Применяем сортировку по имени (по убыванию)
    // @ts-ignore
    await userEvent.click(screen.getByTestId('sortField').querySelector('[role="combobox"]'));
    const sortFieldOptions = await screen.findAllByText('По имени');
    // @ts-ignore
    await userEvent.click(sortFieldOptions.find((element: Element) => element.classList.contains('ant-select-item-option-content')));
    await userEvent.click(screen.getByTestId('sortOrder'))

    // Проверяем, что сотрудники отсортированы по имени (по убыванию)
    const names = screen.getAllByRole('row').map((row) => row.textContent);
    expect(names[1]).toContain('Илья Емельянов');
    expect(names[2]).toContain('Алексей Семёнов');
    expect(names[3]).toContain('Александр Ларионов');
  });

  test('sorts employees by birthday correctly (ascending)', async () => {
    const employees = [
      {id: 1, name: 'Илья Емельянов', role: 'driver', phone: '+7 (883) 508-3269', birthday: '03.12.1974'},
      {id: 2, name: 'Александр Ларионов', role: 'waiter', phone: '+7 (823) 440-3602', birthday: '03.12.1994'},
      {id: 3, name: 'Алексей Семёнов', role: 'cook', phone: '+7 (915) 779-4671', birthday: '03.12.1984'},
    ];

    const store = createStore()

    store.dispatch({type: 'employees/setEmployees', payload: employees});

    act(() => {
      render(
        <Provider store={store}>
          <Router>
            <EmployeesListPage/>
          </Router>
        </Provider>
      );
    })

    // Применяем сортировку по дате рождения (по возрастанию)
    // @ts-ignore
    await userEvent.click(screen.getByTestId('sortField').querySelector('[role="combobox"]'));
    const sortFieldOptions = await screen.findAllByText('По дате рождения');
    // @ts-ignore
    await userEvent.click(sortFieldOptions.find((element: Element) => element.classList.contains('ant-select-item-option-content')));

    await userEvent.click(screen.getByTestId('sortOrder'))

    await new Promise((r) => setTimeout(r, 2000))
    // Проверяем, что сотрудники отсортированы по дате рождения (по возрастанию)
    const birthdays = await screen.getAllByRole('row').map((row) => row.textContent);

    expect(birthdays[1]).toContain('Илья Емельянов');
    expect(birthdays[2]).toContain('Алексей Семёнов');
    expect(birthdays[3]).toContain('Александр Ларионов');
  });

  test('sorts employees by birthday correctly (descending)', async () => {
    const employees = [
      {id: 1, name: 'Илья Емельянов', role: 'driver', phone: '+7 (883) 508-3269', birthday: '03.12.1974'},
      {id: 2, name: 'Александр Ларионов', role: 'waiter', phone: '+7 (823) 440-3602', birthday: '03.12.1994'},
      {id: 3, name: 'Алексей Семёнов', role: 'cook', phone: '+7 (915) 779-4671', birthday: '03.12.1984'},
    ];

    const store = createStore()

    store.dispatch({type: 'employees/setEmployees', payload: employees});

    act(() => {
      render(
        <Provider store={store}>
          <Router>
            <EmployeesListPage/>
          </Router>
        </Provider>
      );
    })

    // Применяем сортировку по дате рождения (по убыванию)
    // @ts-ignore
    await userEvent.click(screen.getByTestId('sortField').querySelector('[role="combobox"]'));
    const sortFieldOptions = await screen.findAllByText('По дате рождения');
    // @ts-ignore
    await userEvent.click(sortFieldOptions.find((element: Element) => element.classList.contains('ant-select-item-option-content')));

    // Проверяем, что сотрудники отсортированы по дате рождения (по убыванию)
    const birthdays = screen.getAllByRole('row').map((row) => row.textContent);
    expect(birthdays[1]).toContain('Александр Ларионов');
    expect(birthdays[2]).toContain('Алексей Семёнов');
    expect(birthdays[3]).toContain('Илья Емельянов');
  })

  test('renders and clicks "Добавить сотрудника" button', () => {
    const employees = [
      {id: 1, name: 'Илья Емельянов', role: 'driver', phone: '+7 (883) 508-3269'},
      {id: 2, name: 'Александр Ларионов', role: 'waiter', phone: '+7 (823) 440-3602'},
    ];

    const store = createStore()

    store.dispatch({type: 'employees/setEmployees', payload: employees});

    act(() => {
      render(
        <Provider store={store}>
          <Router>
            <EmployeesListPage/>
          </Router>
        </Provider>
      );
    })

    // Проверяем наличие кнопки "Добавить сотрудника"
    const addButton = screen.getByText('Добавить');
    expect(addButton).toBeInTheDocument();

    // Кликаем на кнопку
    fireEvent.click(addButton);

    // Проверяем, что мы перешли на страницу добавления сотрудника
    expect(window.location.pathname).toBe('/add');
  })
});

export {}