const fs = require('fs');

function writeToFile(dir, res, records) {
    fs.writeFile(dir, JSON.stringify(records, null, '\t'), (err) => {
        if (err)
            res.send(JSON.stringify({ made: false }));
        else
            res.send(JSON.stringify({ made: true }));
    });
}

function makeTransactionFile(obj, res) {
    const dir = `./finance/${obj.academicSession}/${obj.academicTerm}.json`;

    if (fs.existsSync(dir)) {
        fs.readFile(dir, (err, content) => {
            if (err)
                throw new Error('Could not read the financial record file.')
            const records = JSON.parse(content);
            records[records.length] = obj;

            writeToFile(dir, res, records);
        });
    } else {
        const records = [{ ...obj }];
        
        if (!fs.existsSync(`./finance/${obj.academicSession}`)) {
            fs.mkdir(`./finance/${obj.academicSession}`, (err) => {
                if (err)
                    res.send(JSON.stringify({ made: false }));
                else
                    writeToFile(dir, res, records);
            });
        } else {
            writeToFile(dir, res, records);
        }
    }
}

function makeTransaction(req, res) {
    fs.readFile('./finance/General records.json', (err, content) => {
        if (err)
            throw new Error('Failed to read the records file.')
        const records = JSON.parse(content);
        records[records.length] = { date: new Date().toDateString(), ...req.body };
        
        fs.writeFile('./finance/General records.json', JSON.stringify(records, null, '\t'), (err) => {
            if (err)
                res.send(JSON.stringify({ made: false }));
            else
                makeTransactionFile(records[records.length - 1], res);
        });
    });
}

module.exports = { makeTransaction };