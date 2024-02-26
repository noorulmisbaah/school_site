const fs = require('fs');

function saveResult(req, res) {
    const { 
        selectedSubjects,
        examinationYear, 
        examinationTerm,
        studentName, 
        totalScores,
        testScores,
        examScores,
        average,
        grades,
        total 
    } = req.body;

    fs.readFile('./classes/students.json', (err, content) => {
        if (err)
            throw new Error('The students.json file could not be read.');
        var students = JSON.parse(content);
        var currentStudent = students.filter(student => student.studentName === studentName);
        
        if (currentStudent.length < 1)
            res.send(JSON.stringify( { found: false }));
        else if (fs.existsSync(`./results/${studentName}`)) {
            if (fs.existsSync(`./results/${studentName}/${studentName}_${examinationYear}_${examinationTerm}_result.json`))
                res.send(JSON.stringify({ exists: true }));
            else
                writeResult(res, req.body);
        }
        else {
            fs.mkdir(`./results/${studentName}`, (err) => {
                if (err)
                    throw new Error('The directory could not be created.');
            writeResult(res, req.body);
            });
        }
    });
}

function writeResult(res, { selectedSubjects, examinationYear, examinationTerm, studentName, totalScores, testScores, examScores, average, grades, total }) {
    fs.writeFile(`./results/${studentName}/${studentName}_${examinationYear}_${examinationTerm}_result.json`,
                JSON.stringify({
                    studentName, 
                    examinationYear, 
                    examinationTerm,
                    total,
                    average,
                    selectedSubjects,
                    testScores,
                    examScores,
                    totalScores,
                    grades
                }, null, '\t'), (err) => {
                    if (err)
                        throw new Error('Failed to create the result json file.');
                    res.send(JSON.stringify({ uploaded: true }));
    });
}

module.exports = { saveResult };