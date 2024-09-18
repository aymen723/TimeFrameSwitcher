import {Image, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Calendar} from 'react-native-calendars';
import useStore from '../hooks/time';
import {Colors} from '../assets/styles';
import moment from 'moment';
import {DateData, Direction} from 'react-native-calendars/src/types';
import {getMarkedDates} from '../api/events';
// import {getMarkedDates} from '../api/events';

export default function MonthView() {
  const {selectedDay, setSelectedDay} = useStore();
  const [markedDates, setMarkedDates] = useState({});
  useEffect(() => {
    // Generate marked dates based on dummyData
    const date = moment(selectedDay, 'DD/MM/YYYY').toDate(); // Parses correctly using moment

    const transformedDate = moment(date).format('YYYY-MM-DD'); // Returns the date in 'YYYY-MM-DD' format

    const newMarkedDates = getMarkedDates(transformedDate);
    setMarkedDates(newMarkedDates);
  }, [selectedDay]);

  return (
    <View>
      <Calendar
        date={selectedDay}
        onDayPress={(date: DateData) => {
          setSelectedDay(moment(date.dateString).format('DD/MM/YYYY'));
        }}
        markedDates={markedDates} // Apply markedDates here
        markingType={'multi-dot'} // This allows multiple dots on a day
        theme={{
          selectedDayBackgroundColor: Colors.primaryblue, // Circle color for selected date
          selectedDayTextColor: Colors.primarywhite, // Text color inside the selected date circle
          todayTextColor: Colors.primaryblue, // Color for today's date
          dayTextColor: Colors.primaryblack, // Color for regular days
          textDisabledColor: Colors.diabletext, // Disabled dates color
          arrowColor: Colors.primaryblack, // Arrow color
          monthTextColor: Colors.primaryblack, // Month label text color
          textDayFontWeight: '400', // Day text font weight
          selectedDotColor: Colors.primaryblue,
        }}
        renderArrow={(direction: Direction) => {
          if (direction == 'left') {
            return (
              <Image
                style={{height: 20, width: 20}}
                source={require('../assets/icons/arrowleft.png')}
              />
            );
          }
          if (direction == 'right') {
            return (
              <Image
                style={{height: 20, width: 20}}
                source={require('../assets/icons/arrowright.png')}
              />
            );
          }
        }}
      />
    </View>
  );
}
