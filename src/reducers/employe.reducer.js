import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employeState: [],
  existEmployeState: false,
  filteredEmployeesState: [],
  employeesPerPageState: 12,
  currentPageState: 1,
};
export const employeSlice = createSlice({
  name: 'employes',
  initialState,
  reducers: {
    employe: (state, action) => {
      state.employeState = action.payload;
    },
    existEmploye: (state, action) => {
      state.existEmployeState = action.payload;
    },
    filteredEmployees: (state, action) => {
      state.filteredEmployeesState = action.payload;
    },
    employeesPerPage: (state, action) => {
      state.employeesPerPageState = action.payload;
    },
    currentPage: (state, action) => {
      state.currentPageState = action.payload;
    },
  },
});
export const {
  employe,
  existEmploye,
  filteredEmployees,
  employeesPerPage,
  currentPage,
} = employeSlice.actions;
export default employeSlice.reducer;
