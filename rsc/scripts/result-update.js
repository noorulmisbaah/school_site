function fetchResult() {
    const studentName = nameField.value.toLowerCase();
    const examinationYear = yearField.value;
    const examinationTerm = termField.value;
    
    fetch('result_fetch', {
        method: 'POST',
        body: JSON.stringify({ studentName, examinationYear, examinationTerm }),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(({ found, resultData }) => {
        if (!found)
            showNotificationBox('Not Found', 'The examination result fetch requires the name of the student, the examination term, and the examination year in order to be successfuly. Ensure that you provide the correct information.');
        else {
            resultUpdate.style.display = 'block';
            resultDataValue = resultData;
            showResultData(resultData);
        }
    }).catch(err => showNotificationBox('Fetch Failed', 'Something went wrong and the operation did not complete successfully. This may be due to the internet connection.'));
}

function showResultData(data) {
    studentText.textContent = data.studentName.toUpperCase();
    yearText.textContent = data.examinationYear;
    termText.textContent = data.examinationTerm;

    updateTable.innerHTML = data.selectedSubjects.map((subject, index) => {
        return `
            <tr>
                <td>${subject}</td>
                <td><input type="number" class="edit-field test-field" readonly value="${data.testScores[index]}"><button class="edit-btn test-btn">Edit</button></td>
                <td><input type="number" class="edit-field exam-field" readonly value="${data.examScores[index]}"><button class="edit-btn exam-btn">Edit</button></td>
                <td>${data.totalScores[index]}</td>
                <td>${data.grades[index]}</td>
            </tr>`
    }).join('');
    totalText.textContent = data.total;
    averageTextValue.textContent = data.average;
    extractModificationTools();
}

function updateResultData(data) {
    updateTable.innerHTML = resultDataValue.selectedSubjects.map((subject, index) => {
        return `
            <tr>
                <td>${subject}</td>
                <td><input type="number" class="edit-field test-field" readonly value="${data.testScores[index]}"><button class="edit-btn test-btn">Edit</button></td>
                <td><input type="number" class="edit-field exam-field" readonly value="${data.examScores[index]}"><button class="edit-btn exam-btn">Edit</button></td>
                <td>${data.totalScores[index]}</td>
                <td>${data.grades[index]}</td>
            </tr>`
    }).join('');
    totalText.textContent = data.total;
    averageTextValue.textContent = data.average;
    extractModificationTools();
}

function extractModificationTools() {
    testFields = document.querySelectorAll('.test-field');
    examFields = document.querySelectorAll('.exam-field');
    editTestBtn = document.querySelectorAll('.test-btn');
    editExamBtn = document.querySelectorAll('.exam-btn');

    editTestBtn.forEach((button, index) => {
        button.addEventListener('click', () => {
            testFields[index].removeAttribute('readonly');
        });
    });

    editExamBtn.forEach((button, index) => {
        button.addEventListener('click', () => {
            examFields[index].removeAttribute('readonly');
        });
    });
}

function updateResultScores() {
    var testScores = [];
    var examScores = [];
    var totalScores = [];
    var grades = [];
    var total = 0;
    var average;

    for (var i = 0; i < testFields.length; i++) {
        testScores[i] = Number(testFields[i].value);
        examScores[i] = Number(examFields[i].value);
        totalScores[i] = testScores[i] + examScores[i];
    }

    if (testScores.some(score => score > 40 || score < 0) || examScores.some(score => score > 60 || score < 0)) {
        showNotificationBox('Out of Range', 'When you click the update button, the scores you entered are validated. All scores must not be less than 0. Furthermore, CA scores should not exceed 40 and exam scores should not exceed 60.');
        return;
    }

    for (var i = 0; i < totalScores.length; i++) {
        if (totalScores[i] >= 70)
            grades[i] = 'A';
        else if (totalScores[i] >= 60)
            grades[i] = 'B';
        else if (totalScores[i] >= 50)
            grades[i] = 'C';
        else
            grades[i] = 'F'
    }

    for (var i = 0; i < totalScores.length; i++) {
        total += totalScores[i];
    }

    average = total / totalScores.length;
    data = {
        totalScores,
        examScores,
        testScores,
        grades,
        total,
        average,
        studentName: resultDataValue.studentName,
        selectedSubjects: resultDataValue.selectedSubjects,
        examinationTerm: resultDataValue.examinationTerm,
        examinationYear: resultDataValue.examinationYear
    }
    updateResultData(data);
    uploadUpdatedResult(data);
}

function uploadUpdatedResult(data) {
    fetch('result_update', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(({ updated }) => {
        if (!updated)
            showNotificationBox('Update Failed', 'The result is not updated due to some errors from the server. Ensure that the information you provided are correct.');
        else
            showNotificationBox('Updated', 'The result has been updated successfully.');
    }).catch(err => showNotificationBox('Update Failed', 'Something went wrong and the operation did not complete successfully. This may be due to the internet connection.'));
}

const nameField = document.getElementById('name');
const yearField = document.getElementById('exam-year');
const termField = document.getElementById('exam-term');
const fetchResultButton = document.querySelector('[fetch-result]');
const updateResultButton = document.querySelector('[update-result]');
const resultUpdate = document.querySelector('.result-update');
const updateTable = document.querySelector('[update-table]');
const studentText = document.querySelector('.student-name-text');
const yearText = document.querySelector('.examination-year-text');
const termText = document.querySelector('.examination-term-text');
const totalText = document.querySelector('[total]');
const averageTextValue = document.querySelector('[average]');
var result;
var testFields;
var examFields;
var editTestBtn;
var editExamBtn;
var resultDataValue;
var data;

fetchResultButton.addEventListener('click', () => {
    fetchResultButton.style.pointerEvents = 'none';
    fetchResult();
    fetchResultButton.style.pointerEvents = 'all';

});

updateResultButton.addEventListener('click', () => {
    fetchResultButton.style.pointerEvents = 'none';
    updateResultScores();
    fetchResultButton.style.pointerEvents = 'all';
});