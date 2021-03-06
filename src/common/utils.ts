import moment from 'moment';

export const isDateToday = date => {
  const otherDate = new Date(date);
  const todayDate = new Date();

  if (
    otherDate.getDate() === todayDate.getDate() &&
    otherDate.getMonth() === todayDate.getMonth() &&
    otherDate.getFullYear() === todayDate.getFullYear()
  ) {
    return true;
  } else {
    return false;
  }
};

export const eventTypes = ['Event', 'Task', 'Out of office'];

export const parseTimeMoment = time => {
  return moment(time).format('h:mm A');
};

export const parseDateMoment = date => {
  return moment(date).format('MMMM Do YYYY');
};
