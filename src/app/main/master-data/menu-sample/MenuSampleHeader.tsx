import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import { Button, Input, Paper, Typography } from '@mui/material'
import { useAppDispatch } from 'app/store'
import { motion } from 'framer-motion'
import { setMenuSampleDialog } from './store/menuSamplesSlice'

export default function MenuSampleHeader() {
    const dispatch = useAppDispatch()
    return (
        <div style={{ background: 'rgb(241, 245, 249)' }} className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
            <motion.span
                initial={{ x: -20 }}
                animate={{ x: 0, transition: { delay: 0.2 } }}
            >
                <Typography className="text-24 md:text-32 font-extrabold tracking-tight">Menu sample</Typography>
            </motion.span>
            <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
                <Paper
                    component={motion.div}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                    className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
                >
                    <Input
                        placeholder="Search areas"
                        disableUnderline
                        fullWidth
                        //value={searchValue} onKeyPress={e => {if(e.key==='Enter') handleSearch()}}
                        inputProps={{
                            'aria-label': 'Search'
                        }}
                    //onChange={e => setSearchValue(e.target.value)}
                    />

                </Paper>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
                >
                    <Button
                        variant="contained" className='me-12'
                        color="secondary"
                        startIcon={<FuseSvgIcon>heroicons-outline:search</FuseSvgIcon>}
                    //onClick={()=>{handleSearch();setSearchValue('')}}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => {
                            dispatch(setMenuSampleDialog(true))
                        }}
                        variant="contained" color="secondary"
                        startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
                    >
                        Add
                    </Button>
                </motion.div>
            </div>
        </div>
    )
}
