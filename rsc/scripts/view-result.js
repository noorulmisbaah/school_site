function retrieveResult() {
    const studentName = nameOfStudentField.value.toLowerCase();
    const examinationYear = yearOfExaminationField.value;
    const examinationTerm = termOfExaminationField.value;

    fetch('view_results', {
        method: 'POST',
        body: JSON.stringify({ studentName, examinationYear, examinationTerm }),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(({ obtained, resultData }) => {
        if (!obtained)
        showNotificationBox('Fetch Failed', 'The result with the information you provided does not exist. Contact the school head to ensure that the result has been uploaded.')
        else {
            displayInformation(resultData);
            resultInformation = resultData;
        }
    }).catch(err => showNotificationBox('Error', 'Your internet connection may be down. Check the connection and try again.'));
}

function displayInformation(data) {
    nameOfStudentText.textContent = data.studentName.toUpperCase();
    yearOfExaminationText.textContent = data.examinationYear;
    termOfExaminationText.textContent = data.examinationTerm;
    examinationTotalText.textContent = data.total;
    examinationAverageText.textContent = data.average;
    resultView.style.display = 'block';
    resultViewTable.innerHTML = data.selectedSubjects.map((subject, index) => {
        return `
            <tr>
                <td>${subject}</td>
                <td>${data.testScores[index]}</td>
                <td>${data.examScores[index]}</td>
                <td>${data.totalScores[index]}</td>
                <td>${data.grades[index]}</td>
            </tr>`
    }).join('');
}

const retrieveResultButton = document.querySelector('[retrieve-result]');
const resultView = document.querySelector('.result-view');
const resultViewTable = document.querySelector('[result-view-table]');
const nameOfStudentText = document.querySelector('[name-of-student]');
const yearOfExaminationText = document.querySelector('[year-of-examination]');
const termOfExaminationText = document.querySelector('[term-of-examination]');
const examinationAverageText = document.querySelector('[examination-average]');
const examinationTotalText = document.querySelector('[examination-total]');
const nameOfStudentField = document.getElementById('student-name-field');
const yearOfExaminationField = document.getElementById('year-of-exam');
const termOfExaminationField = document.getElementById('term-of-exam');
var resultInformation = [];

retrieveResultButton.addEventListener('click', () => {
    retrieveResultButton.style.pointerEvents = 'none';
    retrieveResult();
    retrieveResultButton.style.pointerEvents = 'all';
});