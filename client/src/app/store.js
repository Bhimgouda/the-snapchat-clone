import {configureStore} from '@reduxjs/toolkit'
import cameraReducer from "../slices/cameraSlice"
import appReducer from "../slices/appSlice"

export const store = configureStore({
    reducer:{
        camera: cameraReducer,
        app: appReducer,
    }
})