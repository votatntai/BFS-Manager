import { useAppDispatch, useAppSelector } from 'app/store'
import React, { useEffect } from 'react'
import { createPFoodNormItem, getBirds, removeMealItem, removeMenuMeal, selectBirds, selectPlanById, setMenuDialog } from '../store/menusSlice'
import BirdCard from './cards/BirdCard'
import { BirdType } from '../type/MenuType'
import { Button } from '@mui/material'
import { forEach } from 'lodash'
import { menuMeals } from '../tabs/FoodNormTab'
import { MealItemType } from '../../calendar/types/PlanType'
import MenuDialog from '../dialogs/MenuDialog'
import { showMessage } from 'app/store/fuse/messageSlice'

export default function BirdMenus() {
    const dispatch = useAppDispatch()
    const plan = useAppSelector(selectPlanById)
    const cageId = plan?.cage?.id;
    const birds = useAppSelector(selectBirds)
    const birdList: Partial<BirdType>[] = birds.filter(bird => bird.cage.id === cageId);
    useEffect(
        () => {
            dispatch(getBirds())
        }
        , []
    )
    let morning: MealItemType[] = []
    let lunch: MealItemType[] = []
    let evening: MealItemType[] = []
    let afternoon: MealItemType[] = []
    function handleAplyTomenu() {
        birds.forEach(bird => {
            bird.menu.menuMeals.forEach(
                menuMeal => {
                    menuMeal.mealItems.forEach(mealItem => {
                        switch (menuMeal.name) {
                            case "Morning":
                                morning.push(mealItem)
                                break;
                            case "Lunch":
                                lunch.push(mealItem)
                                break;
                            case "Afternoon":
                                afternoon.push(mealItem)
                                break;
                            case "Evening":
                                evening.push(mealItem)
                                break;
                        }
                    });
                }
            )
        });

        for (let mealItem of groupByFoodId(morning)) {
            const menuMeals = plan.menu?.menuMeals
            const menuMeal = menuMeals.find(meal => meal.name == "Morning")
            menuMeals.forEach(meal => {
                if (meal.mealItems.length > 0) {
                    meal.mealItems.forEach(item => {
                        const data = {
                            itemId: item.id,
                            mealId: meal.id
                        }
                        dispatch(removeMealItem(data))
                    });
                }
            });
            const itemData = {
                menuMealId: menuMeal.id,
                foodId: mealItem.food.id,
                quantity: mealItem.quantity,
                order: mealItem.order
            }
            dispatch(createPFoodNormItem(itemData))

        }
        for (let mealItem of groupByFoodId(lunch)) {
            const menuMeals = plan.menu?.menuMeals
            const menuMeal = menuMeals.find(meal => meal.name == "Lunch")
            menuMeals.forEach(meal => {
                if (meal.mealItems.length > 0) {
                    meal.mealItems.forEach(item => {
                        const data = {
                            itemId: item.id,
                            mealId: meal.id
                        }
                        dispatch(removeMealItem(data))
                    });
                }
            });
            const itemData = {
                menuMealId: menuMeal.id,
                foodId: mealItem.food.id,
                quantity: mealItem.quantity,
                order: mealItem.order
            }
            dispatch(createPFoodNormItem(itemData))

        }
        for (let mealItem of groupByFoodId(evening)) {
            const menuMeals = plan.menu?.menuMeals
            const menuMeal = menuMeals.find(meal => meal.name == "Evening")
            menuMeals.forEach(meal => {
                if (meal.mealItems.length > 0) {
                    meal.mealItems.forEach(item => {
                        const data = {
                            itemId: item.id,
                            mealId: meal.id
                        }
                        dispatch(removeMealItem(data))
                    });
                }
            });
            const itemData = {
                menuMealId: menuMeal.id,
                foodId: mealItem.food.id,
                quantity: mealItem.quantity,
                order: mealItem.order
            }
            dispatch(createPFoodNormItem(itemData))

        }
        for (let mealItem of groupByFoodId(afternoon)) {
            const menuMeals = plan.menu?.menuMeals
            const menuMeal = menuMeals.find(meal => meal.name == "Afternoon")

            menuMeals.forEach(meal => {
                if (meal.mealItems.length > 0) {
                    meal.mealItems.forEach(item => {
                        const data = {
                            itemId: item.id,
                            mealId: meal.id
                        }
                        dispatch(removeMealItem(data))
                    });
                }
            });

            const itemData = {
                menuMealId: menuMeal.id,
                foodId: mealItem.food.id,
                quantity: mealItem.quantity,
                order: mealItem.order
            }
            dispatch(createPFoodNormItem(itemData))

        }
        const msg = {
            variant: 'success',
            autoHideDuration: 2000,
            message: `Apply menu successfully`,
        }
        dispatch(showMessage(msg))
    

    }
    function groupByFoodId(mealItems: MealItemType[]) {
        const grouped = mealItems.reduce((acc, item) => {
            const foodId = item.food.id;
            if (!acc[foodId]) {
                // Nếu chưa có foodId trong accumulator, thì tạo mới
                acc[foodId] = { ...item };
            } else {
                // Nếu đã có foodId trong accumulator, thì cộng dồn số lượng
                acc[foodId].quantity += item.quantity;
            }
            return acc;
        }, {});
        const list: MealItemType[] = Object.values(grouped)
        // Chuyển từ đối tượng thành mảng
        return list;
    }

    return (
        <div className="">
            <div className="flex items-center">
                <h4
                    className=" text-20 font-400   "
                >
                    Bird Menu
                </h4>

                <Button
                    className="mx-20"
                    onClick={() => {
                        dispatch(setMenuDialog(true))
                    }}
                    variant='contained'
                    color='secondary'
                > Auto generate menu  </Button></div>
            <MenuDialog birds={birdList} />
            <div className="flex gap-32">
                {birdList?.map((bird) => (
                    <div key={bird.id}>
                        <BirdCard bird={bird} />
                    </div>
                ))}
            </div>
            <div className="flex  justify-end ">
                <Button
                    className='mt-32'
                    onClick={handleAplyTomenu}
                    variant='contained'
                    color='secondary'
                >
                    Aply to Menu
                </Button>
            </div>
        </div>
    )
}
