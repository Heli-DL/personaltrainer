import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AgGridReact } from'ag-grid-react';
import'ag-grid-community/dist/styles/ag-grid.css';
import'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import moment from "moment";
import DeleteIcon from '@mui/icons-material/Delete';
import MuiAlert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Trainings(props) {
  const [trainings, setTrainings] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const gridRef = useRef();
  
  useEffect(() => fetchData(), []); 

  const fetchData = () => { 
      fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => setTrainings(data))
  } 

  const deleteTraining = (id) => {
    if(window.confirm('Are you sure?')) {
    fetch("https://customerrest.herokuapp.com/api/trainings/" + id, {method: 'DELETE'})
    .then(res => {
      fetchData()
      setOpen(true)
      setMsg("Training was deleted")
    })
    .catch(err => console.log(err))
    }
  }

  const onBtnExport = useCallback(() => {
    const params = {
      columnKeys: ["activity", "date", "duration", "fullname"]
    };
    gridRef.current.api.exportDataAsCsv(params);
  }, []);

  // Snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const columns = [
      { headerName: 'Activity', field: "activity", sortable: true, filter: true },
      { headerName: 'Date', field: "date" , valueGetter(params) {
        return moment(params.data.date).format("DD.MM.YYYY HH:MM");
        }, sortable: true, filter: true },
      { headerName: 'Duration (min)', field: "duration", sortable: true, filter: true },  
      { headerName: 'Customer', field: "fullname",
        valueGetter: (params) => {
          if(!params.data.customer) return 'unknown';
          return params.data.customer.firstname + " " + params.data.customer.lastname;
        },
        sortable: true, filter: true },
      {  headerName: "", field: 'id', width: 80, cellRenderer:(cell) =>
        <Button size="small" color="secondary" onClick={() => deleteTraining(cell.value)}><DeleteIcon/></Button>
      }
    ]

  return (
    <Grid container>
      <Grid item xs={12}>
        <h1 style={{textAlign: 'center', margin: '1.5rem'}}>TRAININGS</h1>     
      </Grid>
      <Grid item xs={12}>
        <Box sx={{m: '0 auto', p: 5, borderRadius: 5, bgcolor: 'background.default', width: {xs: '90%', lg: '60%'}, boxShadow: 1 }}>
          <div className={`${props.agTheme}`}
              style={{height: '500px'}} >
            <AgGridReact
              ref={gridRef}
              columnDefs={columns}
              rowData={trainings}>
            </AgGridReact>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              action={action}
            >
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {msg}
              </Alert>
            </Snackbar>
          </div>
        </Box>
      </Grid>
      <Grid container justifyContent="center">
        <Button color="secondary" variant="contained" size="medium" onClick={() => onBtnExport()} sx={{margin: 3}}>Export</Button>
      </Grid>
    </Grid>
  );
}