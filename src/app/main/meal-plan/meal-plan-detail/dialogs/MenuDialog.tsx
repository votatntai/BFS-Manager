import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/store';
import { setMenuDialog, selectMenuDialogState, createMenu } from '../store/menusSlice';
import { useRef, useState } from 'react';
import { showMessage } from 'app/store/fuse/messageSlice';

export default function MenuDialog() {
    const dispatch = useAppDispatch()
    const open = useAppSelector(selectMenuDialogState)
    const [menuNameValue, setMenuNameValue] = useState("");
    const handleChange = (event) => {
        setMenuNameValue(event.target.value);
    };
    function handleClose() {
        dispatch(setMenuDialog(false))
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const data = { name: menuNameValue };
                    dispatch(createMenu(data))
                    const msg = {
                        variant: 'success',
                        autoHideDuration: 2000,
                         message : `Add menu ${menuNameValue} successfully`,
                    }
                    handleClose()
                    dispatch(showMessage(msg))

                }
            }}
        >
            <div className="flex justify-center">
                <DialogTitle className="font-oleoScript text-40" >Create menu </DialogTitle>

            </div>
            <DialogContent>
                <TextField
                    value={menuNameValue}
                    onChange={handleChange}
                    className="mt-8 mb-16 w-[300px] "
                    required
                    label="Menu name"
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Add</Button>
            </DialogActions>
        </Dialog>
    )
}
