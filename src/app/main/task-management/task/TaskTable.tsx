import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import { useAppDispatch,useAppSelector } from 'app/store';
import { getTaskData, setPaginPageNumber, setPaginPageSize } from '../slice/taskManagementSlice';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
export default function TaskTable({cageId}){
    const dispatch = useAppDispatch()
    const tasks = useAppSelector(state=> state.taskManagementReducer.taskManagement.taskList.data)
    const pageNumber  = useAppSelector((state) => state.taskManagementReducer.taskManagement.taskList.pagination.pageNumber)
    const pageSize  = useAppSelector((state) => state.taskManagementReducer.taskManagement.taskList.pagination.pageSize)
    const totalRow =  useAppSelector((state) => state.taskManagementReducer.taskManagement.taskList.pagination.totalRow)
    useEffect(()=>{
        dispatch(getTaskData({cageId: cageId, pageNumber: pageNumber, pageSize: pageSize}))
    },[pageNumber, pageSize])
    return <div className="w-full flex flex-col min-h-full bg-white">
        <FuseScrollbars className="grow overflow-x-auto">
    <Table className="min-w-x" aria-labelledby="tableTitle" >
    <TableHead style={{background:'rgb(250, 251, 254)'}}>
<TableRow>
<TableCell align="left"><span className='font-semibold'>Name</span></TableCell>
<TableCell align="left"><span className='font-semibold'>Description</span></TableCell>
<TableCell align="left"><span className='font-semibold'>Checklists</span></TableCell>
<TableCell align="left"><span className='font-semibold'>Deadline</span></TableCell>
<TableCell align="left"><span className='font-semibold'>Status</span></TableCell>
<TableCell align="left"><span className='font-semibold'>Created at</span></TableCell>
<TableCell align="left"><span className='font-semibold'>Action</span></TableCell>
</TableRow>
</TableHead>
{tasks && tasks.length > 0 && <TableBody>
    {tasks.map((item) => (<TableRow key={item.id} >
    <TableCell align='left'>{item.title}</TableCell>
    <TableCell align='left'>{item.description}</TableCell>
    <TableCell align='center'>{item.checkLists.length}</TableCell>
    <TableCell align='left'>{new Date(item.deadLine).toLocaleDateString('en-Gb')}</TableCell>
    <TableCell align='left'>{item.status}</TableCell>
    <TableCell align='left'>{new Date(item.createAt).toLocaleDateString('en-Gb')}</TableCell>
    <TableCell>
        <Stack direction='row' spacing={3}>
        <Tooltip title='View detail'>
        <FuseSvgIcon className="text-48 ms-10" size={24} color="action" style={{cursor:'pointer'}} 
        //onClick={()=>{setShowEdit(true); setEditValue(item)}}
        >heroicons-solid:eye</FuseSvgIcon>
        </Tooltip>
        <Tooltip title='Edit'>
        <FuseSvgIcon className="text-48 ms-10" size={24} color="action" style={{cursor:'pointer'}} 
        //onClick={()=>{setShowEdit(true); setEditValue(item)}}
        >heroicons-solid:pencil-alt</FuseSvgIcon>
        </Tooltip>
        </Stack>
    </TableCell>
</TableRow>))}
    </TableBody>}
    </Table>
{tasks && tasks.length===0 && <Stack className='mt-36' direction='row' alignItems={"center"} justifyContent={"center"}>
    <h2 style={{color:"gray"}}>No matching result</h2></Stack> }
</FuseScrollbars>
<TablePagination
    className="shrink-0 border-t-1"
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
</div>
}