import {configureStore} from '@reduxjs/toolkit'
import employeeSlice from './employeeSlice'

export default configureStore({
  reducer: {
  employees: employeeSlice,
  },
})
