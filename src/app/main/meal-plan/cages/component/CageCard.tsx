import React from 'react'
import { CageType } from '../type/CageType';
import { CardActionArea, Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import Calendar from '../../calendar/Calendar';
import { useNavigate } from 'react-router';
type CardProps = {
    cage: CageType;
};
export default function CageCard(props: CardProps) {
    const { cage } = props;
    const navigate = useNavigate();
    function handleCreate() {
        navigate(`${cage.id}`)
    }
    return (
        <Card  elevation={24}
            className=' '
            sx={{ maxWidth: 345 }}
        >
            <CardActionArea

                className=" hover:outline-none hover:border-sky-500 hover:ring-1 hover:ring-sky-500 cursor-pointer"     >
                <CardMedia

                    className='object-cover h-[140px]'
                    component="img"
                    image={cage.thumbnailUrl}
                    alt={cage.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {cage.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Code:    {cage.code}
                        <br /> Size:  {cage.height} x{cage.width} x {cage.depth}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className="justify-end flex">
                <Button
                    variant='outlined' size="small" color="secondary"
                     onClick={handleCreate}
                    >
                    Create Plan
                </Button>
            </CardActions>
        </Card>
    )
}
