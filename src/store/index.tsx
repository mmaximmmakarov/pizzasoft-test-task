import {configureStore} from '@reduxjs/toolkit'
import employeeSlice from './employeeSlice'

export const createStore = () => configureStore({
  reducer: {
    employees: employeeSlice,
  }
})

const store = createStore()

// @ts-ignore
window.getState = store.getState

export default store
