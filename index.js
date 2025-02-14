const { readFileSync, readdir } = require("node:fs");
const { dataObject } = require("./schemas/dataSchema");

readdir("./txt Files", { encoding: "utf-8" }, (err, files) => {
  if (err) {
    console.log(err);
    return;
  }
  for (fileIndex = 0; fileIndex < files.length; fileIndex++) {
    const fileContent = readFileSync(`./txt Files/${files[fileIndex]}`, {
      encoding: "utf-8",
    });
    // console.log(fileContent);

    // transforming into an array:
    const toArray = fileContent.split("\n");
    // console.log(toArray);

    // extracting dates:
    const dates = toArray.filter((value, index, array) => {
      //   console.log(array[index].trim());
      return value.includes("/");
    });

    // extracting times:
    const times = toArray.filter((value, index, array) => {
      return value.includes(":");
    });
    // and after this probably i'm gonna create another loop/map method which will loop "toArray" and clean each value from additional spaces
    times.map((value, index, array) => {
      const separatedTiems = array[index].substring(0, 7).trim();
      const separatedStatus = array[index].substring(8).trim();
      // console.log("time:", separatedTiems, "\n", "status:", separatedStatus);
      // console.log(value);      
      const record = new dataObject(
        dates[fileIndex],
        separatedTiems,
        separatedStatus
      );
      console.log(record);
    });
  }
});

// idea how to split time string which currently containes time and status:
// due to every time and status part has a space betweeen we can check this space
// at least two times and if it's just free space then we can do something conditionally
// depended on this condition.

// somewhere i should add if statement that will check dates and if date chages then it should create another folder in which it will save next date notes.
