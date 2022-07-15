const fs = require("fs");
const file = require("../support/parameters.json")

const ReadFile = async (filename) => {
    try {
        let data = fs.readFileSync(filename, "utf8");
        console.log(data);
    } catch (err) {
        console.error("Erro no caminho do arquivo ", err);
    }    
};

module.exports = {
    ReadFile,
};