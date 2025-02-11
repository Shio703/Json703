const { readFileSync, readdir } = require("node:fs");
const { dataSchema } = require("./schemas/dataSchema");


readdir("./txt Files", { encoding: "utf-8" }, (err, files) => {
  if (err) {
    console.log(err);
    return;
  }
  for (i = 0; i < files.length; i++) {
    const fileContent = readFileSync(`./txt Files/${files[i]}`, {
      encoding: "utf-8",
    });
    // console.log(fileContent);

    // transforming into an array:
    const toArray = fileContent.split("\n");
    // extracting dates:
    const dates = toArray.filter((value, index, array) => {
      //   console.log(array[index].trim());
      return value.includes("/");
    });
    // extracting times:
    const times = toArray.filter((value, index, array) => {
      return value.includes(":");
    });

    // console.log(dates);
    const record = new dataSchema(dates[i], times);
    console.log(record);
  }
});

// idea how to split time string which currently containes time and status:
// due to every time and status part has a space betweeen we can check this space 
// at least two times and if it's just free space then we can do something conditionally
// depended on this condition.