class dataSchema {
  constructor(date, time, status) {
    this.date = date;
    this.times = [
      {
        time,
        status,
      },
    ];
  }
}

module.exports = { dataSchema };

[
  {
    date: "7/3/2023",
    times: [
      {
        time: "",
        status: "",
      },
    ],
  },
];
