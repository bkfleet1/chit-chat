const { format_date, format_plural, format_url } = require("../utils/helpers");

test("format_url() returns a simplified url string", () => {
  const url1 = format_url("http://test.com/page/1");
  const url2 = format_url("https://www.coolstuff.com/abcdefg/");
  const url3 = format_url("https://www.google.com?q=hello");

  expect(url1).toBe("test.com");
  expect(url2).toBe("coolstuff.com");
  expect(url3).toBe("google.com");
});

test("format_date() returns a date string", () => {
  const date = new Date("2022-03-06 15:16:04");

  expect(format_date(date)).toBe("3/06/2022");
});
