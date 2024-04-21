import { AddCircle, AddCircleOutlineRounded, DeleteForever, RemoveCircle } from '@mui/icons-material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from "@mui/material";
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useAppDispatch } from 'app/store';
import { useEffect, useState } from 'react';
import CustomizedSwitches from '../../component/button/CustomizedSwitches';
import MealItemDialog from '../../dialogs/MealItemDialog';
import { addMealBirdId, addMealId, createBirdMenu, createBirdMenuMeal, removeBirdItem, setMealitemsDialog, updateBird, updateMealItem } from '../../store/menusSlice';
import { BirdType } from '../../type/MenuType';
import _ from 'lodash';
import { MenuMealType } from '../../../calendar/types/PlanType';
const ExpandMore = styled((props: any) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
const Accordion = styled((props: any) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: any) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));
type BirdProp = {
    bird: Partial<BirdType>
}
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
export default function BirdCard(props: BirdProp) {
    const [expanded, setExpanded] = useState(false);
    const [accordionExpend, setAccordionExpend] = useState('panel1');
    const [createdMenu, setCreatedMenu] = useState(false);
    const [sortedMenuMeal, setSortedMenuMeal] = useState<MenuMealType[]>([]);

    const dispatch = useAppDispatch()
    const { bird } = props
    const handleExpandClick = () => {
        setExpanded(!expanded);
    }
    useEffect(
        ()=>{
            if (bird.menu?.menuMeals.length > 0) {
                let sorted = [...bird?.menu?.menuMeals].sort((a, b) => a.from.localeCompare(b.from));
                setSortedMenuMeal(sorted);
              } else
                setSortedMenuMeal(null);
        },
        [bird.menu?.menuMeals]
    )

    useEffect(() => {
        if (bird.menu?.id) {
            if (bird.menu?.menuMeals?.length == 0 || !bird.menu?.menuMeals) {
                let promises = menuMeals.map((meal, index) => {
                    const info = {
                        menuId: bird.menu.id,
                        name: meal.name,
                        from: meal.from,
                        to: meal.to
                    }
                    const menuMealData = {
                        data: info,
                        birdId: bird.id
                    }
                    return dispatch(createBirdMenuMeal(menuMealData));
                });

                Promise.all(promises)
                    .then(() => console.log("All meals have been created"))
                    .catch((error) => console.error(error))
            }
        }
        if (createdMenu) {
            let data = new FormData();
            data.append('menuId', bird.menu?.id);
            const birdData = {
                itemId: bird.id,
                newItem: data
            }
            dispatch(updateBird(birdData))
        }
    }
        , [bird.menu?.id])
    useEffect(() => {
        if (!bird.menu?.id) {
            const data = {
                item: {
                    name: `${bird.species.name}-${bird.careMode.name} menu`
                },
                birdId: bird.id
            };
            dispatch(createBirdMenu(data))
            setCreatedMenu(true)

        }
    }
        , [])
    // bird.menu?.menuMeals.sort((a, b) => ('' + a.from).localeCompare(b.from));
    const handleChange = (panel) => (event, newExpanded) => {
        setAccordionExpend(newExpanded ? panel : false);
    };

    return (
        <Card
            className="shadow max-w-[345px]  "
        >
            <CardHeader
                avatar={
                    (<Avatar src={bird.thumbnailUrl} />)
                }
                action={
                    <IconButton >
                    </IconButton>
                }
                title={bird.name}
            />
            <CardContent className="h-52 overflow-auto">
                <Typography variant="body2" color="text.secondary">
                    {bird?.species.name} - {bird?.careMode.name}
                </Typography>
            </CardContent>
            <CardActions disableSpacing >
                <CustomizedSwitches bird={bird} />
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {(sortedMenuMeal && sortedMenuMeal?.length > 0) ? (
                        sortedMenuMeal.map(
                                (meal, index) => {
                                return (
                                    <Accordion
                                        key={index}
                                    // expanded={accordionExpend == `${index}`} onChange={handleChange(index)}
                                    >
                                        <AccordionSummary>
                                            <Typography>{meal.name} </Typography>
                                        </AccordionSummary>
                                        {meal?.mealItems?.map((item) => {
                                            return (
                                                <AccordionDetails key={item.id} className="flex items-center border border-solid rounded-sm shadow-sm justify-between md:flex-row -mx-8 px-16 ">

                                                    <Typography> {item?.food.name} {" ("}{item?.food.unitOfMeasurement.name}{") "}</Typography>
                                                    <div className="flex items-center">
                                                        <div className="flex items-center justify-end">     <Button
                                                            className="cursor-pointer "
                                                            onClick={
                                                                () => {
                                                                    dispatch(updateMealItem({
                                                                        itemId: item.id,
                                                                        mealId: meal.id,
                                                                        birdId: bird.id,
                                                                        newItem: {
                                                                            quantity: item.quantity
                                                                        },
                                                                        action: "decrease"
                                                                    }))
                                                                }
                                                            }><RemoveCircle
                                                                className="cursor-pointer "
                                                            /></Button>
                                                            <Typography className="mx-1">
                                                                {item?.quantity}
                                                            </Typography>
                                                            <Button
                                                                className="cursor-pointer"
                                                                onClick={
                                                                    () => {
                                                                        dispatch(updateMealItem({
                                                                            itemId: item.id,
                                                                            mealId: meal.id,
                                                                            birdId: bird.id,
                                                                            newItem: {
                                                                                quantity: item.quantity
                                                                            },
                                                                            action: "increase"
                                                                        }))
                                                                    }
                                                                }
                                                            ><AddCircle /></Button></div>   
                                                        <Button
                                                            className="cursor-pointer"
                                                            onClick={
                                                                () => {
                                                                    dispatch(removeBirdItem({
                                                                        itemId: item.id,
                                                                        mealId: meal.id,
                                                                        birdId: bird.id
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
                                                dispatch(addMealBirdId(bird.id))
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
                        >   <Typography> </Typography></div>
                    }

                </CardContent>
            </Collapse>
        </Card>
    )
}
