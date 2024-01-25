import { longestWord } from '../../algoritma-test/02';

describe('02', () => {
  it('should return longest word', () => {
    const sentence = 'Saya sangat senang mengerjakan soal algoritma';

    expect(longestWord(sentence)).toBe('mengerjakan');
  });
});
