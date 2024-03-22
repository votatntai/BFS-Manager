import { motion } from 'framer-motion';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CreateModal from './CreateModal';
import { useAppDispatch, useAppSelector } from 'app/store';
import { getTaskData} from '../slice/taskManagementSlice';

const TaskHeader = ({title})=>{
    const dispatch= useAppDispatch()
    const [show,setShow]=useState(false)
    const comboboxList = ['To do', 'Inprogress', 'Work finished', 'Done']
    const [value, setValue] = useState<string | null>(comboboxList[0]);
    const [inputValue, setInputValue] = useState('To do');
    const navigation = useNavigate()
    const pageSize  = useAppSelector((state) => state.taskManagementReducer.taskManagement.taskList.pagination.pageSize)
    useEffect(()=>{
        dispatch(getTaskData({status: inputValue, pageNumber: 0, pageSize: pageSize}))
    },[inputValue])
    return <div style={{background:'rgb(241, 245, 249)'}} className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
    <motion.span
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
    >
        <Typography className="text-24 md:text-32 font-extrabold tracking-tight">{title}</Typography>
    </motion.span>
    <motion.div  initial={{ opacity: 0, x: 20 }}  animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}>
        <Stack direction="row" spacing={2}>

         <Autocomplete size='small' value={value}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={comboboxList}
        sx={{ width: 200 }}
        renderInput={(params) => <TextField {...params} label="Status" />}
      />
            <Button onClick={()=>setShow(true)}
                variant="contained" className='me-12'
                color="secondary"
                startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
            >
                Add task
            </Button>
            <Tooltip title="Back">
            <Button
                variant="contained" onClick={()=>navigation(-1)}
                color="secondary"
                ><FuseSvgIcon>heroicons-outline:arrow-left</FuseSvgIcon>
            </Button></Tooltip>
        </Stack>
        </motion.div>
{show && <CreateModal setOpenSuccessSnackbar={()=>{}} setOpenFailSnackbar={()=>{}} show={show} handleClose={()=>{setShow(false)}}/>}
</div>
}
export default TaskHeader   