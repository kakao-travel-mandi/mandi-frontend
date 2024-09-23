// utils/timeUtils.js
import dayjs from 'dayjs';

export const timeDifference = (date: string) => {
  const now = dayjs();
  const postTime = dayjs(date);

  const diffInMinutes = now.diff(postTime, 'minute');
  const diffInHours = now.diff(postTime, 'hour');
  const diffInDays = now.diff(postTime, 'day');
  const diffInMonths = now.diff(postTime, 'month');
  const diffInYears = now.diff(postTime, 'year');

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else if (diffInDays < 30) {
    return `${diffInDays} days ago`;
  } else if (diffInMonths < 12) {
    if (diffInDays >= 31 && diffInDays < 61) {
      return `a month ago`;
    } else if (diffInDays >= 61 && diffInDays < 91) {
      return `2 months ago`;
    } else {
      return `${diffInMonths} months ago`;
    }
  } else {
    if (diffInDays >= 366 && diffInDays < 731) {
      return `a year ago`;
    } else if (diffInDays >= 731 && diffInDays < 1096) {
      return `2 years ago`;
    } else {
      return `${diffInYears} years ago`;
    }
  }
};
