const fs = require('fs');

function removeStudent(req, res) {
    const { studentName, studentClass, studentParent } = req.body;
    
    if (!fs.existsSync(`./classes/${studentClass}/${studentName}`))
        res.send({ exists: false, text: 'Error! The student is not found in the class' });
    else if (!fs.existsSync(`./users/parent/${studentParent}`)) {
        res.send({ exists: false, text: 'Error! Parent not found.'})
    } else {
        const files = fs.readdirSync(`./classes/${studentClass}/${studentName}`);
        
        for (var i = 0; i < files.length; i++)
            fs.unlink(`./classes/${studentClass}/${studentName}/${files[i]}`, (err) => {
                if (err)
                    throw new Error(`Failed to delete ${files[i]}`);
            });
           
        fs.rmdir(`./classes/${studentClass}/${studentName}`, (err) => {
            if (err)
                throw new Error('Failed to remove the student directory from the class.');
        });

        fs.readFile(`./users/parent/${studentParent}/children.json`, (err, content) => {
            if (err)
                throw new Error('Failed to read the children.json file.');
            const children = JSON.parse(content);
            const updatedChildrenArray = children.filter(child => child.studentName !== studentName);

            fs.writeFile(`./users/parent/${studentParent}/children.json`, JSON.stringify(
                updatedChildrenArray, null, '\t'), (err) => {
                    if (err)
                        throw new Error('Failed to update the children.json file.');
                    res.send({ exists: true, text: `Success! ${studentName.toUpperCase()} has been removed from ${studentClass} successfully.`})
            });
        });

        fs.readFile('./classes/students.json', (err, content) => {
            if (err)
                throw new Error('Error reading the students.json file.');
            const allStudents = JSON.parse(content);
            const updatedStudents = allStudents.filter(student => studentName !== student.studentName);

            fs.writeFile('./classes/students.json', JSON.stringify(updatedStudents, null, '\t'), (err) => {
                if (err)
                    throw new Error('There was an error while updating the students.json file.');
            });
        });
    }
}

module.exports = { removeStudent };