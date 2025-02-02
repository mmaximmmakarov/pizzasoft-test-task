import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';

import EmployeesListPage from './pages/EmployeesListPage/EmployeesListPage';
import EmployeePage from './pages/EmployeePage/EmployeePage';
import AddEmployeePage from "./pages/AddEmployeePage/AddEmployeePage";

import store from './store'

const App: React.FC = () => {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route index element={<EmployeesListPage/>}/>
          <Route path="/edit/:id" element={<EmployeePage/>}/>
            <Route path="/add" element={<AddEmployeePage/>}/>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
