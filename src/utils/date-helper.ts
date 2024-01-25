export const checkDatePenalty = (
  datePenalty: Date,
  howManyDay: number,
): boolean => {
  const currentDate = new Date();
  const threeDaysAgo = new Date(
    currentDate.getTime() - howManyDay * 24 * 60 * 60 * 1000,
  );
  return new Date(datePenalty) < threeDaysAgo;
};
