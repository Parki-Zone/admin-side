import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { CodeSharp } from '@material-ui/icons';
import axios from "axios";


export default function AddressForm() {
    const [parikingName, setparikingName] = useState("");
    const [totalPlaces, settotalPlaces] = useState("");
    const [emptyPlaces, setemptyPlaces] = useState("");
    const [price, setprice] = useState("");
    const [longitude, setlongitude] = useState("");
    const [altitude, setaltitude] = useState("");

    const [state, setState] = useState({
        parikingName:"",
        totalPlaces:"",
        emptyPlaces:"",
        price:"",
        longitude:"",
        altitude:""
    })

    const handleChange = (e) => {
        const { name ,value } = e.target
         setState(prevState =>({
             ...prevState,
             [name]: value
         }))
         console.log(state);
    }

    const handleSubmit = () => {
        var parkiToAdd = {
            parkname:  state.parikingName,
            totalPlaces:  state.totalPlaces,
            emptyPlaces: state.emptyPlaces,
            price: state.price,
            long: state.longitude,
            latit: state.altitude
        };
        axios.post('http://localhost:3000/api/ParkiZone/parking/create', parkiToAdd)
        .then((response) => {
            console.log("parking created");
        }).catch((error) => {
            console.log("Failed to add parking");
        })
    }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Add a Parking
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="parikingName"
            name="parikingName"
            label="Parking name"
            fullWidth
            autoComplete="given-name"
            onChange={(e)=>handleChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="totalPlaces"
            name="totalPlaces"
            label="Total places"
            fullWidth
            type="number"
            autoComplete="family-name"
            onChange={(e)=>handleChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="emptyPlaces"
            name="emptyPlaces"
            label="Empty places"
            fullWidth
            type="number"
            autoComplete="shipping address-level2"
            onChange={(e)=>handleChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField 
          id="price" 
          name="price" 
          label="Price" 
          fullWidth 
          type="number"
          onChange={(e)=>handleChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="longitude"
            name="longitude"
            label="Longitude"
            fullWidth
            type="number"
            autoComplete="shipping postal-code"
            onChange={(e)=>handleChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="altitude"
            name="altitude"
            label="Altitude"
            fullWidth
            autoComplete="shipping country"
            onChange={(e)=>handleChange(e)}
          />
        </Grid>
        <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
        CONFIRM
      </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}