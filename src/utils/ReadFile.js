const fs = require("fs");

const ReadFile = (filename) => {
    try {
        let data = fs.readFileSync(filename, "utf8");
        // console.log(data);
        return data;
    } catch (err) {
        console.error("Erro no caminho do arquivo ", err);
    }
};

module.exports = {
    ReadFile,
};