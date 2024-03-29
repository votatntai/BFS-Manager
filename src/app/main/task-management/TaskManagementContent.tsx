
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { lighten } from '@mui/material/styles';
import {useEffect, useState } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { motion } from 'framer-motion';
import { useAppDispatch,useAppSelector } from 'app/store';
import { getCageData } from './slice/taskManagementSlice';
import { setTaskDataToEmpty } from './slice/taskManagementSlice';
const container = {
	show: {
		transition: {
			staggerChildren: 0.1
		}
	}
};
const TaskManagementContent = ()=>{
    const dispatch = useAppDispatch()
    const cages = useAppSelector(state => state.taskManagementReducer.taskManagement.cageList.data)
    // const testState = useAppSelector(state => state)
    // console.log(testState)
    useEffect(()=>{
        dispatch(getCageData({pageNumber:0,pageSize:100}))
    },[])
    return <div className="w-full flex flex-col min-h-full bg-white">
    <motion.div className="mx-16 mb-24 flex grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-32 mt-32 sm:mt-40"
		variants={container} initial="hidden" animate="show">
    {cages && cages.length>0 && cages.map(item => <Card key={item.id} className="flex flex-col h-250 w-256 shadow-7">
    <CardHeader title={item.name}/>
        <CardMedia style={{ height: '200px', objectFit: 'contain' }}
          component="img"
          image={item.thumbnailUrl}
          alt="My Image"
        />
    <CardContent className="flex flex-col flex-auto p-24">
    <Typography>
        <b>CODE:</b> {item.code}
    </Typography>
    </CardContent>
    <CardActions
        className="items-center justify-end py-16 px-24"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? lighten(theme.palette.background.default, 0.4)
              : lighten(theme.palette.background.default, 0.03)
        }}
      >
        <Button
          to={`/task-management/task/${item.id}/${item.name}`}
          component={Link}
          className="px-16 min-w-128"
          color="secondary"
          variant="contained"
          endIcon={<FuseSvgIcon size={20}>heroicons-solid:arrow-sm-right</FuseSvgIcon>}
        >
          view task
        </Button>
      </CardActions>
    </Card>)}
    </motion.div>
    </div>
}
export default TaskManagementContent