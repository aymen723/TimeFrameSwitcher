import {Colors} from '../assets/styles';

// src/services/apiService.js
import axiosInstance from './axiosinstance';

//in case of real endpoint use this function to update the dummyData or the reel list of events
export const getEvents = async () => {
  try {
    const response = await axiosInstance.get('url');
    return response;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const dummyData = {
  '2023-09-01': [
    {id: 1, name: 'Événement 1'},
    {id: 2, name: 'Événement 2'},
    {id: 3, name: 'Événement 3'},
  ],
  '2023-09-02': [{id: 3, name: 'Événement 1'}],
  '2023-09-03': [],
  '2024-09-01': [
    {id: 1, name: 'Événement 1'},
    {id: 2, name: 'Événement 2'},
  ],
  '2024-09-02': [{id: 3, name: 'Événement 1'}],
  '2024-09-03': [],
  '2024-09-18': [{id: 4, name: 'Événement 2'}],

  // Add more days and events as needed
};

export const getEventsForDay = date => {
  return dummyData[date] || [];
};

export const getMarkedDates = selectedDay => {
  const markedDates = {};

  // Iterate through the dates in the dummyData
  Object.keys(dummyData).forEach(date => {
    const events = dummyData[date];

    if (events.length > 0) {
      // Create an array of dots for each event
      const dots = events.map((event, index) => ({
        key: `event-${index}`,
        color: Colors.primaryblue70, // You can add more colors if you want different events to have different colors
      }));

      // Assign the dots array to the date in markedDates
      markedDates[date] = {
        dots, // Multiple event dots
        marked: true,
      };
    }
  });

  // Highlight the selected date
  markedDates[selectedDay] = {
    ...markedDates[selectedDay], // Retain other marks on the selected day
    selected: true,
    selectedColor: Colors.primaryblue, // Circle for the selected day
    selectedTextColor: Colors.primarywhite, // Text color for the selected day
  };

  console.log('markedDates', markedDates);
  return markedDates;
};
