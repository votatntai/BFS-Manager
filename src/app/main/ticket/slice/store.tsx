import { combineReducers } from '@reduxjs/toolkit';
import ticket from './ticketSlice';
const reducer = combineReducers({
    ticket
})

export default reducer