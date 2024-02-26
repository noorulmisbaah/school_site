const fs = require('fs');
const fchild = require('./fetch_children');
const fstuds = require('./fetch_students');
const frecord = require('./fetch_financial_records');

function validateSigin(req, res) {
    const username = req.body.username.toLowerCase();
    const password = req.body.password;

    fs.readFile('./users/users.json', (err, content) => {
        if (err)
            console.log('Cannot read from the users.json file.');
        else {
            const usersFileContent = JSON.parse(content);
            const currentUser = usersFileContent.filter(user => user.username === username);

            if (currentUser.length !== 0) {
                if (currentUser[0].password === password) {
                    fs.readFile(`./users/${currentUser[0].type}/${currentUser[0].username}/messages.json`, (err, content) => {
                        if (err)
                            throw new Error('Failed to read the messages.json file');
                        else {
                            var messages = JSON.parse(content); 

                            messages.reverse();
                            fs.readdir('./classes', (err, allClasses) => {
                                if (err)
                                    throw new Error('Failed to read the classes directory.');
                                else {
                                    var classes = [];

                                    for (var i = 0; i < allClasses.length - 1; i++) {
                                        classes[i] = allClasses[i];
                                    }
                                    
                                    switch(currentUser[0].type) {
                                        case 'staff':
                                            res.render('teachers', { 
                                                username, 
                                                messages, 
                                                submissionRequired: true, 
                                                text: 'First term examination questions',
                                                date: '12th October, 2021'
                                             });
                                            break;
                                        case 'parent':
                                            fchild.fetchChildren({ username, messages, res });
                                            break;
                                        case 'admin':
                                            fstuds.fetchStudents({ 
                                                classes,
                                                res,
                                                messages,
                                                submissionRequired: true, 
                                                text: 'First term examination questions',
                                                date: '12th October, 2021' }, 'admin');
                                            break;
                                        case 'finance':
                                            frecord.fetchFinancialRecords({ 
                                                username, 
                                                messages,
                                                classes, 
                                                submissionRequired: true, 
                                                text: 'First term examination questions',
                                                date: '12th October, 2021'
                                             }, res);
                                            break;
                                        case 'principal':
                                            fstuds.fetchStudents({ 
                                                classes,
                                                res,
                                                allUsers: JSON.stringify(usersFileContent),
                                                submissionRequired: true, 
                                                text: 'First term examination questions',
                                                date: '12th October, 2021' }, 'principal');
                                            break;
                                    }
                                }
                            });
                        }
                    });
                } else {
                    res.render('signin', { exists: true, incorrectPassword: true });
                }
            } else {
                res.render('signin', { exists: false, incorrectPassword: false });
            }
        }
    });
}

module.exports = { validateSigin };