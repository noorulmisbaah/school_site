const fs = require('fs');

function addNewUser(req, res) {
    var { username, password, email, number, type } = req.body;
    username = username.toLowerCase();
    
    fs.readFile('./users/users.json', (err, content) => {
        if (err)
            throw new Error('Failed to read the users.json file.')
        else {
            var users = JSON.parse(content);
            var user = users.filter(user => user.username === username);

            if (user.length > 0)
                res.render('signup', { exists: true, done: false });
            else {
                fs.mkdir(`./users/${type}/${username}`, (err) => {
                    if (err)
                        throw new Error('Failed to create the directory for the new user.');
                    else {
                        fs.writeFile(`./users/${type}/${username}/user_info.json`, JSON.stringify(
                            { username, password, email, number, type }, null, '\t'
                        ), (err) => {
                            if (err)
                                throw new Error('Failed to write the .json file for the new user.');
                            else {
                                fs.writeFile(`./users/${type}/${username}/messages.json`, '[\n]', (err) => {
                                    if (err)
                                        throw new Error('Failed to create the messages.json file.');
                                });
                
                                if (type === 'parent')
                                    fs.writeFile(`./users/${type}/${username}/children.json`, '[\n]', (err) => {
                                        if (err)
                                            throw new Error('Failed to create the children.json file.');
                                    });
                                fs.readFile('./users/users.json', (err, content) => {
                                    if (err)
                                        throw new Error('Cannot read the users json file.')
                                    else {
                                        var users = JSON.parse(content);
                                        users[users.length] = { username, password, email, number, type };
                                        fs.writeFile('./users/users.json', JSON.stringify(
                                            users, null, '\t'
                                        ), (err) => {
                                            if (err)
                                                throw new Error('Failed to rewrite the .json file.');
                                            else
                                                res.render('signup', { exists: false, done: true });
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
    });
}

module.exports = { addNewUser };