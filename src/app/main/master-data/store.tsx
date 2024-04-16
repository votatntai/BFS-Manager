import { combineReducers } from '@reduxjs/toolkit';
import birdSlice from './bird/slice/birdSlice';
const reducer = combineReducers({
    birdSlice,
})

export default reducer