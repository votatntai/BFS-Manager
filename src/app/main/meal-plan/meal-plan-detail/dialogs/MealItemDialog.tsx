import { Avatar, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/store';
import { useEffect, useState } from 'react';
import { addMealItems, createMealItems, getFoods, selectFoods, selectMealId, selectMealItemsDialogState, selectMeals, setMealitemsDialog } from '../store/menusSlice';

type MealItemsProp = {
    id: string
}
export default function MealItemDialog() {
    // const { id } = props
    // console.log("id",id)
    const id = useAppSelector(selectMealId)
    const dispatch = useAppDispatch()
    const open = useAppSelector(selectMealItemsDialogState)
    const meals = useAppSelector(selectMeals)
    const foods = useAppSelector(selectFoods)
    const [checked, setChecked] = useState([]);
    useEffect(() => {
        dispatch(getFoods())
    }, [])

    function handleClose() {
        dispatch(setMealitemsDialog(false))
    }
    // form handler
    function onSubmit(data) {
        data.forEach((mealItem, index) => {
            const newMealItems = {
                menuMealId: id,
                foodId: mealItem.id,
                quantity: 1,
                order: index
            }
            dispatch(createMealItems(newMealItems))
            handleClose()
        });

    }
    // List food handler
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    onSubmit(checked); // Pass the checked items to onSubmit Function
                }
            }}
        >
            <div className="flex justify-center">
                <DialogTitle className="font-oleoScript text-40" >Add food</DialogTitle>

            </div>
            <DialogContent>
                <List sx={{ width: '100%', backgroundColor: 'red', maxWidth: 699, bgcolor: 'background.paper' }}>
                    {foods.map((food) => {
                        const labelId = `checkbox-list-label-${food}`;

                        return (
                            <ListItem
                                className=' w-512'
                                key={food.id}
                                secondaryAction={
                                    <ListItemAvatar>
                                        <Avatar
                                            src={food?.thumbnailUrl}
                                        />
                                    </ListItemAvatar>

                                }
                                disablePadding
                            >
                                <ListItemButton role={undefined} onClick={handleToggle(food)} dense>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={checked.indexOf(food) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={food.name} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Add</Button>
            </DialogActions>
        </Dialog>
    )
}
