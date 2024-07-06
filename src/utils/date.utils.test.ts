import { convertDate } from "./date.utils";

describe('convertDate', () => {
  it('should convert a valid date string to ISO string', () => {
    const date = '2022-01-01';
    const result = convertDate(date);
    expect(result).toBe('2022-01-01T00:00:00.000Z');
  });

  it('should convert a date string in the format "dd/mm/yyyy" to ISO string', () => {
    const date = '01/01/2022';
    const result = convertDate(date);
    expect(result).toBe('2022-01-01T00:00:00.000Z');
  });

  it('should convert a date string in the format "dd-mm-yyyy" to ISO string', () => {
    const date = '01-01-2022';
    const result = convertDate(date);
    expect(result).toBe('2022-01-01T00:00:00.000Z');
  } );

  it('should return current date in ISO string if input is invalid', () => {
    const date = 'invalid-date';
    const result = convertDate(date);
    const currentDate = new Date().toISOString();
    expect(result).toBe(currentDate);
  });
});