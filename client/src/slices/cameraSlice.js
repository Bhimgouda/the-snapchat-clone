import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cameraImage: null,
}

export const cameraSlice = createSlice({
    name: 'camera',
    initialState,
    reducers:{
        setCameraImage: (state, action)=>{
            state.cameraImage = action.payload;
        },
        resetCameragImage:(state)=>{
            state.cameraImage = null
        }
    }
})

export const {setCameraImage, resetCameragImage} = cameraSlice.actions;

export const selectCameraImage = (state)=> state.camera.cameraImage;

export default cameraSlice.reducer;