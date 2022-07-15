const { ReadFile } = require("../../src/utils/ReadFile");
const file = require("../support/parameters.json")

for (const config of file) {
    ReadFile(config.pathFiles);
}