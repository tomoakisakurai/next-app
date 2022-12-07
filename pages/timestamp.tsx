import { Button, Typography } from '@material-tailwind/react';
import { Layout } from 'components/layouts';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import {
  getTimeHHmmss,
  getTimeDMS,
  getTimeHHmm,
  getDiffHHmm,
  getMillToTimeHHmmss,
} from 'utils/time';

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
  const router = useRouter();

  const handleBeginClick = () => {
    if (endTime !== null) {
      // 休憩開始
      const current = new Date();
      const duration = current.getTime() - endTime.getTime();
      setRestTimes([...restTimes, { start: endTime, end: current, duration: duration }]);
      setEndTime(null);
      return;
    }

    setStartTime(time);
  };

  const handleEndClick = () => {
    setEndTime(time);
  };

  const message = '編集内容がリセットされます、本当にページ遷移しますか？';

  const pageChangeHandler = () => {
    const answer = window.confirm(message);
    if (!answer) {
      throw 'routeChange aborted.';
    }
  };

  useEffect(() => {
    if (startTime !== null) {
      router.events.on('routeChangeStart', pageChangeHandler);
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
        router.events.off('routeChangeStart', pageChangeHandler);
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [startTime]);

  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = '編集内容がリセットされます、本当にページ遷移しますか？';
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
    if (startTime === null || endTime === null) return '00:00:00';
    return getDiffHHmm(endTime, startTime);
    // return Math.round((endTime.getTime() - startTime.getTime()) / 1000);
  }, [endTime]);

  const isDisabledStartButton = !!(startTime !== null && endTime === null);
  const isDisabledEndButton = !!(startTime === null || (startTime !== null && endTime !== null));

  return (
    <div className='mt-20'>
      <Typography className='mb-8 text-3xl'>{time.toLocaleDateString()}</Typography>
      <Typography className='mb-8 text-3xl text-6xl' variant='h1'>
        {getTimeHHmmss(time)}
      </Typography>
      <Button
        disabled={isDisabledStartButton}
        className='mr-3'
        variant={!isDisabledStartButton ? 'filled' : 'outlined'} //'filled'
        color={!isDisabledStartButton ? 'blue' : 'gray'}
        size='lg'
        onClick={handleBeginClick}
      >
        出勤
      </Button>
      <Button
        disabled={isDisabledEndButton}
        variant={!isDisabledEndButton ? 'filled' : 'outlined'}
        size='lg'
        color={!isDisabledEndButton ? 'blue' : 'gray'}
        onClick={handleEndClick}
      >
        退勤
      </Button>

      <div className='flex justify-center pt-8 pb-10'>
        <div className='px-8'>
          <Typography className='block' variant='h4'>
            出勤時刻
          </Typography>
          <Typography className='block' variant='h4'>
            {startTime !== null ? `${getTimeHHmmss(startTime)}` : ''}
          </Typography>
        </div>
        <div className='px-8'>
          <Typography className='block' variant='h4'>
            退勤時刻
          </Typography>
          <Typography className='block' variant='h4'>
            {endTime !== null ? `${getTimeHHmmss(endTime)}` : ''}
          </Typography>
        </div>
        <div className='px-8'>
          <Typography className='block' variant='h4'>
            勤務時間
          </Typography>
          <Typography className='block' variant='h4'>
            {workingTimeSum}
          </Typography>
        </div>
      </div>
      {restTimes.length > 0 && (
        <Typography className='block' variant='paragraph'>
          合計休憩時間: {getMillToTimeHHmmss(durationSum)}
        </Typography>
      )}

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
