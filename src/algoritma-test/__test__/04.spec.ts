import { calculateMatrix } from '../04';

describe('04', () => {
  it('should return calculate matrix', () => {
    const Matrix = [
      [1, 2, 0],
      [4, 5, 6],
      [7, 8, 9],
    ];

    expect(calculateMatrix(Matrix)).toEqual(3);
  });
});
