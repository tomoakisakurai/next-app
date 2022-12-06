import { Button, Typography } from '@material-tailwind/react';
import { Layout } from 'components/layouts';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { getDate24Hour, getTimeDMS } from 'utils/time';

type RestTime = {
  start: Date | null;
  end: Date | null;
  duration: number;
};

export default function Timestamp() {
  const [time, setTime] = useState(new Date());
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [restTimes, setRestTimes] = useState<RestTime[]>([]);

  const handleBeginClick = () => {
    if (endTime !== null) {
      // 休憩開始
      const current = new Date();
      const duration = current.getTime() - endTime.getTime();
      console.log(duration);
      setRestTimes([...restTimes, { start: endTime, end: current, duration: duration / 1000 }]);
      setEndTime(null);
      return;
    }

    setStartTime(time);
  };

  const handleEndClick = () => {
    setEndTime(time);
  };

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
    if (startTime === null || endTime === null) return 0;
    return Math.round((endTime.getTime() - startTime.getTime()) / 1000);
  }, [endTime]);

  return (
    <div className='mt-20'>
      <Typography className='mb-8 text-3xl'>{time.toLocaleDateString()}</Typography>
      <Typography className='mb-8 text-3xl text-6xl' variant='h1'>
        {getDate24Hour(time)}
      </Typography>
      <Button className='mr-3' variant='filled' size='lg' onClick={handleBeginClick}>
        出勤
      </Button>
      <Button variant='outlined' size='lg' color='gray' onClick={handleEndClick}>
        退勤
      </Button>

      <div className='pt-8 pb-20'>
        <Typography className='block' variant='h4'>
          出勤時刻: {startTime !== null ? `${getDate24Hour(startTime)}` : ''}
        </Typography>
        <Typography className='block' variant='h4'>
          退勤時刻: {endTime !== null ? `${getDate24Hour(endTime)}` : ''}
        </Typography>
        <Typography className='block pt-4 pb-4' variant='h4'>
          勤務時間: {getTimeDMS(workingTimeSum)}
        </Typography>
        {restTimes.length > 0 && (
          <Typography className='block' variant='paragraph'>
            合計休憩時間: {getTimeDMS(durationSum)}
          </Typography>
        )}
      </div>

      {/* {restTimes.map((time) => {
        return (
          <div className='pb-4'>
            <Typography variant='paragraph'>
              休憩開始: {time.start?.toLocaleTimeString()}
            </Typography>
            <Typography variant='paragraph'>休憩終了: {time.end?.toLocaleTimeString()}</Typography>
            <Typography variant='paragraph'>休憩時間: {Math.round(time.duration)}秒</Typography>
          </div>
        );
      })} */}
    </div>
  );
}

Timestamp.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
