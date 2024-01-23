export const calculateMatrix = (matrix: number[][]): number => {
  const firstDiagonal = matrix[0][0] + matrix[1][1] + matrix[2][2];
  const secondDiagonal = matrix[0][2] + matrix[1][1] + matrix[2][0];

  return firstDiagonal - secondDiagonal;
};
