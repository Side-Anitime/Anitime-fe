import dayjs from 'dayjs';

export const formatDate = (date?: Date, format?: string): string => {
  if (format) {
    return dayjs(date).format(format);
  }
  return dayjs(date).format('YYYY-MM-DD');
};

export const formatDateString = (date?: string, format?: string): string => {
  if (format) {
    return dayjs(date).format(format);
  }
  return dayjs(date).format('YYYY-MM-DD');
};
