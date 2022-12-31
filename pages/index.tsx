import { Button, Typography } from '@material-tailwind/react';
import { Layout } from 'components/layouts';
import { useSystem } from 'hooks/useSystem';
import { useTime } from 'hooks/useTime';
import { event } from 'lib/ga';
import { ReactElement, useCallback } from 'react';
import { dateToHHmmss, dateToYYYYMMDD, millToHHmmss } from 'utils/time';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import { grey, lightGreen } from '@mui/material/colors';

export default function Home() {
  const {
    current,
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
  } = useTime();
  const { isClient } = useSystem(startTime);

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
    setStartTime(current);
    event({ action: 'click', category: 'timestamp', label: '勤務開始', value: 0 });
  };

  const handleEndClick = useCallback(() => {
    setEndTime(current);
    event({ action: 'click', category: 'timestamp', label: '勤務終了', value: 0 });
  }, [current]);

  return (
    <div className='mt-20'>
      <Typography className='mb-8 text-3xl'>{dateToYYYYMMDD(current)}</Typography>
      {/* suppressHydrationWarning={true} は推奨されないらしい */}
      <Typography className='mb-8 text-3xl text-6xl' variant='h1'>
        {isClient ? dateToHHmmss(current) : ''}
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

      <div className='pt-8 pb-4 md:flex md:justify-center md:pb-10'>
        <div className='py-2 px-8 md:w-60 md:py-0'>
          <Typography className='block' variant='h4'>
            出勤時刻
          </Typography>
          {isEditingStartTime && startTime !== null ? (
            <div className='flex justify-center'>
              {/* <Input
                className='min-w-fit'
                variant='standard'
                value={changedStartTime}
                onChange={handleStartTimeChange}
              /> */}
              <TextField
                variant='standard'
                placeholder='01:50:20'
                value={changedStartTime}
                onChange={handleStartTimeChange}
                inputProps={{ style: { fontSize: 20, width: 100 } }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton size='small' onClick={handleDoneStartTImeClick}>
                        <CheckIcon sx={{ color: lightGreen[700] }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          ) : (
            <div className='flex justify-center'>
              <Typography className='block' variant='h4'>
                {startTime !== null ? `${dateToHHmmss(startTime)}` : ''}
              </Typography>
              {startTime !== null && (
                <IconButton size='small' onClick={handleEditStartTimeClick}>
                  <EditIcon sx={{ color: grey[500] }} />
                </IconButton>
              )}
            </div>
          )}
        </div>
        <div className='py-2 px-8 md:w-60 md:py-0'>
          <Typography className='block' variant='h4'>
            退勤時刻
          </Typography>
          {isEditingEndTime && endTime !== null ? (
            <div className='flex justify-center'>
              <TextField
                variant='standard'
                placeholder='01:50:20'
                value={changedEndTime}
                onChange={handleEndTimeChange}
                inputProps={{ style: { fontSize: 20, width: 100 } }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton size='small' onClick={handleDoneEndTImeClick}>
                        <CheckIcon sx={{ color: lightGreen[700] }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          ) : (
            <div className='flex justify-center'>
              <Typography className='block' variant='h4'>
                {endTime !== null ? `${dateToHHmmss(endTime)}` : ''}
              </Typography>
              {endTime !== null && (
                <IconButton size='small' onClick={handleEditEndTimeClick}>
                  <EditIcon sx={{ color: grey[500] }} />
                </IconButton>
              )}
            </div>
          )}
        </div>
        <div className='py-2 px-8 md:w-60 md:py-0'>
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
          合計休憩時間: {millToHHmmss(durationSum)}
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

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
