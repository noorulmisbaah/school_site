const fs = require('fs');

function makePayment(req, res) {
    const { studentName, studentClass, amountPaid, paymentChoice } = req.body;
    
    fs.readFile(`./classes/${studentClass}/${studentName}/student_information.json`, (err, content) => {
        if (err)
            res.send(JSON.stringify({ submitted: false }));
        else {
            const studentInformation = JSON.parse(content);
            const studentParent = studentInformation.parentName;
            
            fs.readFile(`./users/parent/${studentParent}/children.json`, (err, content) => {
                if (err)
                    throw new Error('Failed to read the children.json file.');
                else {
                    const children = JSON.parse(content);
                    const child = children.filter(child => child.studentName === studentName);

                    if (child.length < 1)
                        res.send(JSON.stringify({ submitted: false }));
                    else {
                        child[0].paymentMade = amountPaid;
                        child[0].payment = paymentChoice;
                        
                        fs.writeFile(`./users/parent/${studentParent}/children.json`, JSON.stringify(
                            children, null, '\t'), (err) => {
                            if (err)
                                throw new Error('Failed to update the children.json.');
                            else
                                res.send(JSON.stringify({ submitted: true }));
                        });
                    }
                }
            });
        }
    });
}

module.exports = { makePayment };