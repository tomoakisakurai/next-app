import { useEffect, useMemo, useState } from 'react';
import { diffHHmmss } from 'utils/time';

type RestTime = {
  start: Date | null;
  end: Date | null;
  duration: number;
};

export default function useTime() {
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
  };
}
