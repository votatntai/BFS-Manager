import { Stack,Button, TextField, Typography, Autocomplete,Snackbar,Alert } from "@mui/material"
import { useState,useEffect } from "react"
import axios from "src/app/auth/services/api/customAxios"
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useAppDispatch } from "app/store";
import { editBird } from "../slice/birdSlice";
interface Bird {
    id: string;
    thumbnailUrl: string;
    characteristic: string;
    name: string;
    gender: boolean;
    dayOfBirth: string;
    code: string;
    cage: any;
    menu: any;
    species: any;
    careMode: any;
    category: any;
    createAt: string;
  }
  

export default function BirdDetailContent({id}){
    const [birdDetail, setBirdDetail]=useState<Bird | undefined>()
    const [species, setSpecies]=useState([])
    const [caremodes, setCaremodes]=useState([])
    const [categories, setCategories]=useState([])
    const [menuSamples, setMenuSamples]=useState([])
    const [cages, setCages]=useState([])
    const dispatch=useAppDispatch()
    const loadData= async()=>{
        try {
            const resBirdDetail = await axios.get(`/birds/${id}`)
            const resSpecies = await axios.get('/species')
          const resCaremode = await axios.get('/care-modes')
          const resBirdCategory = await axios.get('/bird-categories')
          const resCage = await axios.get('/cages')
            setBirdDetail(resBirdDetail)
            if (resSpecies.data) {
              const newList = resSpecies.data.map(item => ({
                label: item.name,
                value: item.id
              }));
              setSpecies(newList);
            }
            if (resCaremode.data) {
              const newList = resCaremode.data.map(item => ({
                label: item.name,
                value: item.id
              }));
              setCaremodes(newList);
            }
            if (resBirdCategory.data) {
              const newList = resBirdCategory.data.map(item => ({
                label: item.name,
                value: item.id
              }));
              setCategories(newList);
            }
            if (resCage.data) {
              const newList = resCage.data.map(item => ({
                label: item.name,
                value: item.id
              }));
              setCages(newList);
            }
        } catch (error) {
            console.log(error)
        }
    }
    const loadData2 = async() =>{
      try {
        if(birdDetail){
          const resMenuSample = await axios.get('/menu-samples',{params: {speciesId: birdDetail.species.id,careModeId: birdDetail.careMode.id}})
          if (resMenuSample.data) {
            const newList = resMenuSample.data.map(item => ({
              label: item.name,
              value: item.id
            }));
            setMenuSamples(newList);
          }
        }
          } catch (error) {
        console.log(error)  
      }
    }

    const [successNotify, setSuccessNotify] = useState(false)
    const [failNotify, setFailNotify] = useState(false)
    const updateBird = async() =>{
      const formData = new FormData()
      formData.append('name',birdDetail.name)
      formData.append('characteristic',birdDetail.characteristic)
      formData.append('gender', birdDetail.gender.toString())
      formData.append('dayOfBirth',birdDetail.dayOfBirth)
      formData.append('code',birdDetail.code)
      formData.append('thumbnail',birdDetail.thumbnailUrl)
      formData.append('cageId',birdDetail.cage.id)
      formData.append('menuId',birdDetail.menu.id)
      formData.append('speciesId',birdDetail.species.id)
      formData.append('careModeId',birdDetail.careMode.id)
      formData.append('categoryId',birdDetail.category.id)
      const res = await dispatch(editBird({id: id, formData: formData}))
      if(res){
        setSuccessNotify(true)
      }else setFailNotify(true)
    }
    useEffect(()=>{
        loadData()
        birdDetail && loadData2()
    },[])
    console.log('test')
    return <div className="w-full flex flex-col min-h-full bg-white">
    {birdDetail && <Stack direction='row' spacing={4} className='justify-between mx-28 mt-28'>
    <Stack direction='column' spacing={2}>
      { (birdDetail.thumbnailUrl === null || birdDetail.thumbnailUrl === undefined) ? <AddPhotoAlternateIcon className='h-3/5 w-full'/> : <img alt='bird-img' src={birdDetail.thumbnailUrl} className='rounded-12 h-3/5 w-full'/>}
      <Stack direction="row" spacing={2} className='justify-center'>
              <Button variant='contained' onClick={()=>document.getElementById('fileInput').click()}>
                  <FuseSvgIcon>heroicons-outline:cloud-upload</FuseSvgIcon>
                  Upload image
              </Button>
              <input id="fileInput" type="file" hidden={true} onChange={(e: any) => {
                console.log(e.target.files[0])
              setBirdDetail(prev => ({...prev, thumbnailUrl: e.target.files[0] === undefined ? null : URL.createObjectURL(e.target.files[0])}))
            }} />
            {birdDetail.thumbnailUrl && <Button variant='contained' onClick={()=>{setBirdDetail(prev => ({...prev, thumbnailUrl: null }))}}>
                  <FuseSvgIcon>heroicons-outline:x-circle</FuseSvgIcon>
                  Clear image
            </Button>}
            </Stack>
    </Stack>
    <Stack direction="column" spacing={2} width={'80%'}>
    <TextField fullWidth value={birdDetail.name} label='Name' onChange={e => setBirdDetail(prev => ({...prev, name: e.target.value}))}/>
    <TextField fullWidth value={birdDetail.characteristic} label='Characteristic' onChange={e => setBirdDetail(prev => ({...prev, characteristic: e.target.value}))}/>
    <Stack direction='row' spacing={2}>
    <TextField size='small' value={birdDetail.code} label='Code' onChange={e => setBirdDetail(prev => ({...prev, code: e.target.value}))}/>
    <Autocomplete size='small' 
      value={{ label: birdDetail.gender ? 'Female' : 'Male', value: birdDetail.gender }}
      onChange={(event: any, newValue: { label: string; value: boolean } | null) => {
        setBirdDetail(prev => ({
          ...prev,
          gender: newValue ? newValue.value : null
        }));
      }}
      options={[
        { label: 'Male', value: false },
        { label: 'Female', value: true }
      ]}
      sx={{ width: '15rem' }} renderInput={(params) => <TextField  sx={{ background: 'white' }} {...params} label="Gender" />}
    />
    <DateTimePicker value={new Date(birdDetail.dayOfBirth)} format="dd/MM/yyyy, hh:mm a" 
                  onChange={(value) => {
                      setBirdDetail(prev => ({ ...prev, dayOfBirth: value.toString() }));
                  }} className="w-full sm:w-auto"
                  slotProps={{
                    textField: {
                      size: 'small',
                      label: 'Birthdate',
                      placeholder: 'Choose a date',
                      InputLabelProps: {
                        shrink: true
                      },
                      variant: 'outlined'
                    }
                  }}
                />
    </Stack>
    <Stack direction='row' spacing={2}>
    {species.length > 0 && <Autocomplete size='small' 
      value={{ label: birdDetail.species.name, value: birdDetail.species.id }}
      onChange={(event: any, newValue: any) => {
        if (newValue !== null) { // Check if newValue is not null
          setBirdDetail(prev => ({
            ...prev,
            species: { name: newValue.label, id: newValue.value }
          }));
        } else {
          // Handle the case when the value is cleared
          setBirdDetail(prev => ({
            ...prev,
            species: { name: '', id: '' }
          }));
        }
      }}
      options={species}
      sx={{ width: '33%' }} renderInput={(params) => <TextField {...params} label="Species" />}
    />}
    {caremodes.length > 0 && <Autocomplete size='small' 
      value={{ label: birdDetail.careMode.name, value: birdDetail.careMode.id }}
      onChange={(event: any, newValue: any) => {
        if (newValue !== null) { // Check if newValue is not null
          setBirdDetail(prev => ({
            ...prev,
            careMode: { name: newValue.label, id: newValue.value }
          }));
        } else {
          // Handle the case when the value is cleared
          setBirdDetail(prev => ({
            ...prev,
            careMode: { name: '', id: '' }
          }));
        }
      }}
      options={caremodes}
      sx={{ width: '33%' }} renderInput={(params) => <TextField {...params} label="Caremode" />}
    />}
    {categories.length > 0 && <Autocomplete size='small' 
      value={{ label: birdDetail.category.name, value: birdDetail.category.id }}
      onChange={(event: any, newValue: any) => {
        if (newValue !== null) { // Check if newValue is not null
          console.log({ name: newValue.label, id: newValue.value })
          setBirdDetail(prev => ({
            ...prev,
            category: { name: newValue.label, id: newValue.value }
          }));
        } else {
          // Handle the case when the value is cleared
          setBirdDetail(prev => ({
            ...prev,
            category: { name: '', id: '' }
          }));
        }
      }}
      options={categories}
      sx={{ width: '33%' }} renderInput={(params) => <TextField {...params} label="Category" />}
    />}
    </Stack>
    <Autocomplete size='small' 
      value={{ label: birdDetail.cage.name, value: birdDetail.cage.id }}
      onChange={(event: any, newValue: any) => {
        if (newValue !== null) { // Check if newValue is not null
          setBirdDetail(prev => ({
            ...prev,
            cage: { name: newValue.label, id: newValue.value }
          }));
        } else {
          // Handle the case when the value is cleared
          setBirdDetail(prev => ({
            ...prev,
            cage: { name: '', id: '' }
          }));
        }
      }}
      options={cages} fullWidth
      renderInput={(params) => <TextField  sx={{ background: 'white' }} {...params} label="Menu" />}
    />
    <Autocomplete size='small' 
      value={{ label: birdDetail.menu.name, value: birdDetail.menu.id }}
      onChange={(event: any, newValue: any) => {
        if (newValue !== null) { // Check if newValue is not null
          setBirdDetail(prev => ({
            ...prev,
            menu: { name: newValue.label, id: newValue.value }
          }));
        } else {
          // Handle the case when the value is cleared
          setBirdDetail(prev => ({
            ...prev,
            menu: { name: '', id: '' }
          }));
        }
      }}
      options={menuSamples} fullWidth
      renderInput={(params) => <TextField  sx={{ background: 'white' }} {...params} label="Menu" />}
    />
    <Stack direction='row' className='justify-end'>
      <Button variant='contained' color='success' onClick={updateBird}>Edit</Button>
    </Stack>
    </Stack>
    
    </Stack>  }  
    <Snackbar open={successNotify} autoHideDuration={3000} onClose={()=>{setSuccessNotify(false)}} anchorOrigin={{vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={()=>{setSuccessNotify(false)}}
          severity="success" variant="filled" sx={{ width: '100%' }}>
          Edit successfully
        </Alert>
      </Snackbar>
    <Snackbar open={failNotify} autoHideDuration={3000} onClose={()=>{setFailNotify(false)}} anchorOrigin={{vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={()=>{setFailNotify(false)}}
          severity="error" variant="filled" sx={{ width: '100%' }}>
          Edit failed
        </Alert>
      </Snackbar>
    </div>
}