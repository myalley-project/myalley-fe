import { endOfMonth, format } from "date-fns";

interface DayProps {
  year?: number;
  month?: number;
}

export const yearArr = () => {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 73;
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (undef, indexNumber) => startYear + indexNumber
  );
  return years;
};

export const monthArr = () => {
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return months;
};

export const dayArr = ({ year, month }: DayProps) => {
  if (year === undefined || month === undefined) {
    const currentDays = Array.from(
      { length: 31 },
      (undef, indexNumber) => indexNumber + 1
    );
    return currentDays;
  }
  const MonthLastDay = format(endOfMonth(new Date(year, month)), "d");
  const currentDays = Array.from(
    { length: parseInt(MonthLastDay, 10) },
    (undef, dayNumber) => dayNumber + 1
  );
  return currentDays;
};
