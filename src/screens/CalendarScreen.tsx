import {View, StyleSheet} from 'react-native';
import React from 'react';
import TimeFrameSwitcher from '../components/TimeFrameSwitcher';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function CalendarScreen() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <TimeFrameSwitcher />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});
