export function formatReadingTime(minutes) {
  let cups = Math.round(minutes / 5);
  return `زمان مطالعه ${new Array(cups || 1).fill('☕️').join('')} ${minutes} دقیقه`;
}