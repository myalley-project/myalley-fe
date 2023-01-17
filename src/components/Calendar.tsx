import React, { useEffect, useId, useMemo, useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  getYear,
  getMonth,
} from "date-fns";
import styled from "styled-components";
import { theme } from "../styles/theme";
import ArrowPrev from "../assets/icons/arrowPrev.svg";
import ArrowNext from "../assets/icons/arrowNext.svg";

const Calender = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<string>("");

  const calendarDays = useMemo(
    () => getCalendarDays(currentMonth),
    [currentMonth]
  );

  useEffect(() => {
    setSelectedDate("");
  }, [currentMonth]);

  const prevMonth = () => {
    const prevDate = subMonths(currentMonth, 1);
    setCurrentMonth(prevDate);
  };
  const nextMonth = () => {
    const nextDate = addMonths(currentMonth, 1);
    setCurrentMonth(nextDate);
  };

  const onDateSelect = (e: React.SyntheticEvent<HTMLDivElement>) => {
    if (!(e.target instanceof HTMLDivElement)) return;

    if (e.target.dataset.valid === "true") {
      const day = e.target.dataset.value as string;
      const selectedDay = new Date(
        getYear(currentMonth),
        getMonth(currentMonth),
        parseInt(day, 10)
      );

      const result = new Intl.DateTimeFormat("kr")
        .format(selectedDay)
        .replaceAll(". ", "-")
        .slice(0, -1);

      setSelectedDate(() => result);
    }
  };

  return (
    <Container>
      <Title>관람일</Title>
      <CalendarWrapper>
        <Header>
          <div>
            <button type="button" onClick={prevMonth}>
              <img src={ArrowPrev} alt="이전 화살표" />
            </button>
          </div>
          <div>
            {format(currentMonth, "M")}월 {format(currentMonth, "yyyy")}
          </div>
          <div>
            <button type="button" onClick={nextMonth}>
              <img src={ArrowNext} alt="다음 화살표" />
            </button>
          </div>
        </Header>
        <Divider />
        <DayOfWeek>
          <div>일</div>
          <div>월</div>
          <div>화</div>
          <div>수</div>
          <div>목</div>
          <div>금</div>
          <div>토</div>
        </DayOfWeek>
        <Week
          onClick={onDateSelect}
          onKeyDown={onDateSelect}
          role="presentation"
        >
          {calendarDays.map((each) => (
            <Day key={each.id} data-valid={each.isValid} data-value={each.day}>
              {each.day}
            </Day>
          ))}
        </Week>
      </CalendarWrapper>
    </Container>
  );
};

export default Calender;

function getCalendarDays(currentMonth: Date) {
  const monthStartDate = startOfMonth(currentMonth);
  const monthEndDate = endOfMonth(monthStartDate);

  const calendarStartDate = startOfWeek(monthStartDate);
  const calendarEndDate = endOfWeek(monthEndDate);

  const prevMonthDays = getPrevDays();
  const currentMonthDays = getCurrentDays();
  const nextMonthDays = getNextDays();

  const calendarDays = prevMonthDays.concat(
    currentMonthDays.concat(nextMonthDays)
  );

  return calendarDays;

  function getPrevDays() {
    const prevLastDay = format(endOfMonth(subMonths(currentMonth, 1)), "d");
    const monthFirstDay = format(calendarStartDate, "d");
    if (format(monthStartDate, "d") === format(calendarStartDate, "d"))
      return [];
    const prevDays = Array.from(
      {
        length: parseInt(prevLastDay, 10) - parseInt(monthFirstDay, 10) + 1,
      },
      (undef, daynumber) => ({
        id: crypto.randomUUID(),
        day: parseInt(monthFirstDay, 10) + daynumber + 1,
        isValid: false,
      })
    );
    return prevDays;
  }

  function getCurrentDays() {
    const MonthLastDay = format(monthEndDate, "d");
    const currentDays = Array.from(
      {
        length: parseInt(MonthLastDay, 10),
      },
      (undef, dayNumber) => ({
        id: crypto.randomUUID(),
        day: dayNumber + 1,
        isValid: true,
      })
    );
    return currentDays;
  }

  function getNextDays() {
    const calendarEndDay = format(calendarEndDate, "d");
    if (format(monthEndDate, "d") === format(calendarEndDate, "d")) return [];
    const nextDays = Array.from(
      {
        length: parseInt(calendarEndDay, 10),
      },
      (undef, daynumber) => ({
        id: crypto.randomUUID(),
        day: daynumber + 1,
        isValid: false,
      })
    );
    return nextDays;
  }
}

const Container = styled.div`
  position: relative;
  width: 318px;
  border-radius: 0;
  color: ${theme.colors.hover};
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 10px;
  color: #333;
`;

const CalendarWrapper = styled.div`
  height: fit-content;
  border: 1px solid ${theme.colors.main};
  padding: 30px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Divider = styled.div`
  border-bottom: 1px solid ${theme.colors.main};
  margin: 14px 0;
`;

const DayOfWeek = styled.div`
  & > * {
    display: inline-block;
    width: calc(100% / 7);
    text-align: center;
    color: ${theme.colors.main};
  }
  margin-bottom: 15px;
`;

const Week = styled.div`
  display: flexbox;
  flex-wrap: wrap;
  position: relative;
  /* &::after {
    content: "";
    display: block;
    padding: 0.1rem;
  } */
`;

const Day = styled.div`
  width: calc(100% / 7);
  aspect-ratio: 1 / 1;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 5px;
  margin-bottom: 1rem;
  text-align: center;
  &:is(:hover, :focus) {
    background-color: #6750a4;
    border-radius: 100vmax;
  }
  &:nth-child(7n + 1) {
    color: red;
  }
  &[data-valid="false"] {
    opacity: 0.65;
  }
`;
