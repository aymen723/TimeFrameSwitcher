import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../assets/styles';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSpringTransition,
} from 'react-native-reanimated';

import {CalendarProvider, LocaleConfig} from 'react-native-calendars';
import NavigationButton from './NavigationButton';
import MonthView from './MonthView';
import WeekView from './WeekView';
import useStore from '../hooks/time';
import DayView from './DayView';
import EventList from './EventList';
import moment from 'moment';
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';

export default function TimeFrameSwitcher() {
  const {selectedDay, setSelectedDay} = useStore();
  const [currentView, setCurrentView] = useState<string>('');
  const animation = useSharedValue(0);
  const flingleft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(() => {
      setCurrentView(prev => {
        switch (prev) {
          case 'month':
            return 'week';
          case 'week':
            return 'day';
          case 'day':
            return 'month';
          default:
            return 'month';
        }
      });
    })
    .runOnJS(true);

  const flingright = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd(() => {
      setCurrentView(prev => {
        switch (prev) {
          case 'month':
            return 'day';
          case 'week':
            return 'month';
          case 'day':
            return 'week';
          default:
            return 'month';
        }
      });
    })
    .runOnJS(true);
  const getDate = () => {
    // Ensure selectedDay is in 'DD/MM/YYYY' format
    const date = moment(selectedDay, 'DD/MM/YYYY').toDate(); // Parses correctly using moment

    return moment(date).format('YYYY-MM-DD'); // Returns the date in 'YYYY-MM-DD' format
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: withSpring(animation.value, {damping: 5, stiffness: 80})},
      ],
    };
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'day':
        return (
          <Animated.View style={[animatedStyle]}>
            <DayView />
          </Animated.View>
        );
      case 'week':
        return (
          <Animated.View style={[animatedStyle]}>
            <WeekView />
          </Animated.View>
        );
      case 'month':
        return (
          <Animated.View style={[animatedStyle]}>
            <MonthView />
          </Animated.View>
        );
      default:
        return (
          <Animated.View style={[animatedStyle]}>
            <MonthView />
          </Animated.View>
        );
    }
  };

  const composed = Gesture.Race(flingright, flingleft);

  const handleNavigationChange = (view: string) => {
    setCurrentView(view);
    animation.value = view === 'day' ? -5 : view === 'week' ? 0 : 5;
  };

  return (
    <CalendarProvider
      date={getDate()} // Initialize with today's date
    >
      <GestureDetector gesture={composed}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Planning</Text>
          </View>

          <View style={styles.switcherContainer}>
            <NavigationButton
              setCurrentView={handleNavigationChange}
              currentView={currentView}
            />
          </View>

          <View>{renderView()}</View>
          <EventList />
        </View>
      </GestureDetector>
    </CalendarProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primarywhite,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primaryblue,
    lineHeight: 19,
    fontFamily: 'Montserrat',
  },
  switcherContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
  },
  viewContainer: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
