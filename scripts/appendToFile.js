const { existsSync, readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

const path = process.argv[2];
if (!path) {
  console.log("❌ No path");
  process.exit(1);
}

const days = {
  "2022-10-12": {
    banana: "norm"
  },
  "2022-12-12": {
    banana: "norm"
  },
  "2022-09-12": {
    banana: "norm"
  },
  "2022-11-12": {
    banana: "norm"
  },
}

Object.keys(days).forEach((day) => {
  const dateParts = day.split("-");
  const filePath = join(path, "Daily", dateParts[0], `${day}.md`);
  const append = "## Appended ..."

  let fileContents = "";
  if (existsSync(filePath)) {
    fileContents = readFileSync(filePath);
  }

  fileContents = fileContents.trim() + "\n\n" + append;

  writeFileSync(filePath, fileContents);
});