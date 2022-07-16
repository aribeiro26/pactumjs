const file = require("../../parameters/parameters.json")
const { ReadFile } = require("../utils/ReadFile");

const LoadFile = () => {
    for (const config of file) {
        const loadfile = ReadFile(config.pathFiles);
        return loadfile;
    }    
}

module.exports = {
    LoadFile,
};