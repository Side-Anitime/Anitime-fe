import moment from 'moment';

export const formatDate = (date: Date, format?: string): string => {
  if (format) {
    return moment(date).format(format);
  }
  return moment(date).format('YYYY-MM-DD');
};

export const formatDateString = (date: string, format?: string): string => {
  if (format) {
    return moment(date).format(format);
  }
  return moment(date).format('YYYY-MM-DD');
};
