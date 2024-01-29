const moment = require("moment-timezone");
const unitTestingTask = require("../unitTestingTask");

describe("-Date and time formatting: ", () => {
  describe("Years:", () => {
    const date = moment("2024-01-06").toDate();
    const cases = [
      ["YYYY should return 4-digit year", "YYYY", "2024"],
      ["YY should return last 2 digits of year", "YY", "24"],
    ];

    test.each(cases)("%s", (description, format, expected) => {
      expect(unitTestingTask(format, date)).toBe(expected);
    });
  });

  describe("Months:", () => {
    const date = moment("2024-01-06").toDate();
    const cases = [
      ["MMMM should return full name of month", "MMMM", "January"],
      ["MMM should return short name of month", "MMM", "Jan"],
      [
        "MM should return number of month in year with zero-padding",
        "MM",
        "01",
      ],
      [
        "M should return number of month in year without zero-padding",
        "M",
        "1",
      ],
    ];

    test.each(cases)("%s", (description, format, expected) => {
      expect(unitTestingTask(format, date)).toBe(expected);
    });
  });

  describe("Days:", () => {
    const date = moment("2024-01-06").toDate();
    const cases = [
      ["DDD should return full name of day", "DDD", "Saturday"],
      ["DD should return short name of day", "DD", "Sat"],
      ["D should return min name of day", "D", "Sa"],
      ["dd should return zero-padded number of day in month", "dd", "06"],
      ["d should return number of day in month", "d", "6"],
    ];

    test.each(cases)("%s", (description, format, expected) => {
      expect(unitTestingTask(format, date)).toBe(expected);
    });
  });

  describe("Hours:", () => {
    const cases = [
      [
        "HH should return zero-padded hour in 24-hr format",
        "HH",
        new Date("2024-01-13 3:05:21"),
        "03",
      ],
      [
        "H should return hour in 24-hr format",
        "H",
        new Date("2024-01-13 3:05:21"),
        "3",
      ],
      [
        "hh should return zero-padded hour in 12-hr format",
        "hh",
        new Date("2024-01-13 6:05:13"),
        "06",
      ],
      [
        "hh should return zero-padded hour in 12-hr format",
        "hh",
        new Date("2024-01-13 12:05:21"),
        "12",
      ],
      [
        "h should return hour in 12-hr format",
        "h",
        new Date("2024-01-13 13:05:21"),
        "1",
      ],
      [
        "h should return hour in 12-hr format",
        "h",
        new Date("2024-01-13 12:35:21"),
        "12",
      ],
    ];

    test.each(cases)("%s", (description, format, date, expected) => {
      expect(unitTestingTask(format, date)).toBe(expected);
    });
  });

  describe("Minutes:", () => {
    const date = new Date("2024-01-13 13:05:21");
    const cases = [
      ["mm should return zero-padded minutes", "mm", date, "05"],
      ["m should return minutes", "m", date, "5"],
    ];

    test.each(cases)("%s", (description, format, date, expected) => {
      expect(unitTestingTask(format, date)).toBe(expected);
    });
  });

  describe("Seconds:", () => {
    const date = new Date("2024-01-13 14:05:8");
    const cases = [
      ["ss should return zero-padded seconds", "ss", date, "08"],
      ["s should return seconds", "s", date, "8"],
    ];

    test.each(cases)("%s", (description, format, date, expected) => {
      expect(unitTestingTask(format, date)).toBe(expected);
    });
  });

  describe("Milliseconds:", () => {
    const cases = [
      [
        "ff should return zero-padded milliseconds",
        "ff",
        new Date("2024-01-13 15:05:20.1"),
        "100",
      ],
      [
        "f should return milliseconds",
        "f",
        new Date("2024-01-13 15:05:20:34"),
        "34",
      ],
    ];

    test.each(cases)("%s", (description, format, date, expected) => {
      expect(unitTestingTask(format, date)).toBe(expected);
    });
  });

  describe("AM/PM", () => {
    const amDate = new Date("2024-01-13 08:05");
    const pmDate = new Date("2024-01-13 13:17");

    const cases = [
      ["A should return AM", "A", amDate, "AM"],
      ["a should return am", "a", amDate, "am"],
      ["A should return PM", "A", pmDate, "PM"],
      ["a should return pm", "a", pmDate, "pm"],
    ];

    test.each(cases)("%s", (description, format, date, expected) => {
      expect(unitTestingTask(format, date)).toBe(expected);
    });
  });

  describe("Timezone", () => {
    const date = "2024-01-13";
    const timeZone = "Europe/Berlin";

    const cases = [
      [
        "ZZ should return time-zone in ISO8601-compatible basic format",
        "ZZ",
        moment(date).toDate(),
        moment
          .tz(date, timeZone)
          .utcOffset(moment().utcOffset())
          .format("Z")
          .replace(":", ""),
      ],
      [
        "Z should return time-zone in ISO8601-compatible extended format",
        "Z",
        moment(date).toDate(),
        moment.tz(date, timeZone).utcOffset(moment().utcOffset()).format("Z"),
      ],
    ];

    test.each(cases)("%s", (description, format, date, expected) => {
      expect(unitTestingTask(format, date)).toBe(expected);
    });
  });
});

describe("-Date cases", () => {
  test("Should convert date argument to new Date format and work as usual", () => {
    expect(unitTestingTask("YYYY", "2024-01-13")).toBe("2024");
  });

  test("Should generate new Date if not date argument and work as usual", () => {
    expect(unitTestingTask("YY")).toBe("24");
  });
});

describe("-Language cases", () => {
  jest.mock("../lang/uk.js", () => {});

  const cases = [
    [
      "Should use current language if the language provided does not exist.",
      "kryptonian",
      "en",
    ],
    [
      "Should change current language if is not equal to current one",
      "uk",
      "uk",
    ],
    ["Should set new language if language exists.", "uk", "uk"],
  ];

  beforeEach(() => {
    unitTestingTask.lang("en");
  });

  test.each(cases)("%s", (description, language, expected) => {
    expect(unitTestingTask.lang(language)).toBe(expected);
  });
});

describe("-Register format", () => {
  test("Should register a new format", () => {
    unitTestingTask.register("longDate", "d MMMM");
    expect(unitTestingTask.formatters()).toContain("longDate");
  });
});

describe("-Error cases", () => {
  test("Should throw type error if format argument is not a string.", () => {
    expect(() => unitTestingTask(true)).toThrow(
      TypeError("Argument `format` must be a string")
    );
  });

  test("Should throw type error if invalid date argument.", () => {
    expect(() => unitTestingTask("YY", {})).toThrow(
      TypeError(
        "Argument `date` must be instance of Date or Unix Timestamp or ISODate String"
      )
    );
  });
});
