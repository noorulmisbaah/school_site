const fs = require('fs');

function retrieveStudents(res) {
    const resultLabels = fs.readdirSync('./results');
    res.render('srms', { resultLabels });
}

module.exports = { retrieveStudents };