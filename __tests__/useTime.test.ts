import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTime } from 'hooks/useTime';

describe('useTime', () => {
  beforeEach(() => {
    // tell vitest we use mocked time
    vi.useFakeTimers();
  });

  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers();
  });

  it('handleBeginClick', () => {
    const { result } = renderHook(() => useTime());

    const date = new Date(2000, 1, 1, 13);
    vi.setSystemTime(date);

    act(() => {
      result.current.handleBeginClick();
    });

    expect(result.current.endTime).toBe(null);
    // expect(result.current.startTime).toEqual(vi.getMockedSystemTime());
  });
});
