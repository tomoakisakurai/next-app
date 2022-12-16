import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTime } from 'hooks/useTime';

describe('useTime', () => {
  //   it.todo('useTime');
  it('time', () => {
    const { result } = renderHook(() => useTime());

    const mockDate = new Date(2000, 1, 1, 12, 50);

    act(() => {
      result.current.setStartTime(mockDate);
    });

    expect(result.current.startTime).toBe(mockDate);
  });
});
