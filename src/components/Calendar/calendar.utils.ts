import { getDaysInMonth, getDay } from "date-fns";

export const generateMonthDaysList = (_date?: string) => {
  const date = new Date(_date || new Date());
  const month = date.getMonth();
  const year = date.getFullYear();
  const days: Array<
    ({ day: number; num: number; month: number; year: number } | null)[]
  > = [[]];
  const daysInMonth = getDaysInMonth(new Date(year, month));
  const allDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  let week = 0;

  for (const day of allDays) {
    const date = new Date(year, month, day);
    const weekday = getDay(date);
    if (weekday === 1) {
      week++;
      days.push([{ day: weekday, num: day, month, year }]);
    } else {
      days[week].push({ day: weekday, num: day, month, year });
    }
  }

  while (days.length >= 0 && days[0].length < 7) {
    days[0].unshift(null);
  }
  while (days[days.length - 1].length < 7) {
    days[days.length - 1].push(null);
  }

  return { days: days.filter((d) => !d.every((a) => !a)) };
};
