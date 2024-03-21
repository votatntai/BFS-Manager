import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCages, getTask} from "src/app/auth/services/api/callAPI";
import { Cage } from "../type/cage.type";

export const getCageData = createAsyncThunk('cageReducer/getCages', async (object: Object) => {
	try {
	  const response = await getCages(object);
	  return response;
	} catch (error) {
	  console.log(error);
	}
  });
export const getTaskData = createAsyncThunk('cageReducer/getTasks', async (object: Object) => {
	try {
	  const response = await getTask(object);
	  return response;
	} catch (error) {
	  console.log(error);
	}
  });

const taskManagementSlice = createSlice({
	name: 'taskManagementReducer',
	initialState: {
		searchText:'',
        cageList: {
			pagination:{
				"pageNumber": 0,
				"pageSize": 8,
				"totalRow": 0
			},
			data: []
		},
		taskList:{
			pagination:{
				"pageNumber": 0,
				"pageSize": 8,
				"totalRow": 0
			},
			data: []
		}
    },
	reducers: {
		setSearchText: (state,action)=>{
            state.searchText = action.payload as string
        },
		setPaginPageNumber: (state, action) => {
			state.taskList.pagination.pageNumber = action.payload as number
		},
		setPaginPageSize: (state, action) => {
			state.taskList.pagination.pageSize = action.payload as number
		},
		setPaginTotalRow: (state, action) => {
			state.taskList.pagination.totalRow = action.payload as number
		},
	},
	extraReducers: (builder) => {
		builder
            .addCase(getCageData.fulfilled, (state, action: any) => {
                state.cageList = action.payload;
            })  
            .addCase(getTaskData.fulfilled, (state, action: any) => {
                state.taskList = action.payload;
            })  
	}
});

export const {setSearchText,setPaginPageNumber,setPaginPageSize,setPaginTotalRow} = taskManagementSlice.actions
const taskManagementReducer = taskManagementSlice.reducer;
export default taskManagementReducer
