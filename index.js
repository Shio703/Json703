const { readFileSync, readdir, createWriteStream } = require("node:fs");
const { dataObject } = require("./schemas/dataSchema");
const path = require("node:path");
const { test } = require("node:test");
const assert = require("node:assert");

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
    const object = new dataObject(currentDate);

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
    } else {
      console.log("no instructions found!");
      process.exit(1);
    }
    // if all property is not present then output will be just an empty array!!!
    if (object.date && object.data.status && object.data.time) {
      dataArray.push(object);
    }
  });
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

// test cases: (which is not working yet)
// const testFile = require("./files-for-testing/04-2023.json");

// test("Output matches", async () => {
//   await dirReader()
//     .then((fileNames) => fileReader(fileNames))
//     .then((fileContent) => checker(fileContent))
//     .then(() => {
//       const output = JSON.stringify(dataArray);
//       console.log("output: ", output);
//       console.log("test file: ", testFile);
//       if (testFile !== output) {
//         throw new Error("doesn't match!");
//       }
//     });
//   // exec("cat ");
// });
