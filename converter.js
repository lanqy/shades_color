
// Put all color files into the colors directory, and then execute node ./converter.js to generate the colors.json file
const colorsFolder = "./colors/";
const fs = require("fs");

const forFn = async (item, jsonItem, jsonWrap, key) => {
  const a = item.split("\n");
  const hex = a[1].split(" ");
  const rgb = a[2].split(" ");
  const cmyk = a[3].split(" ");
  jsonItem.push({
    name: a[0],
    hex: hex[1],
    rgb: `rgb(${rgb[1]} ${rgb[2]} ${rgb[3]})`,
    cmyk: `cmyk(${cmyk[1]} ${cmyk[2]} ${cmyk[3]} ${cmyk[4]})`,
  });
  jsonWrap[key[0]] = jsonItem;
};

(async () => {
  const files = fs.readdirSync(colorsFolder);
  let jsonObj = {};
  for (const file of files) {
    const key = file.split(".");
    const data = fs.readFileSync(`${colorsFolder}/${file}`);
    const jsonWrap = {};
    const jsonItem = [];
    const _json = JSON.parse(data);
    for (const element of _json) {
      await forFn(element, jsonItem, jsonWrap, key);
    }
    jsonObj = {
      ...jsonObj,
      ...jsonWrap
    }
  }
  fs.writeFileSync("colors.json", JSON.stringify(jsonObj), {
    encoding: "utf8",
  });
})();
