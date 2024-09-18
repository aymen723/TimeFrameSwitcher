import {create} from 'zustand';
import moment from 'moment';
// const currentDate = new Date();
const useStore = create(set => ({
  selectedDay: moment(new Date()).format('DD/MM/YYYY'),
  setSelectedDay: day => set({selectedDay: day}),
}));

export default useStore;

export const getFormattedWeekRange = date => {
  // Parse the input date (in format "DD/MM/YYYY")
  const parsedDate = moment(date, 'DD/MM/YYYY').toDate();
  const day = parsedDate.getDay();

  // Get start and end of the week
  const startOfWeek = new Date(parsedDate);
  const endOfWeek = new Date(parsedDate);

  startOfWeek.setDate(startOfWeek.getDate() - day); // Set to Sunday (start of the week)
  endOfWeek.setDate(endOfWeek.getDate() - day + 6); // Set to Saturday (end of the week)

  return {
    startOfWeek: moment(startOfWeek).format('DD/MM/YYYY'),
    endOfWeek: moment(endOfWeek).format('DD/MM/YYYY'),
  };
};
