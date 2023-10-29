import {createSlice} from "@reduxjs/toolkit"
const initialState={
    show:false,
    isFormIncomplete:false,

}
export const modalSlice=createSlice({
    name:'modal',
    initialState,
    reducers:{
        showModal: (state, action) => {
            state.show= action.payload;
            
          },
        
        formError: (state, action) => {
            state.isFormIncomplete = action.payload;
          },
    }
})
export const { showModal, formError } = modalSlice.actions;
export default  modalSlice.reducer;
