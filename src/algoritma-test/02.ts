export const longestWord = (str: string): string => {
  const splitStr = str.split(' ');
  let longestChar = '';
  let longestCharLength = 0;

  for (let i = 0; i < splitStr.length; i++) {
    const char = splitStr[i];

    if (char.length > longestCharLength) {
      longestChar = char;
      longestCharLength = char.length;
    }
  }

  return longestChar;
};
