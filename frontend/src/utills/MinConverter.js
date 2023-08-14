export const minutesConverter = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hoursText = hours > 0 ? `${hours}ч` : '';
  const minutesText = remainingMinutes > 0 ? ` ${remainingMinutes}м` : '';

  return `${hoursText}${minutesText}`;
};
