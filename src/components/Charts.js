import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import _ from "lodash";
import Box from '@mui/material/Box';
import First from './images/first.png';
import Second from './images/second.png';
import Third from './images/third.png';
import Grid from '@mui/material/Grid';

export default function Charts() {

  const [trainings, setTrainings] = useState([]);

  useEffect(() => fetchData(), []); 

  const fetchData = () => { 
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data))
  } 

  const sumDurations = _(trainings)
  .groupBy('activity')
  .map((trainings, activity) => ({
    activity: activity,
    duration: _.sumBy(trainings, 'duration')
  }))
  .value()

  const perPerson = _(trainings)
    .groupBy('customer.firstname')
    .map((trainings, name) => ({
      firstname: name,
      lastname: trainings[0].customer.lastname,
      duration: _.sumBy(trainings, 'duration')
    }))
    .value()
    perPerson.sort((a, b) => b.duration - a.duration);

  return (
    <Grid container justifyContent="center">
      <Grid item lg={8}>
        <Box sx={{ marginY: 5, marginLeft: 5, p: 5, bgcolor: 'background.default', borderRadius: 5 }}>
          <h2>Durations per activity</h2>
          <ResponsiveContainer width="95%" height={500}>
            <BarChart width={800} height={450} data={sumDurations} 
              style={{ margin: '50px auto', color: 'grey'}}>
              <XAxis dataKey="activity" />
              <YAxis label={{ value: 'Duration (min)', angle: -90, position: 'insideLeft' }}/>
              <Bar dataKey='duration' fill="#8884d8"/>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Grid>
      <Grid item lg={4}>
      <Box sx={{ marginY: 5, marginX: 'auto', p: 5, bgcolor: 'background.default', borderRadius: 5, width: '80%'}}>
        <h2>TOP 3</h2>
        <p>Most time trained</p>
        {
        perPerson.map((value, index) => (
          <div className="leaders" key={index}>
          {(() => {
            if (index === 0) {
              return (
                <div className="item">
                  <img src={First} style={{width: 60}} alt="first icon" />
                  <h3>{value.firstname} {value.lastname}</h3>
                  <span>{value.duration}</span>
                </div>
              )
            } else if (index === 1) {
              return (
                <div className="item">
                  <img src={Second} style={{width: 60}} alt="second icon"/>
                  <h3>{value.firstname} {value.lastname}</h3>
                  <span>{value.duration}</span>
                </div>
              )
            } else if (index === 2) {
              return (
                <div className="item">
                  <img src={Third} style={{width: 60}} alt="third icon"/>
                  <h3>{value.firstname} {value.lastname}</h3>
                  <span>{value.duration}</span>
                </div>
              )
            }
          })()}    
          </div>                
        ))}
      </Box>
      </Grid>
    </Grid>
  );
}