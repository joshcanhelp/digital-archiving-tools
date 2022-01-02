require('dotenv').config();

const fs = require("fs");
const path = require('path');

const { INPUT_DIR, NEW_FILE_NAME, COUNT_START } = process.env;

const leftPad = (text, padWith = "0", finalLength = 4) => {
  let paddedText = text.toString();

  if (paddedText.length >= finalLength) {
    return paddedText;
  }

  while (paddedText.length < finalLength) {
    paddedText = padWith + paddedText;
  }

  return paddedText;
};

if (!INPUT_DIR) {
  console.error("❌ No INPUT_DIR");
  process.exit();
}

if (!NEW_FILE_NAME) {
  console.error("❌ No NEW_FILE_NAME");
  process.exit();
}

const pathNormalized = path.normalize(INPUT_DIR.trim()).replace(/\/$/, "");

let count = parseInt(COUNT_START, 10) || 1;
fs
  .readdirSync(INPUT_DIR)
  .filter((fileName) => fileName.split(".").at(-1).toLowerCase() === "jpg")
  .forEach(async (fileName) => {
    const oldPath = pathNormalized + "/" + fileName;
    const fileExt = fileName.split(".").at(-1);

    const newFileName = NEW_FILE_NAME + " " + leftPad(count) + "." + fileExt.toLowerCase();
    const newPath = pathNormalized + "/" + newFileName;

    // Uncomment logging and comment out renaming to test
    // console.log("Old:", oldPath, "New:", newPath);
    fs.renameSync(oldPath, newPath);

    count++;
  }
);

console.log("✅ Done!")