import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';
import { useTime } from 'hooks/useTime';

describe('useTime', () => {
  it('time', () => {
    const { result } = renderHook(() => useTime());

    expect(result.current.startTime).toBe(null);
  });
});
