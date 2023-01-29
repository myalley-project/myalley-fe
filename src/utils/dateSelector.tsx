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
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  return months;
};

export const getDayArray = () => {
  const currentDays = Array.from({ length: 31 }, (undef, indexNumber) =>
    String(indexNumber + 1).length < 2
      ? `0${String(indexNumber + 1)}`
      : String(indexNumber + 1)
  );
  return currentDays;
};
