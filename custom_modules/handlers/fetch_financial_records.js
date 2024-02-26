const fs = require('fs');

function fetchFinancialRecords(obj, res) {
    const { 
        username, 
        messages, 
        submissionRequired, 
        classes, 
        text, 
        date 
    } = obj;

    fs.readFile('./finance/General records.json', (err, content) => {
        if (err)
            throw new Error('Cannot read the records.json file.');
        const records = JSON.parse(content);

        res.render('finance', { username, messages, classes, submissionRequired, text, date, records });
    });
}

module.exports = { fetchFinancialRecords };