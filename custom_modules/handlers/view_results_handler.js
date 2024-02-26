const fs = require('fs');

function sendResults(req, res) {
    const { studentName, examinationYear, examinationTerm } = req.body;

    if(!fs.existsSync(`./results/${studentName}/${studentName}_${examinationYear}_${examinationTerm}_result.json`))
        res.send(JSON.stringify({ obtained: false }));
    else {
        fs.readFile(`./results/${studentName}/${studentName}_${examinationYear}_${examinationTerm}_result.json`, (err, content) => {
            if (err)
                throw new Error('Failed to read the result json file.');
            const fileContent = JSON.parse(content);
            res.send(JSON.stringify({ obtained: true, resultData: fileContent }));
        })
    }
}

module.exports = { sendResults }