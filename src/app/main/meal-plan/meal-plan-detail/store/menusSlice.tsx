import axios from 'axios';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { RootStateType } from 'app/store/types';
import { PlanType } from '../../calendar/types/PlanType';


export type AppRootStateType = RootStateType<menusSliceType>;

export const getCareMode = createAppAsyncThunk('mealPlanReducer/menus/getCareMode', async () => {
    const response = await axios.get('/care-modes');
    const data = (await response.data);
    return data;
});

export const getSpecies = createAppAsyncThunk('mealPlanReducer/menus/getSpecies', async () => {
    const response = await axios.get('/species');
    const data = (await response.data);
    return data;
});
export const getMenuSample = createAppAsyncThunk<any,any>('mealPlanReducer/menus/getMenuSample', async (item) => {
    const { speciesId, careModeId } = item;
    const response = await axios.get(`/menu-samples?speciesId=${speciesId}&careModeId=${careModeId}`);
    const data = (await response.data);
    return data;
});
export const getFoods = createAppAsyncThunk('mealPlanReducer/menus/getFoods', async () => {
    const response = await axios.get('/foods');
    const data = (await response.data);
    return data;
});
export const createMenu = createAppAsyncThunk<any, any>('mealPlanReducer/menus/createMenu',
    async (dataItem) => {
        const response = await axios.post('/menus', dataItem);
        const data = (await response.data);
        return data;
    });
export const createMenuMeal = createAppAsyncThunk<any, any>('mealPlanReducer/menus/createMenuMeal',
    async (dataItem) => {
        const response = await axios.post('/menu-meals', dataItem);
        const data = (await response.data);
        return data;
    });
export const createPlan = createAppAsyncThunk<any, any>('mealPlanReducer/menus/createPlan',
    async (dataItem) => {
        const response = await axios.post('/plans', dataItem);
        const data = (await response.data);
        return data;
    });
export const createMealItems = createAppAsyncThunk<any, any>('mealPlanReducer/menus/createMealItems',
    async (dataItem) => {
        const response = await axios.post('/meal-items', dataItem);
        const data = (await response.data);
        return data;
    });
export const removeMealItem = createAppAsyncThunk<any, any>('mealPlanReducer/menus/removeMealItem',
    async (item) => {
        const { itemId } = item;
        const response = await axios.delete(`/meal-items/${itemId}`);
        const data = (await response.data);
        return data;
    });
export const getPlanById = createAppAsyncThunk<any, any>('mealPlanReducer/plans/getPlanById', async (planId) => {
    const response = await axios.get(`/plans/${planId}`);
    const data = (await response.data);
    return data;
});
export const updateMealItem = createAppAsyncThunk<any, any>('mealPlanReducer/plans/updateMealItem',
    async (item) => {
        const { itemId, newItem } = item
        const response = await axios.put(`/meal-items/${itemId}`, newItem);
        const data = (await response.data);
        return data;
    });

const menusAdapter = createEntityAdapter({});

export const { selectAll: selectCages, selectById: selectCageByid } = menusAdapter.getSelectors(
    (state: AppRootStateType) => state.mealPlanReducer.menus

);

const initialState = menusAdapter.getInitialState({
    searchText: '',
    species: [],
    careMode: [],
    menuSample:[],
    mealDialog: {
        data: [],
        isOpen: false,
    },
    mealItemDialogState: {
        mealId: "",
        isOpen: false,
        foods: [],
        mealItems: [],
    },
    menuDialogState: {
        isOpen: false,
    },
    menus: {},
    plans: {} as PlanType
});


