const { readdirSync, renameSync } = require("fs");
const { padLeftZero } = require("../src/dateUtils");

const path = process.argv[2];

if (!path) {
  console.log("❌ No path");
  process.exit(1);
}

readdirSync(path).forEach((fileName) => {
  const extension = fileName.split(".")[1];
  const [ year, month, day ] = fileName.split(".")[0].split("-");
  const newFileName = `${year}-${padLeftZero(month)}-${padLeftZero(day)}.${extension}`;

  if (newFileName !== fileName) {
    renameSync(`${path}/${fileName}`, `${path}/${newFileName}`);
  }
});