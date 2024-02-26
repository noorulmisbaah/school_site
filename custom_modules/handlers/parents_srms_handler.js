const fs = require('fs');

function fetchResult(username, res) {
    fs.readFile(`./users/parent/${username}/children.json`, (err, content) => {
        if (err)
            throw new Error('Failed to read the children.json file.');
        var children = JSON.parse(content);

        res.render('parents_results_management_system', { children });
    })
}

module.exports = { fetchResult };