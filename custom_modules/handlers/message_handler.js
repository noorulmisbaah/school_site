const fs = require('fs');

function sendMessage(req, res) {
    const { recipientName, message, type } = req.body;
    
    if (fs.existsSync(`./users/${type}/${recipientName}`)) {
        fs.readFile(`./users/${type}/${recipientName}/messages.json`, (err, content) => {
            if (err)
                throw new Error("Failed to read the recipient's messages.json file.");
            else {
                var messages = JSON.parse(content);
                messages[messages.length] = { message, date: (new Date()).toDateString() };
                fs.writeFile(`./users/${type}/${recipientName}/messages.json`, JSON.stringify(
                    messages, null, '\t'), (err) => {
                    if (err)
                        throw new Error('Failed to write the new message.');
                    else
                        res.send({ sent: true });
                });
            }
        });
    } else {
        res.send(JSON.stringify({ sent: false }));
    }
}

module.exports = { sendMessage };