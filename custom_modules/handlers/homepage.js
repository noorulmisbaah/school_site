const fs = require('fs');

function retrieveInfo(res) {
    const classes = fs.readdirSync('./classes');
    const teachers = fs.readdirSync('./users/staff');
    var allClasses = [];

    for (var i = 0; i < (classes.length - 1); i++)
        allClasses[i] = classes[i];
    
    res.render('index', { teachers, allClasses });
}

module.exports = { retrieveInfo };