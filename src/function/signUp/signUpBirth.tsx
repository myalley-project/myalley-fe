/* eslint-disable no-plusplus */

export const yearArr = () => {
  const years: number[] = [];
  for (let i = 1950; i < new Date().getFullYear() + 1; i++) {
    years.push(i);
  }
  return years;
};

export const monthArr = () => {
  const months: number[] = [];
  for (let i = 1; i < 12 + 1; i++) {
    months.push(i);
  }
  return months;
};

export const dayArr = () => {
  const days: number[] = [];
  for (let i = 1; i < 12 + 1; i++) {
    days.push(i);
  }
  return days;
};

export default { yearArr, monthArr, dayArr };
