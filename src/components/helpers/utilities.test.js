import * as utilities from './utilities';

test('add to variables together and produces the sum', () => {
  expect(utilities.sum(1, 2)).toBe(3);
});

it('add to variables together and produces the sum', () => {
  expect(utilities.sum(1, 2)).toEqual(3);
});

it('add to variables together and produces the sum', () => {
  expect(utilities.sum(11, 22)).toEqual(33);
});

it('add to variables together and produces the sum', () => {
  expect(utilities.sum(1, 2)).toEqual(3);
});