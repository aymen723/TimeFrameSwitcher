import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DateData, ExpandableCalendar} from 'react-native-calendars';
import useStore, {getFormattedWeekRange} from '../hooks/time';
import {Colors, GlobalStyle} from '../assets/styles';
import moment from 'moment';
import {Positions} from 'react-native-calendars/src/expandableCalendar';
import {dummyData, getMarkedDates} from '../api/events';

export default function WeekView() {
  const {selectedDay, setSelectedDay} = useStore();
  const [markedDates, setMarkedDates] = useState({});
  // Use the selectedDay for formatting the week range
  const {startOfWeek, endOfWeek} = getFormattedWeekRange(selectedDay);

  // // Handle day press and store in YYYY-MM-DD format for ExpandableCalendar
  const onDayPress = (day: DateData) => {
    setSelectedDay(moment(day.dateString).format('DD/MM/YYYY')); // Use YYYY-MM-DD format
  };

  const renderCustomHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={GlobalStyle.headerText}>{startOfWeek}</Text>
        <Text style={GlobalStyle.headerText}>-</Text>
        <Text style={GlobalStyle.headerText}>{endOfWeek}</Text>
      </View>
    );
  };

  const getCurrent = () => {
    // Ensure selectedDay is in 'DD/MM/YYYY' format
    const date = moment(selectedDay, 'DD/MM/YYYY').toDate(); // Parses correctly using moment

    return moment(date).format('YYYY-MM-DD'); // Returns the date in 'YYYY-MM-DD' format
  };

  useEffect(() => {
    // Generate marked dates based on dummyData
    const newMarkedDates = getMarkedDates(selectedDay);
    setMarkedDates(newMarkedDates);
  }, [selectedDay]);

  return (
    <View style={{height: 120, width: '100%'}}>
      <ExpandableCalendar
        current={getCurrent()} // Should be in YYYY-MM-DD format
        onDayPress={onDayPress}
        allowShadow={false}
        disableWeekScroll={false}
        disablePan={true}
        hideKnob={true}
        renderHeader={renderCustomHeader}
        theme={{
          selectedDayBackgroundColor: Colors.primaryblue, // Circle color for selected date
          selectedDayTextColor: Colors.white, // Text color inside the selected date circle
          todayTextColor: Colors.primaryblue, // Text color for today's date
          dayTextColor: Colors.primaryblack, // Text color for regular days
          textDisabledColor: Colors.diabletext, // Color for disabled dates (optional)
          arrowColor: Colors.primaryblack, // Color for the arrows to navigate months
          textDayFontWeight: '400',
          textDayHeaderFontFamily: 'Montserrat',
          textDayStyle: {
            color: Colors.primaryblack,
          },
        }}
        initialPosition={Positions.CLOSED}
        leftArrowImageSource={require('../assets/icons/arrowleft.png')}
        rightArrowImageSource={require('../assets/icons/arrowright.png')}
        markedDates={markedDates}
        markingType={'multi-dot'} // Use multi-dot for event indicators
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
});
