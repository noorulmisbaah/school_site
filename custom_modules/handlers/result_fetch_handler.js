const fs = require('fs');

function fetchResult(req, res) {
    const { studentName, examinationYear, examinationTerm } = req.body;

    if (!fs.existsSync(`./results/${studentName}`))
        res.send(JSON.stringify({ found: false }));
    else if (!fs.existsSync(`./results/${studentName}/${studentName}_${examinationYear}_${examinationTerm}_result.json`))
        res.send(JSON.stringify({ found: false }));
    else {
        fs.readFile(`./results/${studentName}/${studentName}_${examinationYear}_${examinationTerm}_result.json`, (err, content) => {
            if (err)
                throw new Error('Cannot read the result for the student.');
            const resultData = JSON.parse(content);
            res.send(JSON.stringify({ resultData, found: true }));
        });
    }
}

module.exports = { fetchResult };