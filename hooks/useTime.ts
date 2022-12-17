import { useCallback, useEffect, useMemo, useState } from 'react';
import { diffHHmmss } from 'utils/time';
import { event } from 'lib/ga';

type RestTime = {
  start: Date | null;
  end: Date | null;
  duration: number;
};

export const useTime = () => {
  const [time, setTime] = useState(new Date());
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [restTimes, setRestTimes] = useState<RestTime[]>([]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, [time]);

  const handleBeginClick = () => {
    if (endTime !== null) {
      // 休憩開始
      const current = new Date();
      const duration = current.getTime() - endTime.getTime();
      setRestTimes([...restTimes, { start: endTime, end: current, duration: duration }]);
      setEndTime(null);
      event({ action: 'click', category: 'timestamp', label: '休憩開始', value: 1 });
      return;
    }
    setStartTime(time);
    event({ action: 'click', category: 'timestamp', label: '勤務開始', value: 0 });
  };

  const handleEndClick = useCallback(() => {
    setEndTime(time);
    event({ action: 'click', category: 'timestamp', label: '勤務終了', value: 0 });
  }, [time]);

  const durationSum = useMemo(() => {
    return restTimes.reduce((acc, cur) => {
      return acc + cur.duration;
    }, 0);
  }, [restTimes]);

  const workingTimeSum = useMemo(() => {
    if (startTime === null || endTime === null) return '00:00:00';
    return diffHHmmss(endTime, startTime, durationSum);
    // return Math.round((endTime.getTime() - startTime.getTime()) / 1000);
  }, [endTime]);

  return {
    current: time,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    restTimes,
    setRestTimes,
    durationSum,
    workingTimeSum,
    handleBeginClick,
    handleEndClick,
  };
};
