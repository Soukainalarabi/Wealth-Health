import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '../reducers/modal.reducer';
import employeReducer from '../reducers/employe.reducer';

const store = configureStore({
  reducer: {
    modal: modalReducer,
    employes: employeReducer,
  },
});
export default store;
