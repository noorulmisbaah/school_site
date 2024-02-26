const fs = require('fs');

function fetchStudents(arg, head) {
    const { classes, allUsers, submissionRequired, text, date, res, messages } = arg;

    fs.readFile('./classes/students.json', (err, content) => {
        if (err)
            throw new Error('There was an error while reading from the students.json file.');
        const students = JSON.parse(content);
        if (head === 'principal')
            res.render('principal', { 
                classes, 
                allUsers, 
                submissionRequired, 
                text, 
                date, 
                allStudents: JSON.stringify(students) 
            });
        else 
            res.render('admin', { 
                classes, 
                messages, 
                submissionRequired, 
                text, 
                date, 
                allStudents: JSON.stringify(students) 
            });
    });
}

module.exports = { fetchStudents };