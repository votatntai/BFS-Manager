import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useAppDispatch,useAppSelector } from 'app/store';
import axios from 'src/app/auth/services/api/customAxios';
import Autocomplete from '@mui/material/Autocomplete';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import { addTask, getTaskData,setFilterStatus } from '../slice/taskManagementSlice';

const CreateModal=({handleClose, show, cageId,setOpenFailSnackbar, setOpenSuccessSnackbar})=>{
    const [taskName, setTaskName] =useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskDeadline, setTaskDeadline] = useState(new Date())
    const [inputChecklistValue, setInputChecklistValue] =useState('')
    const [checklists, setChecklists] =useState([])
    const [staffList, setStaffList] =useState([])
    const formData = new FormData()
    const [checkName, setCheckName] = useState(false)
    const [checkStaffList, setCheckStaffList] = useState(false)
    const dispatch = useAppDispatch()
    const pageNumber  = useAppSelector((state) => state.taskManagementReducer.taskManagement.taskList.pagination.pageNumber)
    const pageSize  = useAppSelector((state) => state.taskManagementReducer.taskManagement.taskList.pagination.pageSize)    
    const checkValid= () =>{
      let check: boolean = true
      if(taskName.trim() === '') {setCheckName(true)} else setCheckName(false)
      if(staffList.length === 0) {setCheckStaffList(true)} else setCheckStaffList(false)
      if(taskName.trim() === '' || staffList.length === 0){
          check = false
      }
      return check;
    }
  
    const add = async() => {
      const validate = checkValid()
      if(validate) {
        await dispatch(addTask({
          "cageId": cageId,
          "title": taskName,
          "description": taskDescription,
          "managerId": "bb0eede3-f1d3-4f82-b992-a167f6e0ee21",
          "deadline": taskDeadline.toDateString(),
          "status": "To do",
          "assigneeIds": staffList,
          "checkLists": checklists
        }))
        // console.log({
        //   "cageId": cageId,
        //   "title": taskName,
        //   "description": taskDescription,
        //   "managerId": "bb0eede3-f1d3-4f82-b992-a167f6e0ee21",
        //   "deadline": taskDeadline.toDateString(),
        //   "status": "To do",
        //   "assigneeIds": staffList,
        //   "checkLists": checklists
        // })
        await dispatch(getTaskData({cageId: cageId, pageNumber: pageNumber, pageSize: pageSize, status:'To do'}))
        dispatch(setFilterStatus('To do'))
        setOpenSuccessSnackbar(true)
        handleClose()
      } else setOpenFailSnackbar(true)
      
    }  
    const handleAddChecklistItem =()=>{
      setChecklists(prevChecklists => [...prevChecklists, {
        "title": inputChecklistValue,
        // "asigneeId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        // "order": 0
      }]);
      setInputChecklistValue('')
    }
    const handleDeleteChecklistItem =(indexToRemove)=>{
      setChecklists(prevChecklists =>
        prevChecklists.filter((_, index) => index !== indexToRemove)
      );
    }

    const [staffs, setStaffs] = useState([])
    const loadStaffs = async() => {
      const res = await axios.get('/staffs')
      if (res.data.length > 0) {
        setStaffs(res.data);
      }
    }
    useEffect(()=>{loadStaffs()},[])
    return <Dialog open={show} classes={{
        paper: 'max-w-lg w-full m-8 sm:m-24'
    }}
    onClose={handleClose} aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
    <DialogTitle id="alert-dialog-title">
      Create
    </DialogTitle>
    <DialogContent>
      <Stack direction='row' spacing={2} className='pt-5'>
      <TextField value={taskName} onChange={(e)=> setTaskName(e.target.value)} helperText={checkName ? "This field is required" : false} 
      error={checkName} 
       style={{width:'70%'}} placeholder='Enter task title' label="Title" variant="outlined" />
      <DateTimePicker
              minDate={new Date()}
							value={taskDeadline}
							format="Pp"
							onChange={(value) => setTaskDeadline(value)}
							className="w-full sm:w-auto"
							slotProps={{
								textField: {
									label: 'Due date',
									placeholder: 'Choose a due date',
									InputLabelProps: {
										shrink: true
									},
									variant: 'outlined'
								}
							}}
						/>
      </Stack>
      <TextField value={taskDescription} onChange={e => setTaskDescription(e.target.value)} className='mb-8 mt-14' label="Description" multiline rows="4" variant="outlined" fullWidth />
      
      <div className="flex-1 mb-24">
						<div className="flex items-center mt-16 mb-12">
							<FuseSvgIcon size={20}>heroicons-outline:users</FuseSvgIcon>
							<Typography className="font-semibold text-16">Staffs</Typography>
						</div>
						{staffs.length>0 && <Autocomplete multiple options={staffs}
              getOptionLabel={(option) => option.name}
              filterSelectedOptions
              onChange={(event, value) => {setStaffList(value.map(item=> item.id))}}
              renderInput={(params) => (
                <TextField error={checkStaffList} helperText={checkStaffList? 'This field is required': null}
                  {...params}
                  label="Staffs"
                  placeholder="Select multiple staffs"
                />
              )}
            />}
					</div>
      <div className="flex-1 mb-24">
						<div className="flex items-center mt-16 mb-12">
							<FuseSvgIcon size={20}>heroicons-outline:check</FuseSvgIcon>
							<Typography className="font-semibold text-16">Checklists</Typography>
						</div>			
      {checklists.length > 0 && <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
       {checklists.map((item,index) => <ListItem key={index} secondaryAction={
      <IconButton edge="end" onClick={()=>handleDeleteChecklistItem(index)}>
                     <FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
                    </IconButton>}>
        <Typography className="text-14">{item.title}</Typography>
      </ListItem>) }
    </List>}
    <Stack direction='row' spacing={2}>
    <TextField value={inputChecklistValue} onKeyPress={e => {if(e.key === 'Enter' && inputChecklistValue.trim() !== '') handleAddChecklistItem()}}
    onChange={(e)=>setInputChecklistValue(e.target.value)} size='small'
    fullWidth placeholder='Add checklist' variant="outlined" />
    <Fab
					className="mx-4"
					aria-label="Add"
					size="small"
					color="secondary" onClick={handleAddChecklistItem}
					disabled={inputChecklistValue === '' ? true : false}
				>
					<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>
				</Fab>
    </Stack>
    </div>
    </DialogContent>
    <DialogActions>
      <Stack direction='row' spacing={2} className='me-14 mb-5'>
      <Button variant='contained' onClick={handleClose}>Cancel</Button>
      <Button variant='contained' color='secondary' onClick={add} >Add</Button>
      </Stack>
    </DialogActions>
  </Dialog>

}

export default CreateModal