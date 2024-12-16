import { DefaultDatePipe } from './default-date.pipe';

describe('DefaultDatePipe', () => {
  let pipe: DefaultDatePipe;

  beforeEach(() => {
    pipe = new DefaultDatePipe();
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format a Date object correctly using dd/MM/yyyy and en-US', () => {
    const date = new Date('2024-12-15T10:00:00Z');
    const expected = '15/12/2024';
    expect(pipe.transform(date)).toBe(expected);
  });
});
