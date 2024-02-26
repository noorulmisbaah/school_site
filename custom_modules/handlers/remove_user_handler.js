const fs = require('fs');

function removeUserDirectory(option, user, res) {
    const dir = `./users/${option}/${user}`
    if (!(fs.existsSync(dir)))
        res.send(JSON.stringify({ removed: false }))
    else {
        const directoryFiles = fs.readdirSync(`${dir}`);
        
        for (var i = 0; i < directoryFiles.length; i++) {
            fs.unlink(`${dir}/${directoryFiles[i]}`, (err) => {
                if (err)
                    throw new Error(`'${directoryFiles[i]}' could not be removed.`);
            });
        }
        if (!fs.existsSync(dir))
            res.send(JSON.stringify({ removed: false }));
        else {
            fs.rmdir(dir, (err) => {
                if (err) {
                    var currentUser = user;
    
                    removeUsername('./users/users.json', currentUser);
                    removeUserDirectory(option, user, res);
                }   
            });
        }
    }
}

function removeChildren(children) {
    for (var i = 0; i < children.length; i++) {
        if (fs.existsSync(`./classes/${children[i].studentClass}/${children[i].studentName}`)) {
            const files = fs.readdirSync(`./classes/${children[i].studentClass}/${children[i].studentName}`);
    
            for (var j = 0; j < files.length; j++) {
                fs.unlink(`./classes/${children[i].studentClass}/${children[i].studentName}/${files[j]}`, (err) => {
                    if (err)
                        throw new Error(`${files[j]} could not be removed.`);
                });
            }
    
            fs.rmdir(`./classes/${children[i].studentClass}/${children[i].studentName}`, (err) => {
                if (err)
                    removeChildren(children);
            });            
        }

        removeName('./classes/students.json', children[i].studentName, 'student');
    }
}

function removeResults(children) {

}

function removeName(dir, item, type) {
    fs.readFile(dir, (err, content) => {
        if (err)
            throw new Error(`Failed to read ${dir}.`);
        const fileContent = JSON.parse(content);
        var updatedContent = [];

        if (type === 'user')
            updatedContent = fileContent.filter(user => user.username !== item);
        else if (type === 'student')
            updatedContent = fileContent.filter(student => student.studentName !== item);
        else
            return;

        fs.writeFile(dir, JSON.stringify(updatedContent, null, '\t'), (err) => {
            if (err)
                throw new Error(`Failed to updated ${dir}.`);
        });
    });
}

function removeUser(req, res) {
    const {username, option } = req.body;
    
    removeName('./users/users.json', username, 'user');
    removeUserDirectory(option, username, res);

    if (option === 'parent') {
        fs.readFile('./classes/students.json', (err, content) => {
            if (err)
                throw new Error('Could not read the students.json file');
            const classStudents = JSON.parse(content);
            const currentStudents = classStudents.filter(student => student.parentName === username);

            removeChildren(currentStudents);
        })
    }

    res.send(JSON.stringify({ removed: true }));
}

module.exports = { removeUser };