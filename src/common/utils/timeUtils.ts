import dayjs from 'dayjs';

export const formatDateToString = (date?: Date, format?: string): string => {
  if (format) {
    return dayjs(date).format(format);
  }
  return dayjs(date).format('YYYY-MM-DD');
};

export const formatStringToString = (
  date?: string,
  format?: string,
): string => {
  if (format) {
    return dayjs(date).format(format);
  }
  return dayjs(date).format('YYYY-MM-DD');
};

export const formatStringToDate = (date?: string) => {
  return dayjs(date);
};

export const getToday = (format?: string) => {
  if (!format) {
    return dayjs().format('YYYY-MM-DD');
  }
  return dayjs().format(format);
};
