const fs = require('fs');

function fetchChildren(arg) {
    const { messages, username, res } = arg;
    
    fs.readFile(`./users/parent/${username}/children.json`, (err, content) => {
        if (err)
            throw new Error('Failed to read the children.json file.');
        else {
            var children = JSON.parse(content);
            res.render('parents', { messages, username, children });
        }
    })
}

module.exports = { fetchChildren };