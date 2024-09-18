import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import useStore from '../hooks/time';
import {Colors, GlobalStyle} from '../assets/styles';
import moment from 'moment';
import {getEventsForDay} from '../api/events';

export default function EventList() {
  const {selectedDay, setSelectedDay} = useStore();
  const [events, setEvents] = useState([]);
  const getDate = () => {
    // Ensure selectedDay is in 'DD/MM/YYYY' format
    const date = moment(selectedDay, 'DD/MM/YYYY').toDate(); // Parses correctly using moment

    return moment(date).format('YYYY-MM-DD'); // Returns the date in 'YYYY-MM-DD' format
  };
  // Render individual event
  const renderEvent = ({item}: any) => (
    <TouchableOpacity activeOpacity={0.8} style={styles.eventItem}>
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={styles.eventText}>{selectedDay}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    const dayEvents = getEventsForDay(getDate());
    setEvents(dayEvents);
  }, [selectedDay]);
  return (
    <View style={styles.container}>
      {events && events.length > 0 ? (
        <FlatList
          data={events}
          ListHeaderComponent={() => {
            return (
              <View style={styles.headerContainer}>
                <View style={styles.header}>
                  <View>
                    <Text style={GlobalStyle.headerText}>
                      {selectedDay === moment().format('DD/MM/YYYY')
                        ? "Aujourd'hui"
                        : selectedDay}
                    </Text>
                  </View>
                  <View>
                    <Text>{events.length} Événements</Text>
                  </View>
                </View>
              </View>
            );
          }}
          keyExtractor={item => item.id}
          renderItem={renderEvent}
          contentContainerStyle={{
            alignItems: 'center',
          }}
        />
      ) : (
        <View style={styles.noEventsContainer}>
          <View style={{width: '75%'}}>
            <Text style={styles.noEventsText}>
              Vous n’avez pas d’événement prévue pour ce jour.
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Make sure the container takes up full height
  },
  eventItem: {
    backgroundColor: Colors.white,
    width: 327,
    borderWidth: 0.5,
    borderColor: Colors.darkgray,
    marginTop: 10,
    marginBottom: 10,
    height: 85,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  eventText: {
    color: Colors.primaryblack,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 17,
    fontFamily: 'Montserrat',
  },
  noEventsText: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Montserrat',
    lineHeight: 20,

    color: Colors.primaryblack,
    textAlign: 'center',
  },
  headerContainer: {
    height: 40,

    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: '100%',
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemTitle: {
    color: Colors.primaryblue,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 17,
    fontFamily: 'Montserrat',
    paddingBottom: 15,
  },
  noEventsContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
