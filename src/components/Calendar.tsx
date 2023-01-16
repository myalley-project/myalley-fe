import React, { useEffect, useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import styled from "styled-components";
import { theme } from "../styles/theme";
import ArrowPrev from "../assets/icons/arrowPrev.svg";
import ArrowNext from "../assets/icons/arrowNext.svg";

const Calender = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState([]);

  const calendarDays = getCalendarDays({ currentMonth });

  useEffect(() => {
    setSelectedDate([]);
  }, [currentMonth]);

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const onDateClick = () => {};

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
        {/* <div onClick={onDateClick} onKeyDown={onDateClick}>
          {calendarDays.map((each) => (
            <div key={}>{each.day}</div>
          ))}
        </div> */}
      </CalendarWrapper>
    </Container>
  );
};

export default Calender;

type DateProps = {
  currentMonth: Date;
};

function getCalendarDays({ currentMonth }: DateProps) {
  const monthStartDate = startOfMonth(currentMonth);
  const monthEndDate = endOfMonth(monthStartDate);

  const calendarStartDate = startOfWeek(monthStartDate);
  const calendarEndDate = endOfWeek(monthEndDate);

  const prevMonthDays = getPrevDays();
  const currentMonthDays = getCurrentDays(prevMonthDays.length);
  const nextMonthDays = getNextDays(currentMonthDays.length);

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
        day: parseInt(monthFirstDay, 10) + daynumber + 1,
        isValid: false,
      })
    );
    return prevDays;
  }

  function getCurrentDays(prevLength: number) {
    const MonthLastDay = format(monthEndDate, "d");
    const currentDays = Array.from(
      {
        length: parseInt(MonthLastDay, 10),
      },
      (undef, dayNumber) => ({
        day: dayNumber + 1,
        isValid: true,
      })
    );
    return currentDays;
  }

  function getNextDays(currentLength: number) {
    const calendarEndDay = format(calendarEndDate, "d");
    const nextDays = Array.from(
      {
        length: parseInt(calendarEndDay, 10),
      },
      (undef, daynumber) => ({
        day: daynumber + 1,
        isValid: false,
      })
    );
    return nextDays;
  }
}

const Container = styled.div`
  width: 318px;
  height: 356px;
  border-radius: 0;
  color: ${theme.colors.hover};
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 10px;
  text-align: center;
`;

const CalendarWrapper = styled.div`
  height: 326px;
  border: 1px solid ${theme.colors.hover};
  padding: 30px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Divider = styled.div`
  border-bottom: 1px solid ${theme.colors.main};
  margin: 15px 0;
`;

const DayOfWeek = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;
