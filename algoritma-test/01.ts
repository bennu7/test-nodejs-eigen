export const reverseString = (str: string): string => {
  return str.slice(0, -1).split('').reverse().join('') + str.slice(-1);
};
