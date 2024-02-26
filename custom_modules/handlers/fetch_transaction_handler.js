const fs = require('fs');

function fetchTransaction(req, res) {
    const { academicTerm, academicSession } = req.body;
    const dir = `./finance/${academicSession}/${academicTerm}.json`;

    if (!fs.existsSync(dir))
        res.send(JSON.stringify({ fetched: false }));
    else {
        fs.readFile(dir, (err, content) => {
            if (err)
                res.send(JSON.stringify({ fetched: false }))
            else {
                const data = JSON.parse(content);

                res.send(JSON.stringify({ data, fetched: true }))
            }
        });
    }
}

module.exports = { fetchTransaction };