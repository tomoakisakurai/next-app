export const getDate24Hour = (date: Date) => {
  const h =
    date.getHours().toString().padStart(2, '0') +
    ':' +
    date.getMinutes().toString().padStart(2, '0') +
    ':' +
    date.getSeconds().toString().padStart(2, '0');
  return h;
};

export const getTimeDMS = (time: number) => {
  const timeH = Math.floor((time % (24 * 60 * 60)) / (60 * 60));
  const timeM = Math.floor(((time % (24 * 60 * 60)) % (60 * 60)) / 60);
  const timeS = ((time % (24 * 60 * 60)) % (60 * 60)) % 60;
  const timeDMS = timeH + ':' + timeM + ':' + timeS;
  return timeDMS;
};
