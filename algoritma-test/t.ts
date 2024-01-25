// const getDateThreeDaysAgo = () => {
//   const date = new Date();
//   date.setDate(date.getDate() - 3);
//   return date;
// };

// const getDateThreeDaysAfter = () => {
//   const date = new Date();
//   date.setDate(date.getDate() + 3);
//   return date;
// };

const threeDay = new Date('2024-01-24');

const checkDateIsMoreThanThreeDays = (datePenalty: Date): boolean => {
  const currentDate = new Date();
  const threeDaysAgo = new Date(
    currentDate.getTime() - 3 * 24 * 60 * 60 * 1000,
  ); // subtract 3 days from the current date
  return datePenalty < threeDaysAgo;
};
console.log(checkDateIsMoreThanThreeDays(threeDay));
