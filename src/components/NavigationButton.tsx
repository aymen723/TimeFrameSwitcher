import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../assets/styles';

export default function NavigationButton({
  setCurrentView,
  currentView,
}: {
  setCurrentView: (item: string) => void;
  currentView: string;
}) {
  const handleSelection = timeFrame => {
    setCurrentView(timeFrame);
  };

  useEffect(() => {
    setCurrentView(currentView);
  }, [currentView]);

  return (
    <View style={styles.container}>
      {/* Day Button */}
      <TouchableOpacity
        style={[
          styles.Navbutton,
          currentView === 'day' && styles.selectedButton,
        ]}
        onPress={() => handleSelection('day')}>
        <Text
          style={[
            styles.buttonText,
            currentView === 'day' && styles.selectedText,
          ]}>
          Jour
        </Text>
      </TouchableOpacity>

      {/* Week Button */}
      <TouchableOpacity
        style={[
          styles.Navbutton,
          currentView === 'week' && styles.selectedButton,
        ]}
        onPress={() => handleSelection('week')}>
        <Text
          style={[
            styles.buttonText,
            currentView === 'week' && styles.selectedText,
          ]}>
          Semaine
        </Text>
      </TouchableOpacity>

      {/* Month Button */}
      <TouchableOpacity
        style={[
          styles.Navbutton,
          currentView === 'month' && styles.selectedButton,
        ]}
        onPress={() => handleSelection('month')}>
        <Text
          style={[
            styles.buttonText,
            currentView === 'month' && styles.selectedText,
          ]}>
          Mois
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 31,
    backgroundColor: Colors.gray,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 100,
  },
  Navbutton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 66,
    height: '100%',
  },
  buttonText: {
    lineHeight: 15,
    fontSize: 12,
    fontFamily: 'Montserrat',
    fontWeight: '400',
    color: Colors.primaryblack,
  },
  selectedButton: {
    backgroundColor: Colors.primaryblue,
    borderRadius: 100,
  },
  selectedText: {
    color: Colors.primarywhite,
    fontWeight: '700',
  },
});
