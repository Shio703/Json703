class dataObject {
  constructor(date, time, status) {
    this.date = date;
    this.data = {
      time,
      status,
    };
  }
}

module.exports = { dataObject };
// an example of the dataObject in a respose array
// [
//   dataObject = {
//     date: "22/07/2024",
//     data: {
//       time: "16:30",
//       status: "active",
//     },
//   },
// ];
