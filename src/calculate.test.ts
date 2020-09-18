import { calculate } from './calculate';
import { baseRule, custom1Rule, custom2Rule } from './data';

test('finds H value for single rule', () => {
  const resP = calculate([baseRule], [true, true, true], []);
  const resM = calculate([baseRule], [true, true, false], []);
  const resT = calculate([baseRule], [false, true, true], []);
  const resEmpty = calculate([baseRule], [false, false, true], []);

  expect(resP.H).toBe('P');
  expect(resM.H).toBe('M');
  expect(resT.H).toBe('T');
  expect(resEmpty.H).toBe(undefined);
});

test('finds H value for multiple rules', () => {
  const res = calculate([baseRule, custom2Rule], [true, true, false], []);
  const res1 = calculate(
    [baseRule, custom1Rule, custom2Rule],
    [true, true, false],
    []
  );
  const res2 = calculate([custom2Rule, baseRule], [true, true, false], []);
  const res3 = calculate([custom1Rule], [true, true, false], []);

  expect(res.H).toBe('T');
  expect(res1.H).toBe('T');
  expect(res2.H).toBe('M');
  expect(res3.H).toBe(undefined);
});

test('calculates K value for single rule', () => {
  const res = calculate([baseRule], [true, true, true], [5, 5, 5]);
  const res2 = calculate([baseRule], [true, true, false], [5, 5, 5]);
  const res3 = calculate([baseRule], [false, true, true], [5, 5, 5]);

  expect(res.K).toBe(5);
  expect(res2.K).toBe(7.5);
  expect(res3.K).toBe(4.166666666666667);
});

test('handles invalid number input', () => {
  const res = calculate(
    [baseRule],
    [true, true, true],
    [parseInt('kek'), 5, 5]
  );

  expect(res.K).toBe(NaN);
});

test('finds K value for multiple rules', () => {
  const res2 = calculate(
    [baseRule, custom2Rule],
    [true, false, true],
    [5, 5, 5]
  );

  expect(res2.K).toBe(10.25);
});
