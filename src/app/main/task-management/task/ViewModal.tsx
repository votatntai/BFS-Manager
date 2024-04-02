import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect,useState } from 'react';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from 'app/store';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'src/app/auth/services/api/customAxios';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { editTask,getTaskData,assignStaff,removeStaff,updateStaffForChecklist } from '../slice/taskManagementSlice';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const ViewModal = ({show,handleClose,object})=>{
  const [assignee, setAssignee] = useState(object.assignStaffs.map(item => item.staff))
  const [checklists, setChecklists] =useState(object.checkLists)
  const [task, setTask] =useState({
    cageId: object.cage.id,      
    title: object.title,
    description: object.description,
    deadline: object.deadline,
    status: object.status,
  }) 
  // console.log(object)
  
  const [value, setValue] =useState(object.status)
    const [checkName, setCheckName] = useState(false)
    const [checkTaskStatus, setCheckTaskStatus] = useState(false)
    const pageNumber  = useAppSelector((state) => state.taskManagementReducer.taskManagement.taskList.pagination.pageNumber)
    const pageSize  = useAppSelector((state) => state.taskManagementReducer.taskManagement.taskList.pagination.pageSize)
    const dispatch = useAppDispatch()
    
    const checkReadOnly = () =>{
      let bool = true
      if(task.status === 'To do'){
         bool = false
        }else if(task.status === 'Inprogress') {
          bool = false
        }else if(task.status === 'Done') {
          bool = true
        }else bool = true
      return bool
    }
    const comboboxList = ['To do', 'Inprogress', 'Work finished', 'Done', 'Cancel']
    const [staffs, setStaffs] = useState([])
    const loadStaffs = async() => {
      const res = await axios.get('/staffs')
      if (res.data.length > 0) {
        setStaffs(res.data);
      }
    }
    useEffect(()=>{loadStaffs()},[])
    
    return <Dialog fullWidth
    open={show}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      <Stack direction='row' className='justify-between	'>
      Task detail
      <Autocomplete disablePortal value={value} size='small'
        inputValue={task.status} readOnly={true}
        options={comboboxList}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="Status"/>}
    />
      </Stack>
    </DialogTitle>
    <DialogContent>
    <Stack direction='row' spacing={2} className='pt-5'>
      <TextField value={task.title} style={{width:'70%'}} placeholder='Enter task title' label="Title" variant="outlined" />
      <DateTimePicker readOnly={true}
              minDate={new Date()}
							value={new Date(task.deadline)}
							format="Pp"
							onChange={(value) => setTask(prev => ({...prev, deadline: value}))}
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
      <TextField value={task.description} className='mb-8 mt-14' label="Description" multiline rows="4" variant="outlined" fullWidth />
      <div className="flex-1 mb-24">
						<div className="flex items-center mt-16 mb-12">
							<FuseSvgIcon size={20}>heroicons-outline:users</FuseSvgIcon>
							<Typography className="font-semibold text-16">Staffs</Typography>
						</div>
						{staffs.length>0 && <Autocomplete multiple options={staffs.filter(staff => !assignee.some(a => a.id === staff.id))}
            defaultValue={assignee} getOptionLabel={(option) => option.name}
              filterSelectedOptions readOnly={true}
              renderInput={(params) => (
                <TextField 
                  {...params}
                  label="Staffs"
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
       {checklists.map((item) => <ListItem key={item.id}>
        <Stack direction='row' spacing={4} >
        <Checkbox disabled checked={item.status} />
        <Typography className="text-14" style={{marginTop:'10px'}}>
          {item.title}
          </Typography>
        <Autocomplete options={assignee} size='small'  sx={{ width: 200 }}
              getOptionLabel={(option:any) => option.name} 
              defaultValue={item.asignee} readOnly={true}
              renderInput={(params) => (
                <TextField 
                  {...params}
                  placeholder={task.status !== 'To do' ? null : "Select a staff"}
                />
              )}
            />
        </Stack>
      </ListItem>) }
    </List>}
    </div>
    </DialogContent>
    <DialogActions>
    <Stack direction='row' spacing={2} className='me-14 mb-5'>
        <Button variant='contained' onClick={handleClose}>Cancel</Button>
    </Stack>
    </DialogActions>
  </Dialog>
}

export default ViewModal