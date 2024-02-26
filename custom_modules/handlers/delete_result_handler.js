const fs = require('fs');

function deleteResult(req, res) {
    const { studentName, examinationTerm, examinationYear } = req.body;
    if (!fs.existsSync(`./results/${studentName}/${studentName}_${examinationYear}_${examinationTerm}_result.json`))
        res.send(JSON.stringify({ deleted: false }));
    else {
        fs.unlink(`./results/${studentName}/${studentName}_${examinationYear}_${examinationTerm}_result.json`, (err) => {
            if (err)
                throw new Error('Unable to delete the result file.');
            var files = fs.readdirSync(`./results/${studentName}`);
            if (files.length === 0)
                fs.rmdir(`./results/${studentName}`, (err) => {
                    if (err)
                        throw new Error('Unable to delete the student directory.');
                });
            res.send(JSON.stringify({ deleted: true }));
        });
    }
}

module.exports = { deleteResult };