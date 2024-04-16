import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {useEffect, useState } from 'react';
import {getBirdData, setPaginPageNumber,setPaginPageSize } from './slice/birdSlice';
import { useAppDispatch,useAppSelector } from 'app/store';
import EditModal from './EditModal';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import BirdCard from './BirdCard'
import { motion } from 'framer-motion';
const container = {
	show: {
		transition: {
			staggerChildren: 0.1
		}
	}
};
const BirdContent = ()=>{
    const [openEditSuccessNotify, setOpenEditSuccessNotify] = useState(false);
    const [openEditFailNotify, setOpenEditFailNotify] = useState(false);
	const [showEdit, setShowEdit] =useState(false)
	const [editValue, setEditValue] =useState({})
    const dispatch = useAppDispatch()
    const birds  = useAppSelector((state) => state.birdReducer.birdSlice.birds.data)
    const pageNumber  = useAppSelector((state) => state.birdReducer.birdSlice.birds.pagination.pageNumber)
    const pageSize  = useAppSelector((state) => state.birdReducer.birdSlice.birds.pagination.pageSize)
    useEffect(()=>{
        dispatch(getBirdData({pageNumber: pageNumber, pageSize: pageSize}))
    },[pageNumber,pageSize])
    
    return <motion.div
    className="items-center flex grid grid-cols-1  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-32 mt-32 sm:mt-40 ms-32"
    variants={container} initial="hidden" animate="show" >
    {birds.length > 0 && birds.map(bird => <BirdCard key={bird.id} birdInfo={bird}/>)}
    </motion.div>
}
export default BirdContent