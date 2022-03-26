export const parseDate = date => date.toISOString().split('T')[0];
export const parseTime = time =>
  time.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

const padTo2Digits = num => {
  return num.toString().padStart(2, '0');
};

export const formatDate = date => {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('/');
};