export const menusSlice = createSlice({
    name: 'mealPlanReducer/menus',
    initialState,
    reducers: {
        setSearchText: (state, action) => {
            state.searchText = action.payload as string;
        },
        setDialogState: (state, action) => {
            state.mealDialog.isOpen = action.payload
        },
        setMealitemsDialog: (state, action) => {
            state.mealItemDialogState.isOpen = action.payload
        },
        setMenuDialog: (state, action) => {
            state.menuDialogState.isOpen = action.payload
        },
        addMealItems(state, action) {
            const { mealId, mealItems } = action.payload;
            const existingMeal = state.mealDialog.data.find(meal => meal.id === mealId);

            if (existingMeal) {
                if (!existingMeal.hasOwnProperty('mealItems')) {
                    existingMeal.mealItems = [];
                }
                mealItems.forEach(newItem => {
                    if (!existingMeal.mealItems.some(existingItem => existingItem.id === newItem.id)) {
                        existingMeal.mealItems.push(newItem);
                    }

                })
            }
        },
        addMealId: (state, action) => {
            state.mealItemDialogState.mealId = action.payload
        },
        resetPlan: () => initialState,
        decreaseQuantity: (state, action) => {
            const data = state.plans?.menu?.menuMeals.find(meal => meal?.id == action.payload.mealId)
            const item = data.mealItems.find(item => item.id == action.payload.itemId)
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    item.hasChanged = true;
                }
            }
        },
        increaseQuantity: (state, action) => {
            const data = state.plans?.menu?.menuMeals.find(meal => meal?.id == action.payload.mealId)
            const item = data.mealItems.find(item => item.id == action.payload.itemId)
            if (item) {
                item.quantity += 1;
                item.hasChanged = true;
            }
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(getSpecies.fulfilled, (state, action) => {
                state.species = action.payload.data
            })
            .addCase(getCareMode.fulfilled, (state, action) => {
                state.careMode = action.payload.data
            })
            .addCase(getFoods.fulfilled, (state, action) => {
                state.mealItemDialogState.foods = action.payload.data
            })
            .addCase(createMenu.fulfilled, (state, action) => {
                state.menus = action.payload
            })
            .addCase(createPlan.fulfilled, (state, action) => {
                state.plans = action.payload
            })
            .addCase(getPlanById.fulfilled, (state, action) => {
                state.plans = action.payload
            })
            .addCase(createMenuMeal.fulfilled, (state, action) => {
                state.plans?.menu?.menuMeals.push(action.payload)
            })
            .addCase(createMealItems.fulfilled, (state, action) => {
                const data = state.plans?.menu?.menuMeals.find(meal => meal?.id == action.meta.arg.menuMealId)
                data.mealItems.push(action.payload)
            })
            .addCase(removeMealItem.fulfilled, (state, action) => {
                const data = state.plans?.menu?.menuMeals.find(meal => meal?.id == action.meta.arg.mealId)

                const index = data.mealItems.findIndex(item => item.id === action.meta.arg.itemId)
                if (index !== -1) {
                    data.mealItems.splice(index, 1)
                }
            })
            .addCase(updateMealItem.fulfilled, (state, action) => {

            })
            .addCase(getMenuSample.fulfilled, (state, action) => {
                state.menuSample=action.payload.data
            })



    }
});

export const { increaseQuantity, decreaseQuantity, resetPlan, addMealId, setDialogState, setMealitemsDialog, setMenuDialog, addMealItems } = menusSlice.actions;

export const selectCageSearchText = (state: AppRootStateType) => state.mealPlanReducer?.menus

export const selectSpecies = (state) => state.mealPlanReducer?.menus.species;
export const selectCareModes = (state) => state.mealPlanReducer?.menus.careMode;
export const selectMeals = (state: AppRootStateType) => state.mealPlanReducer?.menus.mealDialog.data
export const selectFoods = (state: AppRootStateType) => state.mealPlanReducer?.menus.mealItemDialogState.foods
export const selectMenuId = (state: AppRootStateType) => state.mealPlanReducer?.menus.menus
export const selectPlanById = (state: AppRootStateType) => state.mealPlanReducer?.menus.plans
export const selectDialogState = (state: AppRootStateType) => state.mealPlanReducer?.menus.mealDialog.isOpen
export const selectMealItemsDialogState = (state: AppRootStateType) => state.mealPlanReducer?.menus.mealItemDialogState.isOpen
export const selectMealItemsDialogProp = (state: AppRootStateType) => state.mealPlanReducer?.menus.mealItemDialogState.mealItems
export const selectMealId = (state: AppRootStateType) => state.mealPlanReducer?.menus.mealItemDialogState.mealId
export const selectMenuDialogState = (state: AppRootStateType) => state.mealPlanReducer?.menus.menuDialogState.isOpen
export const selectMenuSample = (state: AppRootStateType) => state.mealPlanReducer?.menus.menuSample
export type menusSliceType = typeof menusSlice;
export default menusSlice.reducer;
