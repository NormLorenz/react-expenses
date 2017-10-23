import * as utilities from './utilities';

it('calculateDate', () => {
  expect(utilities.calculateDate('12/12', 2015)).toMatchObject({ date: '2015-12-12T08:00:00.000Z', taxYear: 2015 });
  expect(utilities.calculateDate('6/6', 2015)).toMatchObject({ date: '2015-06-06T07:00:00.000Z', taxYear: 2015 });
  expect(utilities.calculateDate('1/1', 2015)).toMatchObject({ date: '2015-01-01T08:00:00.000Z', taxYear: 2015 });
  expect(utilities.calculateDate('1/1/2010', 2015)).toMatchObject({ date: '2010-01-01T08:00:00.000Z', taxYear: 2010 });
  expect(utilities.calculateDate('2/29', 2015)).toMatchObject({ date: '2015-01-01T08:01:00.000Z', taxYear: 2015 });
  expect(utilities.calculateDate('2/29/1988', 2015)).toMatchObject({ date: '1988-02-29T08:00:00.000Z', taxYear: 1988 });
  expect(utilities.calculateDate('sdf', 2015)).toMatchObject({ date: '2015-01-01T08:01:00.000Z', taxYear: 2015 });
});

it('testDate', () => {
  expect(utilities.testDate()).toEqual('Thu Jan 01 2015 00:01:00 GMT-0800');
});

it('sum', () => {
  expect(utilities.sum(1, 2)).toBe(3);
  expect(utilities.sum(1, 2)).toEqual(3);
  expect(utilities.sum(11, 22)).toEqual(33);
});