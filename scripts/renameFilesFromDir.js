const { readdirSync, statSync, renameSync } = require("fs");

const path = process.argv[2];

if (!path) {
  console.log("❌ No path");
  process.exit(1);
}

readdirSync(path).forEach((dirName) => {
  const currPath = `${path}/${dirName}`;
  const stats = statSync(currPath);
  if (stats.isDirectory(currPath)) {
    const fileAppend = `${dirName.substring(0, 4)}-${dirName.substring(4, 6)}-`
    readdirSync(`${path}/${dirName}`).forEach((fileName) => {
      renameSync(`${currPath}/${fileName}`, `${currPath}/${fileAppend + fileName}`);
    });
  }
});