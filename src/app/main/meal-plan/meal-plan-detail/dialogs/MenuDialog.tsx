import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/store';
import { setMenuDialog, selectMenuDialogState, createMenu, selectMenuSample, removeBirdItem, createMealItems } from '../store/menusSlice';
import { useRef, useState } from 'react';
import { showMessage } from 'app/store/fuse/messageSlice';

export default function MenuDialog(props) {
    const { birds } = props
    console.log("birds",birds)
    const dispatch = useAppDispatch()
    const open = useAppSelector(selectMenuDialogState)
    const menuSamples = useAppSelector(selectMenuSample)
    console.log(menuSamples.filter(menu => menu.name == "High quality"))
    const [menuType, setMenuType] = useState("");
    let mornigId
    let lunchId
    let afternoonId
    let eveningId
    const handleChange = (event) => {
        setMenuType(event.target.value);
    }
    function handleClose() {
        dispatch(setMenuDialog(false))
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    for (let bird of birds) {
                        
                        for (let menu of menuSamples) {
                            if (bird.species.id == menu.species.id && bird.careMode.id == menu.careMode.id) {
                                for (let birdMeal of bird.menu.menuMeals){
                                    mornigId= birdMeal.find(meal=>meal.name=="Morning")
                                    lunchId= birdMeal.find(meal=>meal.name=="Lunch")
                                    afternoonId= birdMeal.find(meal=>meal.name=="Afternoon")
                                    eveningId= birdMeal.find(meal=>meal.name=="Evening")
                                    for (let birdItem of birdMeal.mealItems)
                                    dispatch(removeBirdItem({
                                        itemId: birdItem.id,
                                        mealId: birdMeal.id,
                                        birdId: bird.id
                                    }))
                                    for (let meal of menu.menuMealSamples) {
                                        switch (meal.name) {
                                            case "Morning":
                                                for (let [index, itemSample] of meal.mealItemSamples){
                                                    const newMealItems = {
                                                        menuMealId: mornigId,
                                                        foodId: itemSample.food.id,
                                                        quantity: 1,
                                                        order: index
                                                    }
                                                    const mealItemData = {
                                                        data: newMealItems,
                                                        birdId: bird.id
                                                    }
                                                    dispatch(createMealItems(mealItemData))
                                                }
                                                break;
                                            case "Lunch":
                                                for (let [index, itemSample] of meal.mealItemSamples){
                                                    const newMealItems = {
                                                        menuMealId: lunchId,
                                                        foodId: itemSample.food.id,
                                                        quantity: 1,
                                                        order: index
                                                    }
                                                    const mealItemData = {
                                                        data: newMealItems,
                                                        birdId: bird.id
                                                    }
                                                    dispatch(createMealItems(mealItemData))
                                                }
                                                break;
                                            case "Afternoon":
                                                for (let [index, itemSample] of meal.mealItemSamples){
                                                    const newMealItems = {
                                                        menuMealId: afternoonId,
                                                        foodId: itemSample.food.id,
                                                        quantity: 1,
                                                        order: index
                                                    }
                                                    const mealItemData = {
                                                        data: newMealItems,
                                                        birdId: bird.id
                                                    }
                                                    dispatch(createMealItems(mealItemData))
                                                }
                                                break;
                                            case "Evening":
                                                for (let [index, itemSample] of meal.mealItemSamples){
                                                    const newMealItems = {
                                                        menuMealId: eveningId,
                                                        foodId: itemSample.food.id,
                                                        quantity: 1,
                                                        order: index
                                                    }
                                                    const mealItemData = {
                                                        data: newMealItems,
                                                        birdId: bird.id
                                                    }
                                                    dispatch(createMealItems(mealItemData))
                                                }
                                                break;
                                        }
                                    }
                                }
                            
                            }
                        }
                    }
                    const msg = {
                        variant: 'success',
                        autoHideDuration: 2000,
                        message: `Add menu successfully`,
                    }
                    handleClose()
                    dispatch(showMessage(msg))

                }
            }}
        >
            <div className="flex justify-center">
                <DialogTitle className="font-oleoScript text-40" >Menu sample </DialogTitle>
            </div>
            <DialogContent>
                <InputLabel id="demo-simple-select-label">Type of menu</InputLabel>
                <Select

                    value={menuType}
                    onChange={handleChange}
                    className='w-[200px]'
                >
                    <MenuItem value={"Low quality"}>Low quality</MenuItem>
                    <MenuItem value={"High quality"}>High quality</MenuItem>
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Add</Button>
            </DialogActions>
        </Dialog >
    )
}
