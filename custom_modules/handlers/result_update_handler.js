const fs = require('fs');

function updateResult(req, res) {
    const { 
        studentName,
        examinationYear,
        examinationTerm,
        selectedSubjects,
        totalScores,
        testScores,
        examScores,
        grades,
        average,
        total
    } = req.body;

    if (!fs.existsSync(`./results/${studentName}/${studentName}_${examinationYear}_${examinationTerm}_result.json`))
        res.send(JSON.stringify({ updated: false }));
    else {
        fs.writeFile(`./results/${studentName}/${studentName}_${examinationYear}_${examinationTerm}_result.json`, 
            JSON.stringify({
                studentName,
                examinationYear,
                examinationTerm,
                selectedSubjects,
                totalScores,
                testScores,
                examScores,
                grades,
                average,
                total
            }, null, '\t'), (err) => {
            if (err)
                throw new Error('Failed to update the result.');
            res.send(JSON.stringify({ updated: true }));
        });
    }
}

module.exports = { updateResult };