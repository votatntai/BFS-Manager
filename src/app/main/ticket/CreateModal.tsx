import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useAppDispatch,useAppSelector } from 'app/store';
import axios from 'src/app/auth/services/api/customAxios';
import Autocomplete from '@mui/material/Autocomplete';

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
      <Stack direction='column' spacing={2} className='pt-5'>
          
      </Stack>

    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={handleClose}>cancel</Button>
      <Button variant='contained' color='secondary' onClick={add} >Add</Button>
    </DialogActions>
  </Dialog>

}

export default CreateModal