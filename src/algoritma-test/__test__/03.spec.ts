import { queryInput } from '../03';

describe('03', () => {
  it('should return query input', () => {
    const INPUT = ['xc', 'dz', 'bbb', 'dz'];
    const QUERY = ['bbb', 'ac', 'dz'];

    expect(queryInput(INPUT, QUERY)).toEqual([1, 0, 2]);
  });
});
