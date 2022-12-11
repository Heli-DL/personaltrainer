import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function AddTraining(props) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    activity: '', date: '', duration: '', customer: props.customerId
  });
  const [value, setValue] = useState(new Date());
 
  const handleClickOpen = () => {
      setOpen(true);
    };
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setTraining({...training, [event.target.name]: event.target.value})
  }

  const setDateTime = (newValue) => {
    const time = newValue.toISOString();
    console.log(time);
    setValue(time);
    setTraining({...training, date: value});
  }

  const addTraining = () => {
    console.log(training);
    props.saveTraining(training);
    handleClose();
  }

  return(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div>
      <Button size="small" sx={{height: 30}} style={{margin: 5}} variant="outlined" color="primary" onClick={handleClickOpen}>
        ADD TRAINING
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>   
          <TextField
            autoFocus
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={e => handleInputChange(e)}
            label="Activity"
            fullWidth
          />
          <DateTimePicker
            value={value}
            onChange={(newValue) => {
              setDateTime(newValue);
            }}
            renderInput={(props) => <TextField  {...props} />}
          />    
          <TextField
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={e => handleInputChange(e)}
            label="Duration"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={addTraining} color="secondary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
    </LocalizationProvider>
  )
}