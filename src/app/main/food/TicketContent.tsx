import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { lighten } from '@mui/material/styles';
import {useEffect, useState } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { motion } from 'framer-motion';
import { useAppDispatch,useAppSelector } from 'app/store';
import { getFoodData,setPaginPageNumber,setPaginPageSize } from './slice/foodSlice';
const container = {
	show: {
		transition: {
			staggerChildren: 0.1
		}
	}
};
const TicketContent = ()=>{
    const dispatch = useAppDispatch()
    const tickets = useAppSelector(state => state.ticketReducer.ticketReducer.tickets.data)
    const pageNumber  = useAppSelector((state) => state.ticketReducer.ticketReducer.tickets.pagination.pageNumber)
    const pageSize  = useAppSelector((state) => state.ticketReducer.ticketReducer.tickets.pagination.pageSize)
    const totalRow =  useAppSelector((state) => state.ticketReducer.ticketReducer.tickets.pagination.totalRow)
    // const testState = useAppSelector(state => state)
    // console.log(testState)
    useEffect(()=>{
        dispatch(getFoodData({pageNumber:0,pageSize:100}))
    },[])
    return <div className="w-full flex flex-col bg-white">
    <FuseScrollbars className="overflow-x-auto">
<Table className="min-w-x" aria-labelledby="tableTitle" >
<TableHead style={{background:'rgb(250, 251, 254)'}}>
    <TableRow>
    <TableCell align="left"><span className='font-semibold'>Type</span></TableCell>
    <TableCell align="left"><span className='font-semibold'>Problem</span></TableCell>
    <TableCell width={'15%'} align="left"><span className='font-semibold'>Priority</span></TableCell>
    <TableCell width={'15%'} align="left"><span className='font-semibold'>Created by</span></TableCell>
    <TableCell width={'15%'} align="left"><span className='font-semibold'>Created at</span></TableCell>
    <TableCell align="left"><span className='font-semibold'>Action</span></TableCell>
    </TableRow>
    </TableHead>
    {tickets && tickets.length > 0 && <TableBody>
        {tickets.map((item) => (<TableRow key={item.id} >
        <TableCell align='left'>{item.ticketCategory}</TableCell>
        <TableCell align='left'>{item.title}</TableCell>
        <TableCell align='left'>{item.priority === 1 ? <Button variant="contained" color='warning'>Low</Button> : item.priority === 2 ? <Button variant="contained" color='warning'>Moderate</Button>: <Button variant="contained" color='error'>High</Button>}</TableCell>
        <TableCell align='left'>{item.creator.name}</TableCell>
        <TableCell align='left'>{new Date(item.createAt).toLocaleString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })}</TableCell>
    </TableRow>))}
    </TableBody>}
    </Table>
{tickets && tickets.length===0 && <Stack className='mt-36' direction='row' alignItems={"center"} justifyContent={"center"}>
<h2 style={{color:"gray"}}>No matching result</h2></Stack> }
</FuseScrollbars>
<TablePagination
className="shrink-0 border-t-1 mt-20"
component="div"
rowsPerPageOptions={[8,16,32]}
count={totalRow}
rowsPerPage={pageSize}
page={pageNumber}
backIconButtonProps={{
    'aria-label': 'Previous Page'
}}
nextIconButtonProps={{
    'aria-label': 'Next Page'
}}
onPageChange={(event, newPage) => {
   dispatch(setPaginPageNumber(newPage))
}}
onRowsPerPageChange={(event) => {
    dispatch(setPaginPageSize(parseInt(event.target.value)))
   dispatch(setPaginPageNumber(0))
    }}
/>
{/* <Snackbar open={openEditSuccessNotify} autoHideDuration={3000} onClose={()=>{setOpenEditSuccessNotify(false)}} anchorOrigin={{vertical: 'bottom', horizontal: 'center' }}>
    <Alert onClose={()=>{setOpenEditSuccessNotify(false)}}
      severity="success" variant="filled" sx={{ width: '100%' }}>
      Edit successfully
    </Alert>
  </Snackbar>
<Snackbar open={openEditFailNotify} autoHideDuration={3000} onClose={()=>{setOpenEditFailNotify(false)}} anchorOrigin={{vertical: 'bottom', horizontal: 'center' }}>
    <Alert onClose={()=>{setOpenEditFailNotify(false)}}
      severity="error" variant="filled" sx={{ width: '100%' }}>
      Edit failed
    </Alert>
  </Snackbar>
  {showEdit && <EditModal setOpenFailSnackbar={setOpenEditFailNotify} setOpenSuccessSnackbar={setOpenEditSuccessNotify} object={editValue} show={showEdit} handleClose={() => setShowEdit(false)} />} */}
</div>
}
export default TicketContent