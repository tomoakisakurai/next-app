import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { dateToHHmmss, dateToYYYYMMDD, diffHHmmss } from 'utils/time';

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

  const [isEditingStartTime, setIsEditingStartTime] = useState(false);
  const [changedStartTime, setChangedStartTime] = useState('');

  const [isEditingEndTime, setIsEditingEndTime] = useState(false);
  const [changedEndTime, setChangedEndTime] = useState('');

  // 開始時間
  const handleEditStartTimeClick = () => {
    setIsEditingStartTime(true);
  };

  const handleStartTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    // TODO: バリデーション
    setChangedStartTime(e.target.value);
  };

  const handleDoneStartTImeClick = () => {
    setIsEditingStartTime(false);
    setStartTime(new Date(`${dateToYYYYMMDD(time)} ${changedStartTime}`));
  };

  // 終了時刻
  const handleEditEndTimeClick = () => {
    setIsEditingEndTime(true);
  };

  const handleEndTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    // TODO: バリデーション
    setChangedEndTime(e.target.value);
  };

  const handleDoneEndTImeClick = () => {
    setIsEditingEndTime(false);
    setEndTime(new Date(`${dateToYYYYMMDD(time)} ${changedEndTime}`));
  };

  useEffect(() => {
    if (startTime === null) return;
    setChangedStartTime(dateToHHmmss(startTime));
  }, [startTime]);

  useEffect(() => {
    if (endTime === null) return;
    setChangedEndTime(dateToHHmmss(endTime));
  }, [endTime]);

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
  }, [startTime, endTime]);

  const isDisabledStartButton = !!(startTime !== null && endTime === null);
  const isDisabledEndButton = !!(startTime === null || (startTime !== null && endTime !== null));

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
    isDisabledStartButton,
    isDisabledEndButton,
    isEditingStartTime,
    changedStartTime,
    handleStartTimeChange,
    handleEditStartTimeClick,
    handleDoneStartTImeClick,
    isEditingEndTime,
    changedEndTime,
    handleEndTimeChange,
    handleEditEndTimeClick,
    handleDoneEndTImeClick,
  };
};
