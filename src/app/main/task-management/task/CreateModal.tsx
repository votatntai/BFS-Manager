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
const CreateModal=({handleClose, show, setOpenFailSnackbar, setOpenSuccessSnackbar})=>{
    const [menuSample, setMenuSample] =useState({
      cageId: '',
      title: '',
      description: '',
      managerId: '',
      deadline: new Date(),
      status: '',
      assigneeIds: []
    })
    const formData = new FormData()
    const [checkName, setCheckName] = useState(false)
    const [checkSpecies, setCheckSpecies] = useState(false)
    const [checkCareMode, setCheckCareMode] = useState(false)
    const dispatch = useAppDispatch()
    // const pageNumber  = useAppSelector((state: menuSampleReducerState) => state.menuSampleReducer.menuSampleSlice.menuSamples.pagination.pageNumber)
    // const pageSize  = useAppSelector((state: menuSampleReducerState) => state.menuSampleReducer.menuSampleSlice.menuSamples.pagination.pageSize)
    const checkValid= () =>{
    //   let check: boolean = true
    //   if(menuSample.name.trim() === '') {setCheckName(true)} else setCheckName(false)
    //   if(menuSample.speciesId === null || menuSample.speciesId.value === '') {setCheckSpecies(true)} else setCheckSpecies(false)
    //   if(menuSample.careModeId === null || menuSample.careModeId.value === '') {setCheckCareMode(true)} else setCheckCareMode(false)
    //   if(menuSample.name.trim() === ''){
    //       check = false
    //   }
    //   return check;
    }
  
    const add = async() => {
    //   const validate = checkValid()
    //   if(validate) {
    //     formData.append('name',menuSample.name)
    //     formData.append('speciesId',menuSample.speciesId.value)
    //     formData.append('careModeId',menuSample.careModeId.value)
    //     await dispatch(addMenuSample(formData))
    //     await dispatch(getMenuSampleData({pageNumber: pageNumber, pageSize: pageSize}))
    //     setOpenSuccessSnackbar(true)
    //     handleClose()
    //   } else setOpenFailSnackbar(true)
    }  

    const [comboboxSpecies,setComboboxSpecies] = useState([]);
    const [comboboxCaremode,setComboboxCaremode] = useState([]);
    const loadCombobox = async () => {
      const res = await axios.get(`/species`)
      const res1 = await axios.get(`/care-modes`)
      if (res.data.length > 0) {
        const updatedComboboxList = res.data.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setComboboxSpecies(updatedComboboxList);
      }
      if (res1.data.length > 0) {
        const updatedComboboxList = res1.data.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setComboboxCaremode(updatedComboboxList);
      }
    };

    useEffect(() => {
      loadCombobox();
    }, []);
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
      <TextField style={{width:'70%'}} placeholder='Enter task title' label="Title" variant="outlined" />
      <DateTimePicker
              minDateTime={new Date()}
							value={new Date()}
							format="Pp"
							onChange={(value) => console.log(value)}
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
      <TextField className='mb-8 mt-14' label="Description" multiline rows="4" variant="outlined" fullWidth />
      
      <div className="flex-1 mb-24 mx-8">
						<div className="flex items-center mt-16 mb-12">
							<FuseSvgIcon size={20}>heroicons-outline:users</FuseSvgIcon>
							<Typography className="font-semibold text-16 mx-8">Staffs</Typography>
						</div>
						<Autocomplete multiple options={[{id: 1, name:'a'},{id: 2, name:'b'},{id: 3, name:'c'}]}
              getOptionLabel={(option) => option.name}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Staffs"
                  placeholder="Select multiple staffs"
                />
              )}
            />
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