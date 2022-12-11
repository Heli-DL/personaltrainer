import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Box from '@mui/material/Box';

export default function TrainingCalendar() {
  const localizer = momentLocalizer(moment);

  const [trainings, setTrainings] = useState([]);

  useEffect(() => fetchData(), []); 

  const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => setTrainings(data))
      .catch(err => console.error(err))
  }

  const events = trainings.map((training) =>
    training =
    {
      allDay: false,
      title: training.activity + " / " + training.customer.firstname + " " + training.customer.lastname,
      start: new Date(moment.utc(training.date)),
      end: new Date(moment(training.date).add(training.duration, 'minutes')),
    }
  );
  console.log('events:', events);

  return (
    <Box sx={{ m: 5, p: 5, bgcolor: 'background.default', borderRadius: 5 }}>
      <Calendar
        localizer={localizer}
        events={events}
        allDayAccessor='allDay'
        titleAccessor='title'
        startAccessor='start'
        endAccessor='end'
        views={['month', 'week', 'day', 'agenda']}
        style={{ height: 600 }}
      />
    </Box> 
  )
}