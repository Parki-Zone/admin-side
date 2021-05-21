import React  , { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
// import CreateForeverIcon from '@material-ui/icons/CreateForever';
import AddIcon from '@material-ui/icons/Add';
const axios = require('axios');

// Generate Order Data



function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));


export default function Orders() {
  const classes = useStyles();
  const [state, setState] = useState({
    data: []
});

useEffect(() => {
    const timer = window.setTimeout(() => {
        axios.get('http://localhost:3000/api/ParkiZone/parkings').then((response) =>{
            setState({ data: response.data });
            console.log('parkings',response);
        }).catch((error) =>{
            console.log(error);
        })
  }, 1000);

  return () => window.clearTimeout(timer );
  },[]);
  
  const deletePark = (park) => {
    axios.post(`http://localhost:3000/api/ParkiZone/park/delete/${park.parkingId}`).then((response) =>{
        console.log("deleted",response);
    }).catch((error) =>{
        console.log(error);
    })
}
  return (
    <React.Fragment>
      <Title>ParkiZone Parkings</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Parkname</TableCell>
            <TableCell>total Places</TableCell>
            <TableCell>empty Places</TableCell>
            <TableCell >Price</TableCell>
            <TableCell >Long</TableCell>
            <TableCell >Latit</TableCell>
            <TableCell >Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.data.map((park) => (
            <TableRow key={park.parkingId}>
              <TableCell>{park.parkingId}</TableCell>
              <TableCell>{park.parkname}</TableCell>
              <TableCell>{park.totalPlaces}</TableCell>
              <TableCell>{park.emptyPlaces}</TableCell>
              <TableCell>{park.price}</TableCell>
              <TableCell>{park.long}</TableCell>
              <TableCell>{park.latit}</TableCell>
              <TableCell onClick={()=>deletePark(park)}><DeleteForeverIcon/></TableCell>
              <TableCell></TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more parkings
        </Link>
      </div>
    </React.Fragment>
  );
}