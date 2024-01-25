const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];

export const queryInput = (input: string[], query: string[]): number[] => {
  //   const result = query.map((char) => {
  //     return input.filter((inputChar) => inputChar === char).length;
  //   });
  //   return result;

  const result: number[] = [];
  for (let i = 0; i < query.length; i++) {
    const char = query[i];
    let charCount = 0;
    for (let j = 0; j < input.length; j++) {
      const inputChar = input[j];
      if (char === inputChar) {
        charCount++;
      }
    }
    result.push(charCount);
  }
  return result;
};
