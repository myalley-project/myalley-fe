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
import arrowLeft from "../assets/icons/arrowLeft.svg";
import arrowRight from "../assets/icons/arrowRight.svg";

interface CalendarProps {
  handleSelectedDate: (date: string) => void;
}

const Calender = ({ handleSelectedDate }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedNumber, setSelectedNumber] = useState(new Date().getDate());

  const calendarDays = useMemo(
    () => getCalendarDays(currentMonth),
    [currentMonth]
  );

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
      const numberDay = parseInt(day, 10);
      setSelectedNumber(numberDay);

      const selectedDay = new Date(
        getYear(currentMonth),
        getMonth(currentMonth),
        parseInt(day, 10)
      );

      const result = format(selectedDay, "yyyy-MM-dd");

      handleSelectedDate(result);
    }
  };

  return (
    <CalendarWrapper>
      <Header>
        <div>
          <button type="button" onClick={prevMonth}>
            <img src={arrowLeft} alt="이전 화살표" />
          </button>
        </div>
        <div>
          {format(currentMonth, "M")}월 {format(currentMonth, "yyyy")}
        </div>
        <div>
          <button type="button" onClick={nextMonth}>
            <img src={arrowRight} alt="다음 화살표" />
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
      <Week onClick={onDateSelect} onKeyDown={onDateSelect} role="presentation">
        {calendarDays.map((each) => (
          <Day
            key={each.id}
            className={each.day === selectedNumber ? "selected" : ""}
            data-valid={each.isValid}
            data-value={each.day}
          >
            {each.day}
          </Day>
        ))}
      </Week>
    </CalendarWrapper>
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

const CalendarWrapper = styled.div`
  width: 318px;
  height: fit-content;
  border: 1px solid ${theme.colors.greys40};
  padding: 30px 30px 14px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Divider = styled.div`
  border-bottom: 1px solid ${theme.colors.greys40};
  margin: 14px 0;
`;

const DayOfWeek = styled.div`
  & > * {
    display: inline-block;
    width: calc(100% / 7);
    text-align: center;
    color: ${theme.colors.greys40};
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
  margin-bottom: 1rem;
  line-height: calc(100% / 7);
  &:is(:hover, :focus, :focus-within) {
    background-color: ${theme.colors.primry70};
    border-radius: 100vmax;
    color: ${theme.colors.white100};
    cursor: pointer;
  }
  &:nth-child(7n + 1) {
    color: red;
  }
  &[data-valid="false"] {
    opacity: 0.65;
  }
  &.selected {
    background-color: ${theme.colors.primry70};
    color: ${theme.colors.white100};
  }
`;
