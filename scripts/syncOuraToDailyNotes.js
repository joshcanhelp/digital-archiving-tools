require("dotenv").config();
const Client = require("oura-cloud-api");

const { existsSync, readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

const { getTodayFormatted, getYesterdayFormatted, getNextDayFormatted } = require("../src/dateUtils");

const pathToNotes = process.argv[2];
if (!pathToNotes) {
  console.log("❌ No path to daily notes!");
  process.exit(1);
}

const { OURA_ACCESS_TOKEN } = process.env;

if (!OURA_ACCESS_TOKEN) {
  console.log("❌ No OURA_ACCESS_TOKEN in .env!");
  process.exit(1);
}

const startDate = process.argv[3] || getTodayFormatted();
const endDate = process.argv[4] || getTodayFormatted();
const dateOptions = { start_date: startDate, end_date: endDate };

const collected = {};
collected[startDate] = {};
collected[endDate] = {};

(async () => {    
    try {
      const client = new Client(OURA_ACCESS_TOKEN);

      // Use exported file from Oura on the web
      // const { daily_activity: activityJson } = JSON.parse(readFileSync("/Users/joshcanhelp/Downloads/activity.json", "utf-8"));
      const { data: activityJson } = await client.getDailyActivity({ start_date: startDate, end_date: getNextDayFormatted(endDate) });
      console.log(`Activity: Got ${activityJson.length} records`);
      activityJson.forEach((dayData) => {
        if (!collected[dayData.day]) {
          collected[dayData.day] = {};
        }
        collected[dayData.day].activityScore = dayData.score;
        collected[dayData.day].activeCalories = dayData.active_calories;
        collected[dayData.day].targetCalories = dayData.target_calories;
        collected[dayData.day].totalCalories = dayData.total_calories;
      });
      
      // writeFileSync("/Users/joshcanhelp/Downloads/readiness.json", JSON.stringify(readiness, null, 2));
      // Use exported file from Oura on the web
      // const { daily_readiness: readinessJson } = JSON.parse(readFileSync("/Users/joshcanhelp/Downloads/readiness.json", "utf-8"));
      const { data: readinessJson } = await client.getDailyReadiness(dateOptions);
      console.log(`Readiness: Got ${readinessJson.length} records`);
      readinessJson.forEach((dayData) => {
        if (!collected[dayData.day]) {
          collected[dayData.day] = {};
        }
        collected[dayData.day].readinessScore = dayData.score;
        collected[dayData.day].temperatureDeviation = dayData.temperature_deviation;
      });
      
      // writeFileSync("/Users/joshcanhelp/Downloads/sleep.json", JSON.stringify(sleep, null, 2));
      // Use exported file from Oura on the web
      // const { daily_sleep: sleepJson } = JSON.parse(readFileSync("/Users/joshcanhelp/Downloads/sleep.json", "utf-8"));
      const { data: sleepJson } = await client.getDailySleep(dateOptions);
      console.log(`Sleep: Got ${sleepJson.length} records`);
      sleepJson.forEach((dayData) => {
        if (!collected[dayData.day]) {
          collected[dayData.day] = {};
        }
        collected[dayData.day].sleepScore = dayData.score;
        collected[dayData.day].totalSleep = dayData.contributors.total_sleep;
        collected[dayData.day].deepSleep = dayData.contributors.deep_sleep;
        collected[dayData.day].sleepEfficiency = dayData.contributors.efficiency;
        collected[dayData.day].sleepLatency = dayData.contributors.latency;
      });
    } catch (error) {
      console.log(error);
      process.exit(1);
    }

    try {
      Object.keys(collected).forEach((day) => {
        const dateParts = day.split("-");
        const filePath = join(pathToNotes, dateParts[0], `${day}.md`);
        const appendHeader = "## Imported Oura data";

        let fileContents = "";
        if (existsSync(filePath)) {
          fileContents = readFileSync(filePath).toString().trim() + "\n\n";
        }

        const {
          activityScore,
          activeCalories,
          targetCalories,
          totalCalories,
          readinessScore,
          temperatureDeviation,
          sleepScore,
          totalSleep,
          deepSleep,
          sleepEfficiency,
          sleepLatency,
        } = collected[day];

        const markdownAppend = `${appendHeader}
- **Activity:** ${activityScore ? `\`${activityScore}\` score` : "Rest mode"}
- **Movement:** \`${activeCalories}\` active calories (${Math.round(activeCalories/targetCalories*100)}% of target), \`${totalCalories}\` total burned, 
- **Sleep:** ${sleepScore ? `\`${sleepScore}\` score, \`${totalSleep}\` total, \`${deepSleep}\` deep,  \`${sleepEfficiency}\` efficiency,  \`${sleepLatency}\` latency` : "Not recorded"}
- **Readiness:** ${readinessScore ? `\`${readinessScore}\` score, \`${temperatureDeviation}\` temperature deviation` : "Not recorded"}
`;

        if (fileContents.includes(appendHeader)) {
          console.log(`Imported data found in ${filePath}. Skipping ...`);
        } else if (day === getTodayFormatted()) {
          console.log(`Today's data. Skipping ...`);
        } else {
          console.log(`Writing to ${filePath}...`);
          fileContents = fileContents + markdownAppend;
          writeFileSync(filePath, fileContents);
        }
      });

    } catch (error) {
      console.log(error);
      process.exit(1);
    }
})();
