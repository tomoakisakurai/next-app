import { Button, Typography } from '@material-tailwind/react';
import { Layout } from 'components/layouts';
import { ReactElement, useEffect, useState } from 'react';

type RestTime = {
  start: Date | null;
  end: Date | null;
};

export default function Timestamp() {
  const [time, setTime] = useState(new Date());
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [restTimes, setRestTimes] = useState<RestTime[]>([]);

  const handleBeginClick = () => {
    if (endTime !== null) {
      // 休憩開始
      setRestTimes([...restTimes, { start: endTime, end: new Date() }]);
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

  return (
    <div className='mt-20'>
      <h1 className='mb-8 text-3xl font-bold'>{time.toDateString()}</h1>
      <h1 className='mb-8 text-3xl'>{time.toLocaleTimeString()}</h1>
      <Button className='mr-3' variant='filled' size='lg' onClick={handleBeginClick}>
        出勤
      </Button>
      <Button variant='outlined' size='lg' color='gray' onClick={handleEndClick}>
        退勤
      </Button>

      <div className='flex'>
        {startTime !== null && (
          <Typography variant='h4'>{startTime.toLocaleTimeString()}</Typography>
        )}
        {endTime !== null && <Typography variant='h4'>{endTime.toLocaleTimeString()}</Typography>}
      </div>

      {restTimes.map((time) => {
        return (
          <div>
            <Typography variant='h4'>休憩開始: {time.start?.toLocaleTimeString()}</Typography>
            <Typography variant='h4'>休憩終了: {time.end?.toLocaleTimeString()}</Typography>
          </div>
        );
      })}
    </div>
  );
}

Timestamp.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
