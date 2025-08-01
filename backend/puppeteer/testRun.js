const fs = require("fs");
const { extractWebsiteData } = require("./extractWebsiteData");

(async () => {
  const data = await extractWebsiteData("https://www.apple.com");
  fs.writeFileSync("output.json", JSON.stringify(data, null, 2));
  console.log("✅ Data saved to output.json");
})();
