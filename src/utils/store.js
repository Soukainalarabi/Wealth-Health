import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../reducers/modal.reducer"
export const store= configureStore({
    reducer:{
        modal: modalReducer,
    }
})