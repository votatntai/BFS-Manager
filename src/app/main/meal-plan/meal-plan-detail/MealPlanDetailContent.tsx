import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircle, DeleteForever, EditAttributesSharp, EditRounded, RemoveCircle } from '@mui/icons-material';
import AddCircleOutlineRounded from '@mui/icons-material/AddCircleOutlineRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, Divider, Grid, Paper, TextField, Typography } from '@mui/material';
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
import { addMealId, createMenu, createPlan, decreaseQuantity, getCareMode, getMenuSample, getPlanById, getSpecies, increaseQuantity, removeMealItem, resetPlan, selectCareModes, selectMealItemsDialogProp, selectMeals, selectMenuId, selectMenuSample, selectPlanById, selectSpecies, setDialogState, setMealitemsDialog, setMenuDialog, updateMealItem } from './store/menusSlice';
import MenuDialog from './dialogs/MenuDialog';
import { MenuType, PlanType } from '../calendar/types/PlanType';
import { NameType } from './type/MenuType';
const schema = yup.object().shape({
    // start: yup.date().required('Start date is required'),
    // end: yup.date().required('End date is required').when('start', (start, schema) => {
    //     return start ? schema.min(start, 'End date must be later than start date') : schema;
    // }),
    title: yup.string(),
    start: yup.date().required('Start date is required'),
    end: yup.date().required('End date is required'),
    speciesId: yup.mixed().required("Must fill in"),
    careModeId: yup.mixed().required("Must fill in"),
    menuName: yup.string()
});

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
    const [openMealDialog, setOpenDialog] = useState(false)
    const [isMenuExist, setIsMenuExist] = useState(false)
    const [isTitleEdited, setIsTitleEdited] = useState(false)
    const [selectedMenuSample, setSelectedMenuSample] = useState();
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
    //useEffect
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

    // ------- Check Menu exist--------
    useEffect(
        () => {
            if (planId == "new") {
                if (menu.name) {
                    setIsMenuExist(true)
                    const data = {
                        title: getValues().title,
                        from: formatISO(getValues().start),
                        to: formatISO(getValues().end),
                        menuId: menu.id,
                        cageId: cageId
                    }
                    dispatch(createPlan(data))

                }
                else
                    setIsMenuExist(false)
            } else {
                dispatch(getPlanById(planId))


            }
        }
        , [menu, planId, cageId, isExistMealItem])
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
    function handleApply(){
        console.log("selection", selectedMenuSample)
    }

    function onSubmit(data) {
        const menuMeals = plan.menu.menuMeals
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
    return (<div className="flex justify-center  w-full">
        <Paper elevation={24} className='rounded-[16px] w-full m-[30px] h-auto'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='my-[5rem] mx-40 '>

                <div className="flex">
                    <div className=' w-1/2'>
                        <Typography display="inline-block" className="font-oleoScript text-40  border-b-2  ">  Plan info
                        </Typography>

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
                                            required
                                            label="Title"
                                            variant="outlined"
                                            error={!!errors.title}
                                            helperText={errors?.title?.message as string}
                                        />
                                    </>
                                )}

                            />
                            <span className="mx-20 border border-solid rounded-full hover:scale-125 cursor-pointer"> <EditRounded /> </span>
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


                            </div>

                        </Box>
                    </div>
                </div>
                <Divider variant='fullWidth' flexItem />
                {(!isMenuExist) &&
                    (<>
                        <div className="flex justify-center">
                            <Button
                                onClick={() => {
                                    dispatch(setMenuDialog(true))
                                }}
                                className='mt-28 py-10 px 20 border transform hover:-translate-y-1 hover:scale-110  transition duration-500 ease-in-out bg-blue-400 hover:bg-blue-600 rounded-8 text-white'>
                                Create new menu</Button></div>
                        <MenuDialog /></>
                    )}
                {/* Menu */}
                {isMenuExist && (
                    <>
                        <div className=" justify-center    ">
                            {/* Memnu sample */}
                            <Box display="flex"  >
                                <Box display="flex" flexDirection="column" className="flex-1 mt-10">
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

                                                        placeholder="Select one w-[600px]"
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
                                                        placeholder="Select one w-[600px]"
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
                                    <Autocomplete
                                        className="mt-8 mb-16 w-512"
                                        fullWidth
                                        options={menuSamples}
                                        getOptionLabel={(options: NameType) => {
                                            return options?.name || null;
                                        }
                                        }
                                        // renderOption={
                                        //     (,options,props :NameType) => (
                                        //         <div
                                        //             key={options.id} className='p-20'>

                                        //             {props.name}
                                        //             <span>X</span>
                                        //         </div>

                                        //     )
                                        // }
                                        onChange={(event, newValue) => {
                                            setSelectedMenuSample(newValue);
                                            setIsButtonApplyDisabled(!newValue);
                                          }}
                                        
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}

                                                placeholder="Select one "
                                                label="Menu Smaple"
                                                variant="standard"
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

                                </Box>
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
                                        <Button onClick={() => {
                                            dispatch(setDialogState(true))
                                        }}>
                                            <AddCircleOutlineRounded />
                                        </Button>
                                        <MealDialog prop={openMealDialog} />
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
                                                                <AccordionDetails key={item.id} className="flex items-center border border-solid rounded-sm shadow-sm justify-between md:flex-row -mx-8 px-16 ">

                                                                    <Typography> {item?.food.name} {" ("}{item?.food.unitOfMeasurement.name}{") "}</Typography>
                                                                    <div className="flex items-center">
                                                                        <Button
                                                                            onClick={
                                                                                () => {
                                                                                    dispatch(decreaseQuantity({
                                                                                        itemId: item.id,
                                                                                        mealId: meal.id
                                                                                    }))
                                                                                }
                                                                            }><RemoveCircle /></Button>
                                                                        <Typography className="mx-1">
                                                                            {item?.quantity}
                                                                        </Typography>
                                                                        <Button
                                                                            onClick={
                                                                                () => {
                                                                                    dispatch(increaseQuantity({
                                                                                        itemId: item.id,
                                                                                        mealId: meal.id
                                                                                    }))
                                                                                }
                                                                            }
                                                                        ><AddCircle /></Button>
                                                                        <Button
                                                                            onClick={
                                                                                () => {
                                                                                    dispatch(removeMealItem({
                                                                                        itemId: item.id,
                                                                                        mealId: meal.id
                                                                                    }))
                                                                                }
                                                                            }
                                                                        ><DeleteForever /></Button>
                                                                    </div>
                                                                </AccordionDetails>
                                                            )
                                                        }
                                                        )}


                                                        <Button
                                                            onClick={() => {
                                                                dispatch(addMealId(meal.id))
                                                                dispatch(setMealitemsDialog(true))
                                                            }}
                                                        ><AddCircleOutlineRounded /></Button>
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
                        </div>
                        <div className="flex justify-end w-full ">
                            <Button type="submit" variant="contained" color="secondary"> Save</Button>
                        </div>
                    </>
                )}
            </form>
        </Paper>
    </div >
    )
}
