import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AgGridReact } from'ag-grid-react';
import'ag-grid-community/dist/styles/ag-grid.css';
import'ag-grid-community/dist/styles/ag-theme-alpine.css';
import'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Customers(props) {
  const gridRef = useRef();
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => fetchData(), []); 

  //Customers CRUD
  const fetchData = () => { 
      fetch('https://customerrest.herokuapp.com/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data.content))
  }
  
  const saveCustomer = (customer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
    .then(res => {
      fetchData()
      setOpen(true)
      setMsg("New customer was added")
    })
    .catch(err => console.error(err))
  }

  const deleteCustomer = (link) => {
    if(window.confirm('Are you sure?')) {
    fetch(link, {method: 'DELETE'})
    .then(res => {
      fetchData()
      setOpen(true)
      setMsg("Customer was deleted")
    })
    .catch(err => console.log(err))
    }
  }

  const updateCustomer = (customer, link) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
    .then(res => {
      fetchData()
      setOpen(true)
      setMsg("Customer was updated")
    })
    .catch(err => console.error(err))
  } 

  // Save training
  const saveTraining = (training) => {
    fetch('https://customerrest.herokuapp.com/api/trainings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(training)
    })
    .then(res => {
      fetchData()
      setOpen(true)
      setMsg("New training was added")
    })
    .catch(err => console.error(err))
  }
  // CSV Export
  const onBtnExport = useCallback(() => {
    const params = {
      columnKeys: ["firstname", "lastname", "streetaddress", "postcode", "city", "email", "phone"]
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

  // AG-Grid table
  const columns = [
      { headerName: 'Firstname', field: "firstname", width: 170, sortable: true, filter: true },
      { headerName: 'Lastname', field: "lastname", width: 170, sortable: true, filter: true },  
      { headerName: 'Street address', field: "streetaddress", sortable: true, filter: true },
      { headerName: 'Postcode', field: "postcode", width: 120, sortable: true, filter: true },
      { headerName: 'City', field: "city", width: 140, sortable: true, filter: true },
      { headerName: 'Email', field: "email", sortable: true, filter: true },
      { headerName: 'Phone', field: "phone", sortable: true, filter: true },
      {  headerName: "", field: 'links.0.href', width: 150, cellRenderer:(cell) =>
        <AddTraining saveTraining={saveTraining} customerId={cell.value} />
      },
      { width: 70, cellRenderer:(row) =>
        <EditCustomer updateCustomer={updateCustomer} customer={row.data}/> },
      {  headerName: "", field: 'links.0.href', width: 70, cellRenderer:(cell) =>
        <Button size="small" color="secondary" onClick={() => deleteCustomer(cell.value)}><DeleteIcon/></Button>
      }
    ]

  return (
    <Grid container>
      <Grid item md={8} sm={12}>
        <h1>CUSTOMERS</h1>
      </Grid>
      <Grid item md={4} sm={12} container justifyContent="center" alignItems="center" direction="row">
        <ButtonGroup variant="contained" aria-label="outlined primary button group" style={{margin: 20}}>
          <AddCustomer saveCustomer={saveCustomer}/>
          <Button color="secondary" variant="contained" onClick={() => onBtnExport()}>Export</Button>
        </ButtonGroup>
      </Grid>
      <Box sx={{ marginX: 'auto', p: 3, bgcolor: 'background.default', borderRadius: 5, width: '95%' }}>
        <div className={`${props.agTheme}`}
            style={{height: '600px', margin: 'auto'}} >
          <AgGridReact
            ref={gridRef}
            columnDefs={columns}
            rowData={customers}>
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
  );
}