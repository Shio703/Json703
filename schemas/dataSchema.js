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

// main core schema where most important filtering/sorting process happens
// let currentDate = null;

// if( line.includes("/") ){
//   //then it's date.
//   currentDate = line.trim();
// }else if( line.includes(":") ){
//   //then it's time with status.
  
// }else if( line.includes(" ") ){
//   //then it's space between days.
  
// }else{
//   console.log("no instructions found!");
// }