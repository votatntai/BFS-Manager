// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import Stack from '@mui/material/Stack';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import { useEffect,useState } from 'react';
// import TextField from '@mui/material/TextField';
// import { ObjectMenuSampleToEdit } from '../../type/menu-sample.type';
// import { useAppDispatch, useAppSelector } from 'app/store';
// import { editMenuSample, menuSampleReducerState, getMenuSampleData } from './slice/menuSampleSlice';
// import Autocomplete from '@mui/material/Autocomplete';
// import axios from 'src/app/auth/services/api/customAxios';

// const EditModal = ({show,handleClose, object, setOpenSuccessSnackbar, setOpenFailSnackbar})=>{
//   const [menuSample, setMenuSample] =useState<ObjectMenuSampleToEdit>({
//     id: object.id,      
//     name: object.name,
//     speciesId: {
//       "label": object.species.name,
//       "value": object.species.id
//     },
//     careModeId: {
//       "label": object.careMode.name,
//       "value": object.careMode.id
//     },
//   }) 
//     const [checkName, setCheckName] = useState(false)
//     const [checkSpecies, setCheckSpecies] = useState(false)
//     const [checkCareMode, setCheckCareMode] = useState(false)
//     const pageNumber  = useAppSelector((state: menuSampleReducerState) => state.menuSampleReducer.menuSampleSlice.menuSamples.pagination.pageNumber)
//     const pageSize  = useAppSelector((state: menuSampleReducerState) => state.menuSampleReducer.menuSampleSlice.menuSamples.pagination.pageSize)
//     const dispatch = useAppDispatch()
//     const checkValid= () =>{
//       let check: boolean = true
//       if(menuSample.name.trim() === '') {setCheckName(true)} else setCheckName(false)
//       if(menuSample.speciesId === null || menuSample.speciesId.value === '') {setCheckSpecies(true)} else setCheckSpecies(false)
//       if(menuSample.careModeId === null || menuSample.careModeId.value === '') {setCheckCareMode(true)} else setCheckCareMode(false)
//       if(menuSample.name.trim() === ''){
//           check = false
//       }
//       return check;
//     }
  
//     const edit = async() => {
//       const validate = checkValid()
//       const formData = new FormData()
//       if(validate) {
//         const id:string = menuSample.id
//         formData.append('name', menuSample.name.trim())
//         formData.append('speciesId',menuSample.speciesId.value)
//         formData.append('careModeId',menuSample.careModeId.value)
//         await dispatch(editMenuSample({id, formData}))
//         await dispatch(getMenuSampleData({pageNumber: pageNumber, pageSize: pageSize}))
//         setOpenSuccessSnackbar(true)
//         handleClose()
//       }else setOpenFailSnackbar(true)
//     }  

//     const [comboboxSpecies,setComboboxSpecies] = useState([]);
//     const [comboboxCaremode,setComboboxCaremode] = useState([]);
//     const loadCombobox = async () => {
//       const res = await axios.get(`/species`)
//       const res1 = await axios.get(`/care-modes`)
//       if (res.data.length > 0) {
//         const updatedComboboxList = res.data.map((item) => ({
//           label: item.name,
//           value: item.id,
//         }));
//         setComboboxSpecies(updatedComboboxList);
//       }
//       if (res1.data.length > 0) {
//         const updatedComboboxList = res1.data.map((item) => ({
//           label: item.name,
//           value: item.id,
//         }));
//         setComboboxCaremode(updatedComboboxList);
//       }
//     };

//     useEffect(() => {
//       loadCombobox();
//     }, []);
//     return <Dialog fullWidth
//     open={show}
//     onClose={handleClose}
//     aria-labelledby="alert-dialog-title"
//     aria-describedby="alert-dialog-description"
//   >
//     <DialogTitle id="alert-dialog-title">
//       Edit
//     </DialogTitle>
//     <DialogContent>
//         <Stack direction='column' spacing={2} className='pt-5'>
//         {comboboxSpecies.length>0 &&<Autocomplete
//                   disablePortal  value={menuSample.speciesId}
//                   onChange={(event: any, newValue: any) => {
//                     setMenuSample(prev => ({...prev, speciesId: newValue}))
//                   }}
//                   options={comboboxSpecies} size='small'
//                   fullWidth
//                   renderInput={(params) => <TextField {...params} label={'Species'} helperText={checkSpecies ? "This field is required" : false}  
//                   error={checkSpecies ? true : false}/>}
//                 />}

//       {comboboxCaremode.length>0 &&<Autocomplete
//                   disablePortal  value={menuSample.careModeId}
//                   onChange={(event: any, newValue: any) => {
//                     setMenuSample(prev => ({...prev, careModeId: newValue}))
//                   }}
//                   options={comboboxCaremode} size='small'
//                   fullWidth
//                   renderInput={(params) => <TextField {...params} label={'Care mode'} helperText={checkCareMode ? "This field is required" : false}  
//                   error={checkCareMode ? true : false}/>}
//                 />}

//       <TextField helperText={checkName ? "This field is required" : false} 
//       error={checkName ? true : false} value={menuSample.name}
//       onChange={e => setMenuSample(prev => ({...prev, name: e.target.value}))} label='Name' 
//       placeholder='Enter name' size='small' variant="outlined" />
//         </Stack>
//     </DialogContent>
//     <DialogActions>
//       <Button variant='contained' onClick={handleClose}>Cancel</Button>
//       <Button variant='contained' color='success' onClick={edit} >Edit</Button>
//     </DialogActions>
    
//   </Dialog>
// }

// export default EditModal