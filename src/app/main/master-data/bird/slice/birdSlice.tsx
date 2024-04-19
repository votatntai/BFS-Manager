import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBirds,updateBird,createBird } from "src/app/auth/services/api/callAPI";
export const getBirdData = createAsyncThunk('birdReducer/getBirds', async (object: Object) => {
	try {
	  const response = await getBirds(object);
	  return response;
	} catch (error) {
	  console.log(error);
	}
  });
export const editBird = createAsyncThunk('birdReducer/editBird', async (object: {id:string, formData: FormData}) => {
	try {
	  const response = await updateBird(object.id, object.formData);
	  return response;
	} catch (error) {
	  console.log(error);
	}
  });

export const addBird = createAsyncThunk('birdReducer/addBird', async (formData: FormData) => {
	try {
	  const response = await createBird(formData);
	  return response;
	} catch (error) {
	  console.log(error);
	}
  });

const birdSlice = createSlice({
	name: 'birdReducer',
	initialState: {
		searchText:'',
        birds: {
			pagination:{
				"pageNumber": 0,
				"pageSize": 8,
				"totalRow": 0
			},
			data: []
		},
    },
	reducers: {
		setSearchText: (state,action)=>{
            state.searchText = action.payload as string
        },
		setPaginPageNumber: (state, action) => {
			state.birds.pagination.pageNumber = action.payload as number
		},
		setPaginPageSize: (state, action) => {
			state.birds.pagination.pageSize = action.payload as number
		},
		setPaginTotalRow: (state, action) => {
			state.birds.pagination.totalRow = action.payload as number
		},
	},
	extraReducers: (builder) => {
		builder
            .addCase(getBirdData.fulfilled, (state, action: any) => {
                state.birds = action.payload;
            })
            .addCase(editBird.fulfilled, (state, action: any) => {})
            .addCase(addBird.fulfilled, (state, action: any) => {})
	}
});

export const {setSearchText,setPaginPageNumber,setPaginPageSize,setPaginTotalRow} = birdSlice.actions
const birdReducer = birdSlice.reducer;
export default birdReducer
