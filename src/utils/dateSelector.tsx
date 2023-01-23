export const getYearArray = () => {
  const currentYear = new Date().getFullYear();
  const startYear = 1950;
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (undef, indexNumber) => String(startYear + indexNumber)
  );
  return years;
};

export const getMonthArray = () => {
  const months = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  return months;
};

export const getDayArray = () => {
  const currentDays = Array.from({ length: 31 }, (undef, indexNumber) =>
    String(indexNumber + 1)
  );
  return currentDays;
};
