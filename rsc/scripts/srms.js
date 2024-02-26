function extractSelectedSubjects(checkboxesContainer) {
    var tempSubjects = []
    for (var i = 0; i < checkboxesContainer.length; i++) {
        if (checkboxesContainer[i].checked)
            tempSubjects[i] = checkboxesLabels[i].innerText;
    }
    selectedSubjects = tempSubjects.filter(subject => subject !== undefined);
    
    if (selectedSubjects.length < 5)
        showNotificationBox('Low Subjects', 'When you click the select button, the number of the selected subjects is checked. This is ensure that the required minimum number of subjects is selected. You need to select a minimum of 5 subjects.');
    else {
        subjectScoresTable.style.display = 'block';
        insertTableContent(selectedSubjects);
    }
}

function insertTableContent(subjects) {
    scoresTableBody.innerHTML = subjects.map(subject => {
        return `
            <tr>
                <td>${subject}</td>
                <td><input min="0" max="40" type="number" placeholder="CA score for ${subject}" ca></td>
                <td><input min="0" max="60" type="number" placeholder="Exam score for ${subject}" exam></td>
            </tr>`
    }).join('');
}

function calculateScores() {
    const testScoresFields = document.querySelectorAll('[ca]');
    const examScoresFields = document.querySelectorAll('[exam]');

    total = 0;
    average = 0;
    grades = [];
    
    for (var i = 0; i < testScoresFields.length; i++) {
        testScores[i] = Number(testScoresFields[i].value);
        examScores[i] = Number(examScoresFields[i].value);
        totalScores[i] = testScores[i] + examScores[i];
    }

    for (var i = 0; i < totalScores.length; i++) {
        total += totalScores[i];
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

    average = total / totalScores.length;
}

function previewResult() {
    studentNameText.textContent = studentName;
    examinationYearText.textContent = examinationYear;
    totalScoreText.textContent = total;
    averageText.textContent = average;
    resultPreview.style.display = 'block';
    previewTableBody.innerHTML = selectedSubjects.map((subject, index) => {
        return `
            <tr>
                <td>${subject}</td>
                <td>${testScores[index]}</td>
                <td>${examScores[index]}</td>
                <td>${totalScores[index]}</td>
                <td>${grades[index]}</td>
            </tr>`
    }).join('');
}

const navigationSide = document.querySelector('.navigations-side');
const unhideNavigationSideIcon = document.querySelector('.unhide-navigation-icon');
const hideNavigationSideIcon = document.querySelector('.hide-navigation-icon');
const sideNavigationLinks = document.querySelectorAll('.side-link');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const checkboxesLabels = document.querySelectorAll('[subject]');
const selectSubjectsButton = document.querySelector('[select-subjects]');
const scoresTableBody = document.querySelector('[scores-table-body]');
const previewTableBody = document.querySelector('[preview-table-body]');
const subjectScoresTable = document.querySelector('.subjects-scores-table');
const processResultButton = document.querySelector('[process-result]');
const resultPreview = document.querySelector('.result-preview');
const studentNameText = document.querySelector('[student-name-text]');
const examinationYearText = document.querySelector('[examination-year-text]');
const totalScoreText = document.querySelector('[total-score-text]');
const averageText = document.querySelector('[average-text]');
const uploadResultButton = document.querySelector('[upload-result]');
const studentNameField = document.getElementById('student-name');
const examinationYearField = document.getElementById('examination-year');
const examinationTermField = document.getElementById('examination-term');
const sideLinks = document.querySelectorAll('.side-link');
const informations = document.querySelectorAll('.information');
const navigationsSide = document.querySelector('.navigations-side');
const closeInformationIcons = document.querySelectorAll('.close-information');

var isSideOpen = false;
var studentName;
var examinationYear;
var examinationTerm;
var average;
var total = 0;
var selectedSubjects = [];
var testScores = [];
var examScores = [];
var totalScores = [];
var grades = [];

sideLinks.forEach((link, index) => {
    link.addEventListener('click', () => {
        informations[index].style.display = 'block';
        navigationsSide.style.left = '-100rem';
        isNagivationsSideOpen = false;
    });
});

uploadResultButton.addEventListener('click', () => {
    uploadResultButton.style.pointerEvents = 'none';
    studentName = studentNameField.value;
    examinationYear = examinationYearField.value;
    examinationTerm = examinationTermField.value;
    
    if (!studentName)
        showNotificationBox('Student Name Missing', 'The student name field is empty. Provide the name of the student because it is required to continue with the result processing.');
    else
        fetch('result_upload', {
            body: JSON.stringify({ 
                studentName: studentName.toLowerCase(), 
                selectedSubjects,
                examinationYear, 
                examinationTerm,
                totalScores,
                testScores,
                examScores,
                average,
                grades,
                total
             }),
            method: 'POST',
            headers: { 'Content-Type': 'application/json'}
        }).then(res => res.json()).then(({ found, exists, uploaded }) => {
            if (uploaded)
                showNotificationBox('Uploaded Successfully', 'The result has been successfully uploaded. You can update it if you need to make changes to it.');
            else if (exists)
                showNotificationBox('Upload Failed', "Upload failed because a result with the same name already exists. There can't be more than one result with the same name. Instead, update the result for the student.");   
            else if (!found)
                showNotificationBox('Upload Failed', 'Upload failed because the student is not registered. You can only upload the results of registered students. Otherwise, check the student\'s name that you entered.');
        }).catch(err => showNotificationBox('Upload Error', `The result upload returned with the error: ${err}`));
    uploadResultButton.style.pointerEvents = 'all';
});

processResultButton.addEventListener('click', () => {
    studentName = studentNameField.value;
    examinationYear = examinationYearField.value;
    examinationTerm = examinationTermField.value;

    if (!studentName)
        showNotificationBox('Student Name Missing', 'The student name field is empty. Provide the name of the student because it is required to continue with the result processing.');
    else if (selectedSubjects.length < 5)
        showNotificationBox('Low Subjects', 'When you click on the select button, the number of the selected subjects is checked. This is ensure that the required minimum number of subjects is selected. You need to select a minimum of 5 subjects.');
    else {
        calculateScores();
        if (testScores.some(score => score > 40 || score < 0) || examScores.some(score => score > 60 || score < 0)) {
            showNotificationBox('Out of Range', 'When you click the process button, the scores you entered are validated. All scores must not be less than 0. Furthermore, CA scores should not exceed 40 and exam scores should not exceed 60.');
            return;
        }
        previewResult();
    }
});

selectSubjectsButton.addEventListener('click', () => {
    extractSelectedSubjects(checkboxes);
});

unhideNavigationSideIcon.addEventListener('click', () => {
    navigationSide.style.left = '0';
    isSideOpen = true;
});

hideNavigationSideIcon.addEventListener('click', () => {
    navigationSide.style.left = '-40rem';
    isSideOpen = false;
});

sideNavigationLinks.forEach(link => {
    link.addEventListener('click', () => {
        navigationSide.style.left = '-40rem';
        isSideOpen = false;
    });
});

closeInformationIcons.forEach((icon, index) => {
    icon.addEventListener('click', () => {
        informations[index].style.display = 'none';
    });
});

document.addEventListener('click', () => {
    if (isSideOpen) {
        navigationSide.style.left = '0';
        isSideOpen = false;
    } else 
    navigationSide.style.left = '-100rem';
});