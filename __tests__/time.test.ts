import {
  dateToHHmm,
  dateToHHmmss,
  dateToYYYYMMDD,
  diffHHmmss,
  millToHHmmss,
} from './../utils/time';
import { describe, expect, it } from 'vitest';

const mockDate = new Date(2000, 1, 1, 12, 50);

describe('util/time', () => {
  it('dateToHHmmss', () => {
    const date = dateToYYYYMMDD(mockDate);

    expect(date).toBe('2000/02/01');
  });

  it('dateToHHmmss', () => {
    const mockDate = new Date(2000, 1, 1, 12, 50);
    const date = dateToHHmmss(mockDate);

    expect(date).toBe('12:50:00');
  });

  it('millToHHmmss', () => {
    const date1 = new Date(2000, 1, 1, 12, 50).getTime();
    const date2 = new Date(2000, 1, 1, 13, 50).getTime();

    const m = millToHHmmss(date2 - date1);
    expect(m).toBe('01:00:00');
  });

  it('dateToHHmm', () => {
    const mockDate = new Date(2000, 1, 1, 12, 50);
    const m = dateToHHmm(mockDate);

    expect(m).toBe('12:50');
  });

  it('dateToHHmm', () => {
    const start = new Date(2000, 1, 1, 12, 50);
    const end = new Date(2000, 1, 1, 14, 50);

    const restStart = new Date(2000, 1, 1, 13, 10).getTime();
    const restEnd = new Date(2000, 1, 1, 13, 30).getTime();
    const restDuration = restEnd - restStart;

    const m = diffHHmmss(end, start, restDuration);

    expect(m).toBe('01:40:00');
  });
});
