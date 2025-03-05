const { readFileSync, readdir, createWriteStream } = require("node:fs");
const { dataObject } = require("./schemas/dataSchema");
const path = require("node:path");

// readdir("./txt Files", { encoding: "utf-8" }, (err, files) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   for (fileIndex = 0; fileIndex < files.length; fileIndex++) {
//     const fileContent = readFileSync(`./txt Files/${files[fileIndex]}`, {
//       encoding: "utf-8",
//     });
//     // console.log(fileContent);

//     // transforming into an array:
//     const toArray = fileContent.split("\n");
//     // console.log(toArray);

//     // extracting dates:
//     const dates = toArray.filter((value, index, array) => {
//       //   console.log(array[index].trim());
//       return value.includes("/");
//     });

//     // extracting times:
//     const times = toArray.filter((value, index, array) => {
//       return value.includes(":");
//     });
//     // and after this probably i'm gonna create another loop/map method which will loop "toArray" and clean each value from additional spaces
//     times.map((value, index, array) => {
//       const separatedTiems = array[index].substring(0, 7).trim();
//       const separatedStatus = array[index].substring(8).trim();
//       // console.log("time:", separatedTiems, "\n", "status:", separatedStatus);
//       // console.log(value);
//       const record = new dataObject(
//         dates[fileIndex],
//         separatedTiems,
//         separatedStatus
//       );
//       console.log(record);
//     });
//   }
// });

// idea how to split time string which currently containes time and status:
// due to every time and status part has a space betweeen we can check this space
// at least two times and if it's just free space then we can do something conditionally
// depended on this condition.

// somewhere i should add if statement that will check dates and if date chages then it should create another folder in which it will save next date notes.
const dirReader = () => {
  return new Promise((resolve, reject) => {
    readdir("./txt Files", { encoding: "utf8" }, (err, files) => {
      if (err) {
        reject("error during reading the directory!");
        process.exit(1);
      }
      resolve(files);
    });
  });
};

const fileReader = (fileName) => {
  try {
    const fileContent = readFileSync(`./txt Files/${fileName}`, {
      encoding: "utf-8",
    });
    return Promise.resolve(fileContent);
  } catch (error) {
    console.error("Reading the file: ", error);
  }
};
// this object && variables may be needed in other functions so they are on global scope.
let currentDate = null;
let dataArray = [];

const checker = (fileContent) => {
  const toArray = fileContent.split("\n");

  toArray.forEach((line, index, array) => {
    
    const object = new dataObject();

    if (line.includes("/")) {
      //then it's date.
      currentDate = line.trim();
      object.date = line.trim();
      // console.log("date: ", line);
    } else if (line.includes(":")) {
      //then it's time with status.
      object.data.time = array[index].substring(0, 7).trim();
      object.data.status = array[index].substring(8).trim();
      // console.log("time: ", line);
    } else if (line.length === 0 || 1) {
      //then it's space between days.
      // console.log("space between days!");
    } else {
      console.log("no instructions found!");
      process.exit(1);
    }
    // after each checking process i should do something with "object" to store it in current state.
    if (object.date && object.data.status && object.data.time) {
    }
    dataArray.push(object);
  });
  // and then here we can call writer to write our array in a file.
  console.log(dataArray);

  return Promise.resolve();
};

const writer = () => {
  try {
    const jsonName = currentDate
      .substring(currentDate.length - 0, 3)
      .replace("/", "-");

    const filePath = path.join(__dirname, "json Files", `${jsonName}.json`);

    const writeStream = createWriteStream(filePath, {
      encoding: "utf-8",
    });

    writeStream.write(JSON.stringify(dataArray));
    writeStream.end();

    writeStream.on("finish", () => console.log("writing finished!"));
    writeStream.on("error", (error) =>
      console.error("during the write operation: ", error)
    );
  } catch (err) {
    console.error("in the writer during syncronous operations: ", err);
  }
};

dirReader()
  .then((fileNames) => fileReader(fileNames))
  .then((fileContent) => checker(fileContent))
  .then(() => writer());
