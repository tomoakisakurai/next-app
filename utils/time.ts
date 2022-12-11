export const dateToHHmmss = (date: Date) => {
  const h =
    date.getHours().toString().padStart(2, '0') +
    ':' +
    date.getMinutes().toString().padStart(2, '0') +
    ':' +
    date.getSeconds().toString().padStart(2, '0');
  console.log(h);
  return h;
};

export const millToHHmmss = (duration: number) => {
  /*
    1minute = 60000ms
    1hour = 60minutes = 3600000ms
   */
  const hour = Math.floor(duration / 3600000);
  const minute = Math.floor((duration - 3600000 * hour) / 60000);

  const hh = ('00' + hour).slice(-2);
  const mm = ('00' + minute).slice(-2);
  const ms = ('00000' + (duration % 60000)).slice(-5);

  const time = `${hh}:${mm}:${ms.slice(0, 2)}`;
  //,${ms.slice(2, 5)}`;

  return time;
};

export const getTimeDMS = (time: number) => {
  const timeH = Math.floor((time % (24 * 60 * 60)) / (60 * 60));
  const timeM = Math.floor(((time % (24 * 60 * 60)) % (60 * 60)) / 60);
  const timeS = ((time % (24 * 60 * 60)) % (60 * 60)) % 60;
  const timeDMS = timeH + ':' + timeM + ':' + timeS;
  return timeDMS;
};

export const dateToHHmm = (date: Date) => {
  // h(時),m(分),s(秒)は10以下の数字は先頭に0を付与
  const h = formatTime(date.getHours());
  const m = formatTime(date.getMinutes());
  return h + ':' + m;
};

export const diffHHmmss = (t1: Date, t2: Date, restTime: number) => {
  const diff = t1.getTime() - t2.getTime() - restTime;

  //HH部分取得
  const diffHour = diff / (1000 * 60 * 60);
  //MM部分取得
  const diffMinute = (diffHour - Math.floor(diffHour)) * 60;
  //SS部分取得
  const diffSecond = (diffMinute - Math.floor(diffMinute)) * 60;

  return (
    ('00' + Math.floor(diffHour)).slice(-2) +
    ':' +
    ('00' + Math.floor(diffMinute)).slice(-2) +
    ':' +
    ('00' + Math.round(diffSecond)).slice(-2)
  );
};

const formatTime = (i: number) => {
  if (i < 10) {
    return '0' + i;
  }
  return i;
};
