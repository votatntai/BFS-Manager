import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircle, AddCircleOutline, DeleteForever, EditAttributesSharp, EditRounded, RemoveCircle, RemoveCircleOutline } from '@mui/icons-material';
import AddCircleOutlineRounded from '@mui/icons-material/AddCircleOutlineRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Avatar, Box, Button, Card, CardContent, CardMedia, Divider, Grid, IconButton, Paper, Tab, Tabs, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useAppDispatch, useAppSelector } from 'app/store';
import { formatISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import * as yup from 'yup';
import { getCage, selectCage } from '../store/cagesSlice';
import MealDialog from './dialogs/MealDialog';
import MealItemDialog from './dialogs/MealItemDialog';
import { addMealId, createMealItems, createMenu, createMenuMeal, createPlan, getCareMode, getMenuSample, getPlanById, getSpecies, removeMealItem, removeMenuMeal, resetPlan, selectCareModes, selectMealItemsDialogProp, selectMeals, selectMenuId, selectMenuSample, selectPlanById, selectSpecies, setDialogState, setMealitemsDialog, setMenuDialog, updateMealItem, updatePlan } from './store/menusSlice';
import MenuDialog from './dialogs/MenuDialog';
import { MenuType, PlanType } from '../calendar/types/PlanType';
import { NameType, menuSampleType } from './type/MenuType';
import { forEach } from 'lodash';
import { AnyAction, unwrapResult } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import FoodNormTab from './tabs/FoodNormTab';
import BirdMenus from './menu/BirdMenus';
const schema = yup.object().shape({
    // start: yup.date().required('Start date is required'),
    // end: yup.date().required('End date is required').when('start', (start, schema) => {
    //     return start ? schema.min(start, 'End date must be later than start date') : schema;
    // }),
    title: yup.string(),
    start: yup.date().required('Start date is required'),
    end: yup.date().required('End date is required'),
    speciesId: yup.mixed(),
    careModeId: yup.mixed(),
    menuName: yup.string()
});
const menuMeals = [
    {
        name: "Morning",
        from: "07:00:00",
        to: "09:00:00"
    },
    {
        name: "Lunch",
        from: "12:0:00",
        to: "14:00:00"
    },
    {
        name: "Afternoon",
        from: "17:00:00",
        to: "19:00:00"
    },
    {
        name: "Evening",
        from: "21:00:00",
        to: "22:00:00"
    }
]
export default function MealPlanDetailContent() {
    const dispatch = useAppDispatch()
    const { cageId, planId } = useParams()
    const cage = useAppSelector(selectCage)
    const meals = useAppSelector(selectMeals)
    const specieses = useAppSelector(selectSpecies)
    const careModes = useAppSelector(selectCareModes)
    const menuSamples = useAppSelector(selectMenuSample)
    const menu: Partial<MenuType> = useAppSelector(selectMenuId)
    const plan: Partial<PlanType> = useAppSelector(selectPlanById)
    const isExistMealItem = useAppSelector(selectMealItemsDialogProp)
    // useState
    const [sortedMenuMeals, setSortedMenuMeals] = useState([]);
    const [planCreated, setPlanCreated] = useState(false);
    const [menuCreated, setMenuCreated] = useState(false);
    const [openMealDialog, setOpenDialog] = useState(false)
    const [isMenuExist, setIsMenuExist] = useState(false)
    const [isTitleEdited, setIsTitleEdited] = useState(false)
    const [selectedMenuSample, setSelectedMenuSample] = useState<menuSampleType>();
    const [isButtonApplyDisabled, setIsButtonApplyDisabled] = useState(true);
    // const [isTitleEdited, setIsTitleEdited] = useState(false)
    const { control, watch, formState, handleSubmit, getValues, setError, setValue, reset } = useForm(
        {
            mode: "onChange",
            resolver: yupResolver(schema)
        }
    );
    const { errors } = formState
    const navigate = useNavigate()
    //useEffet
    //------- get List Info--------
    useEffect(
        () => {
            dispatch(getCage(cageId))
            dispatch(getSpecies())
            dispatch(getCareMode())
        }
        , [])

    //------- get sample menu --------
    const speciesId = watch("speciesId");
    const careModeId = watch("careModeId");
    useEffect(
        () => {
            const data = {
                speciesId: speciesId,
                careModeId: careModeId
            }
            dispatch(getMenuSample(data))
        }
        , [speciesId, careModeId])
    // ------  Run after cageLoaded --
    useEffect(
        () => {
            if (planId == "new" && cage.name && !menuCreated) {
                const data = {
                    item: {
                        name: `${cage.name}-${cage.code}`
                    },
                    actionType: "PLAN_MENU"
                };
                dispatch(createMenu(data))
                setMenuCreated(true)
            }
        }
        , [cage]
    )
    useEffect(
        () => {
            if (planId == "new" && !planCreated) {
                if (menu.name) {
                    const data = {
                        title: `${formatDateToDayMonth(getValues().start)} to ${formatDateToDayMonth(getValues().end)}`,
                        from: formatISO(getValues().start),
                        to: formatISO(getValues().end),
                        menuId: menu.id,
                        cageId: cageId
                    }
                    dispatch(createPlan(data))
                    let promises = menuMeals.map((meal, index) => {
                        const info = {
                            menuId: menu.id,
                            name: meal.name,
                            from: meal.from,
                            to: meal.to
                        }
                        return dispatch(createMenuMeal(info));
                    });

                    Promise.all(promises)
                        .then(() => console.log("All meals have been created"))
                        .catch((error) => console.error(error))
                    setPlanCreated(true)
                }
            }
        }
        , [menu]
    )

    // ------- Get Plan --------
    useEffect(
        () => {
            if (planId !== "new")
                dispatch(getPlanById(planId))
        }
        , [])
    // -------- Insert form ----------
    useEffect(() => {
        if (Object.keys(plan).length !== 0) {
            const data = {
                title: plan.title,
                start: new Date(plan.from),
                end: new Date(plan.to),
                menuName: plan.menu.name,
            }
            reset(data)
            if (plan?.menu?.name)
                setIsMenuExist(true)
        } else
            return;
    }
        , [reset, plan]
    )
    useEffect(() => {
        return () => {
            dispatch(resetPlan());
        };
    }, [dispatch]);
    // Form handler
    function handleApply() {
        const menuMeals = plan.menu.menuMeals
        if (menuMeals.length > 0) {
            menuMeals.forEach(meal => {
                dispatch(removeMenuMeal(meal.id))
            });
        }
        const menuSampleList = selectedMenuSample?.menuMealSamples;
        let data
        let itemData
        const handleCreation = async (menuSampleList) => {
            if (menuSampleList.length > 0) {
                for (let index = 0; index < menuSampleList.length; index++) {
                    const mealSample = menuSampleList[index];
                    data = {
                        menuId: plan.menu.id,
                        name: mealSample.name,
                        from: mealSample.from,
                        to: mealSample.to
                    }
                    const result = await dispatch(createMenuMeal(data));
                    const newMenuMeal = result.payload; // Unwrap result from action
                    if (mealSample.mealItemSamples.length > 0) {
                        for (let item of mealSample.mealItemSamples) {
                            itemData = {
                                menuMealId: newMenuMeal.id,
                                foodId: item.food.id,
                                quantity: item.quantity,
                                order: item.order
                            }
                            await dispatch(createMealItems(itemData)).catch(error => console.log(error));
                        }
                    }

                }
            }
        }

        handleCreation(menuSampleList);

    }
    function formatDateToDayMonth(date) {
        if (date instanceof Date) {
            const formattedDate = date.toLocaleDateString('vn-VI', { day: '2-digit', month: '2-digit' });
            return formattedDate;
        }
        return null;
    }
    function onSubmit(data) {
        const menuMeals = plan.menu?.menuMeals ? plan.menu.menuMeals : null
        if (menuMeals?.length > 0) {
            menuMeals.forEach(menuMeal => {
                menuMeal.mealItems.forEach(mealItem => {
                    if (mealItem.hasChanged == true) {
                        const item = {
                            itemId: mealItem.id,
                            newItem: {
                                quantity: mealItem.quantity
                            }
                        }
                        dispatch(updateMealItem(item))
                    }

                });
            });
        }
        const msg = {
            variant: 'success',
            autoHideDuration: 2000,
            message: `Save successfully`,
        }
        dispatch(showMessage(msg))


    }
    return (<div className="flex justify-center  w-full">
        <Paper elevation={24} className='rounded-[16px] w-full m-[30px] h-auto'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='my-[5rem] mx-40 '>

                <div className="flex">
                    <div className=' w-1/2 '>
                        <Typography display="inline-block" className="font-oleoScript text-40  border-b-2  ">  Plan info
                        </Typography>
                        {/* <span className="bg-red">
                            <span className="mx-20 border border-solid rounded-full hover:scale-125 cursor-pointer"> <EditRounded /> </span>
                        </span> */}


                        <Box display="flex " >
                            <div className='mt-10 '>
                                <Typography variant='h4' className=" text-20 font-400   "> Start
                                </Typography>
                                <Controller
                                    name="start"
                                    control={control}
                                    defaultValue={new Date()}
                                    render={({ field }) => (
                                        <DatePicker
                                            {...field}
                                            className='my-10'
                                        />

                                    )}
                                />
                            </div>
                            <div className='mt-10 mx-[3rem]'>
                                <Typography variant='h4' className=" text-20 font-400   "> To
                                </Typography>
                                <Controller
                                    name="end"
                                    defaultValue={new Date()}
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            <DatePicker

                                                {...field}
                                                className='my-10'
                                            />
                                            <Typography color="red">{errors?.end?.message}</Typography>

                                        </>
                                    )}
                                />
                            </div>
                        </Box>
                        <Box display="flex " alignItems="center">
                            <Controller
                                name="title"
                                defaultValue={plan.title ? plan.title : ""}
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16 w-[300px] "
                                            label="Title"
                                            variant="outlined"
                                            error={!!errors.title}
                                            helperText={errors?.title?.message as string}
                                        />
                                    </>
                                )}

                            />
                        </Box>

                    </div>
                    <div className="w-1/2 justify-center    ">

                        {/* Cage Info */}
                        <Typography display="inline-block" className="font-oleoScript text-40  border-b-2  "> Cage info
                        </Typography>
                        <Box display="flex "  >
                            <div className='mt-10 '>
                                <Typography variant='h4' className=" text-20 font-400   "> Cage name
                                </Typography>

                                <TextField
                                    value={cage.name ? cage.name : ""}
                                    disabled
                                    autoFocus
                                    className="mt-8 mb-16 w-[300px] "
                                    variant="outlined"
                                />
                                <div
                                    className="flex justify-end">
                                    <Button
                                        onClick={() => {
                                            const newPlan = {
                                                "title": getValues().title,
                                                "from": formatISO(getValues().start),
                                                "to": formatISO(getValues().end)
                                            }
                                            const planData = {
                                                itemId: plan.id,
                                                newItem: newPlan
                                            }
                                            dispatch(updatePlan(planData))
                                            const msg = {
                                                variant: 'success',
                                                autoHideDuration: 2000,
                                                message: `Edit plan successfully`,
                                            }
                                            dispatch(showMessage(msg))
                                        }}
                                        variant="contained" color="secondary">
                                        Save
                                    </Button>

                                </div>


                            </div>

                        </Box>
                    </div>
                </div>
                <Divider variant='fullWidth' flexItem />
                {/* Menu */}
                <>
                    {/* <div className=" justify-center    "> */}
                    {/* Memnu sample */}
                    <Box display="flex"  >
                        {/* <Box display="flex" flexDirection="column" className="flex-1 mt-10">
                                    <Typography display="inline-block" className="font-oleoScript text-40    ">  Menu sample
                                    </Typography>
                                    <Typography variant='h4' className=" text-20 font-400   "> Select your menu sample type
                                    </Typography>
                                    <Controller
                                        name="speciesId"
                                        control={control}

                                        render={({ field: { onChange, value } }) => (
                                            <Autocomplete
                                                className="mt-8 mb-16 w-512"
                                                fullWidth
                                                options={specieses}
                                                getOptionLabel={(options: NameType) => {
                                                    return options?.name || '';
                                                }
                                                }
                                                onChange={(event, newValue: NameType) => {
                                                    onChange(newValue?.id);
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}

                                                        placeholder="Select one "
                                                        label="Specieses"
                                                        variant="outlined"
                                                        fullWidth
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                    />
                                                )}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="careModeId"
                                        control={control}

                                        render={({ field: { onChange, value } }) => (
                                            <Autocomplete
                                                className="mt-8 mb-16 w-512"
                                                fullWidth
                                                options={careModes ? careModes : []}
                                                getOptionLabel={(options: NameType) => {
                                                    return options?.name || '';
                                                }
                                                }
                                                onChange={(event, newValue: NameType) => {
                                                    onChange(newValue?.id);
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Caremode"
                                                        placeholder="Select one "
                                                        variant="outlined"
                                                        fullWidth
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                    />
                                                )}
                                            />
                                        )}
                                    />
                                    <Typography variant='h4' className=" text-20 font-400   "> Menu sample
                                    </Typography>
                                    <Autocomplete
                                        className="mt-8 mb-16 w-512"
                                        fullWidth
                                        options={menuSamples}
                                        getOptionLabel={(options: NameType) => {
                                            return options?.name || null;
                                        }
                                        }

                                        onChange={(event, newValue) => {
                                            setSelectedMenuSample(newValue);
                                            setIsButtonApplyDisabled(!newValue);
                                        }}

                                        renderInput={(params) => (
                                            <TextField
                                                {...params}

                                                placeholder="Select one "
                                                variant="outlined"
                                                fullWidth
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                            />
                                        )}
                                    />
                                    <Box display="flex" justifyContent="end">
                                        <Button
                                            disabled={isButtonApplyDisabled}
                                            onClick={handleApply}
                                            className='w-160' variant='contained' color='secondary'>Apply to menu</Button>
                                    </Box>

                                </Box> */}
                        <div className='mt-10 mx-40 flex-1'>
                            <Divider variant='inset'>
                                <Typography display="inline-block" className="font-oleoScript text-40    ">  Menu
                                </Typography>

                            </Divider>
                            <Typography variant='h4' className=" text-20 font-400   "> Menu name
                            </Typography>
                            <Controller
                                name="menuName"
                                defaultValue={menu.name}
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16 w-[300px] "
                                            required
                                            disabled
                                            label=""
                                            id="name"
                                            variant="outlined"
                                        // error={!!errors.name}
                                        // helperText={errors?.name?.message as string}
                                        />
                                    </>
                                )}
                            />

                            <div className="flex justify-between items-center">
                                <Typography variant='h4' className=" text-20 font-400  "> Meal
                                </Typography>
                            </div>
                            {(plan.menu?.menuMeals && plan.menu?.menuMeals?.length > 0) ? (
                                plan.menu.menuMeals.map(
                                    (meal) => {
                                        return (
                                            <Accordion
                                                key={meal.id}
                                                className="shadow-2  border rounded-16 my-20 overflow-hidden"
                                            >
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    classes={{ root: 'mb-16  ' }}
                                                >
                                                    <Grid container direction="column">
                                                        <Typography className="font-bold">{meal.name}</Typography>
                                                        <Typography color="blue">
                                                            From: {meal.from}
                                                            <br />    To: {meal.to}
                                                        </Typography>

                                                    </Grid>

                                                </AccordionSummary>
                                                {meal?.mealItems?.map((item) => {
                                                    return (
                                                        <AccordionDetails key={item.id}
                                                            className="flex p-20 items-center border border-solid rounded-sm shadow-sm  md:flex-row   ">
                                                            <Avatar
                                                                src={item?.food.thumbnailUrl}>
                                                            </Avatar>
                                                            <Typography
                                                                className="ml-10"
                                                            >
                                                                {item?.food.name} {" "}
                                                                {item?.quantity}
                                                                {" ("}{item?.food.unitOfMeasurement.name}{") "}
                                                            </Typography>

                                                        </AccordionDetails>
                                                    )
                                                }
                                                )}

                                                <MealItemDialog />
                                            </Accordion>
                                        )
                                    }
                                )

                            ) :
                                <div className="flex justify-center m-20 "
                                >   <Typography> There is no meal available !</Typography></div>
                            }

                        </div>

                    </Box>
                    {/* </div> */}
                    {/* <div className="flex justify-end w-full ">
                            <Button type="submit" variant="contained" color="secondary"> Save</Button>
                        </div> */}
                </>


                {/* ======================== Total food norm  ========================                           */}
                {/* <div className="">
                    <Typography display="inline-block" className="font-oleoScript text-40  border-b-2  ">  Total food norm (menu of cage)
                    </Typography>
                    <Typography variant='h4' className=" text-20 font-400 my-20  "> Menu meal table
                    </Typography>
                    <Button
                        variant='contained'
                        color='primary'
                    >
                        Auto generate menu
                    </Button>

                    <div className="flex justify-around">
                        <FoodNormTab />
                    </div>
                </div> */}
                <div className="">

                    <Typography display="inline-block" className="font-oleoScript text-40  border-b-2  ">  Birds in cage
                    </Typography>
                    <Typography variant='h4' className=" text-20 font-400 my-20  ">
                    </Typography>
                    <BirdMenus />



                </div>
            </form>
        </Paper>
    </div >
    )
}
