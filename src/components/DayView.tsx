import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import useStore from '../hooks/time';
import moment from 'moment';
import 'moment/locale/fr'; // Import French locale for the day names
import {GlobalStyle} from '../assets/styles';

moment.locale('fr');

export default function DayView() {
  const {selectedDay, setSelectedDay} = useStore();

  // Function to handle previous day
  const goToPreviousDay = () => {
    const previousDay = moment(selectedDay, 'DD/MM/YYYY').subtract(1, 'days');
    setSelectedDay(previousDay.format('DD/MM/YYYY'));
  };

  // Function to handle next day
  const goToNextDay = () => {
    const nextDay = moment(selectedDay, 'DD/MM/YYYY').add(1, 'days');
    setSelectedDay(nextDay.format('DD/MM/YYYY'));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* Previous Day Button */}
        <TouchableOpacity onPress={goToPreviousDay}>
          <Image
            style={{height: 20, width: 20}}
            source={require('../assets/icons/arrowleft.png')}
          />
        </TouchableOpacity>

        {/* Current Day Display */}
        <View>
          <Text style={GlobalStyle.headerText}>{selectedDay}</Text>
        </View>

        {/* Next Day Button */}
        <TouchableOpacity onPress={goToNextDay}>
          <Image
            style={{height: 20, width: 20}}
            source={require('../assets/icons/arrowright.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    width: '90%',
    height: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
