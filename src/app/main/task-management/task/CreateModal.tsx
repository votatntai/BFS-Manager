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
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const CreateModal=({handleClose, show, cageId,setOpenFailSnackbar, setOpenSuccessSnackbar})=>{
    const [taskName, setTaskName] =useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskBegin, setTaskBegin] = useState(new Date())
    const [taskDeadline, setTaskDeadline] = useState(() => {
      const deadline = new Date(taskBegin);
      deadline.setHours(deadline.getHours() + 4); // Set deadline 4 hours later
      return deadline;
    });
    const [inputChecklistValue, setInputChecklistValue] =useState('')
    const [repeat, setRepeat] =useState(false)
    const [repeatObject, setRepeatObject] =useState({
      "type": "daily",
      "time": 1,
    })
    const [checklists, setChecklists] =useState([])
    const [feedbacks, setFeedbacks] =useState([])
    const [inputFeedbackValue, setInputFeedbackValue] =useState({
      question: '',
      positive: false,
      severity: 0
    })
    const [staffList, setStaffList] =useState([])
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
          "startAt": "2024-04-02T14:38:23.108Z",
          "deadline": taskDeadline.toDateString(),
          "status": "To do",
          "assigneeIds": staffList,
          "checkLists": checklists,
          "repeats": [
            
          ],
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

    const [orderCount, setOrderCount] = useState(0);
    const handleAddChecklistItem =()=>{
      setChecklists(prevChecklists => [...prevChecklists, {
        "title": inputChecklistValue,
        "order": orderCount 
      }]);
      setInputChecklistValue('')
      setOrderCount(prevOrderCount => prevOrderCount + 1)
    }
    const handleAddFeedbackItem =()=>{
      setFeedbacks(prevLists => [...prevLists, inputFeedbackValue]);
      setInputFeedbackValue({
        question: '',
        positive: false,
        severity: 0
      })
    }
    const handleDeleteChecklistItem =(indexToRemove)=>{
      setChecklists(prevChecklists =>
        prevChecklists.filter((_, index) => index !== indexToRemove)
      );
    }
    const handleDeleteFeedbakItem =(indexToRemove)=>{
      setFeedbacks(prevLists =>
        prevLists.filter((_, index) => index !== indexToRemove)
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
      <Stack direction='row' className='justify-between'>
      Create
      <FormControlLabel control={<Checkbox checked={repeat} onChange={(e) => setRepeat(e.target.checked )}  />} label="Repeat" />
      </Stack>
    </DialogTitle>
    <DialogContent>
      {repeat && <Stack direction='row' spacing={4} className='pt-5 mb-8'>
      <Autocomplete disablePortal value={repeatObject.type}  onChange={(e, v) => setRepeatObject({ ...repeatObject, type: v })} options={['daily','monthly']} disabled={!repeat} sx={{width: 200}}
          size='small' clearIcon={null}  renderInput={(params) => <TextField {...params} label="Repeat" />} />  
      <FormControlLabel control={<TextField value={repeatObject.time} onChange={e => setRepeatObject({ ...repeatObject, time: parseInt(e.target.value)}) }
     type={'number'} size='small' inputProps={{ min: 1 }} sx={{width:'6rem', marginRight:'1rem'}}/>} label="time(s)" labelPlacement='end' />
      </Stack>}
      <Stack direction='row' spacing={2} className='pt-5'>
      <TextField value={taskName} onChange={(e)=> setTaskName(e.target.value)} helperText={checkName ? "This field is required" : false} 
      error={checkName} sx={{width:'40$'}} placeholder='Enter task title' label="Title" variant="outlined"/>
      <DateTimePicker minDate={new Date()} value={taskBegin} format="dd/MM/yyyy, hh:mm a"
							onChange={(value) => {
                setTaskBegin(value);
                const deadline = new Date(value);
                deadline.setHours(deadline.getHours() + 4); // Set deadline 4 hours later
                setTaskDeadline(deadline);
              }} className="w-full sm:w-auto"
							slotProps={{
								textField: {
									label: 'Start date',
									placeholder: 'Choose a start date',
									InputLabelProps: {
										shrink: true
									},
									variant: 'outlined'
								}
							}}
						/>
      <DateTimePicker minDate={taskBegin} value={taskDeadline} format="dd/MM/yyyy, hh:mm a"
							onChange={(value) => setTaskDeadline(value)} className="w-full sm:w-auto"
							slotProps={{
								textField: {
									label: 'Deadline',
									placeholder: 'Choose a deadline',
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
    
    <div className="flex items-center mt-16 mb-12">
							<FuseSvgIcon size={20}>heroicons-outline:annotation</FuseSvgIcon>
							<Typography className="font-semibold text-16">Feedback</Typography>
						</div>
            {feedbacks.length > 0 && <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
       {feedbacks.map((item,index) => <ListItem key={index}>
                    <Stack direction='row' spacing={5} alignItems="center">
                      <Typography sx={{width:'28rem'}} className="text-14">{item.question}</Typography>
                      <Typography sx={{width:'15rem'}} className="text-14">{item.positive ? 'Positive question' : 'Negative question'}</Typography>
                      <Typography sx={{width:'13rem'}} className="text-14">Severity level {item.severity}</Typography>
                      <IconButton onClick={()=>handleDeleteFeedbakItem(index)}>
                     <FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
                    </IconButton>
                    </Stack>
      </ListItem>)}
    </List>}
    <Stack direction='row' spacing={4}>
    <TextField sx={{width:'40rem'}} value={inputFeedbackValue.question} onKeyPress={e => {if(e.key === 'Enter' && inputFeedbackValue.question.trim() !== '') handleAddFeedbackItem()}}
    onChange={(e) => setInputFeedbackValue({ ...inputFeedbackValue, question: e.target.value })} size='small' placeholder='Add question' variant="outlined" />
    <FormControlLabel control={<Checkbox checked={inputFeedbackValue.positive} onChange={(e) => setInputFeedbackValue({ ...inputFeedbackValue, positive: e.target.checked })}  />} label="Positive" />
    <FormControlLabel control={<TextField value={inputFeedbackValue.severity} onChange={(e) => setInputFeedbackValue({ ...inputFeedbackValue, severity: parseInt(e.target.value) })} 
     type={'number'} size='small' inputProps={{ min: 0, max: 5 }}
     sx={{width:'6rem', marginRight:'1rem'}}/>} label="Severity" labelPlacement='end' />
    <Fab
					className="mx-4"
					aria-label="Add"
					size="small"
					color="secondary" onClick={handleAddFeedbackItem}
					disabled={inputFeedbackValue.question.trim() === '' ? true : false}
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