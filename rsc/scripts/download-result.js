function downloadResult(resultData) {
    var file = new jsPDF();

    createResultTable(resultData);
    file.addImage(transparentLogoURI, 10, 10, 50, 40);
    file.addImage(schoolAddressURI, 60, 10, 130, 40);
    file.setFont('Nunito-Bold')
    file.setFontSize(17);
    file.text('EXAMINATION RESULT', 80, 60);
    file.setFont('Nunito-Regular');
    file.setFontSize(13);
    file.text('Student name:', 10, 75);
    file.setFont('Nunito-Bold');
    file.text(`${resultData.studentName.toUpperCase()}`, 50, 75);
    file.setFont('Nunito-Regular');
    file.text('Examination term:', 10, 82);
    file.setFont('Nunito-Bold');
    file.text(`${resultData.examinationTerm}`, 50, 82);
    file.setFont('Nunito-Regular');
    file.text('Examination year:', 10, 89);
    file.setFont('Nunito-Bold');
    file.text(`${resultData.examinationYear}`, 50, 89);
    file.autoTable({
        head: tableHead,
        body: tableRows,
        startY: 100,
        styles: {
            font: 'Poppins-Regular',
            fontSize: 13
        },
        headStyles: {
            fillColor: [35, 128, 26],
            halign: 'center'
        },
        columnStyles: {
            0: {
                halign: 'left'
            },
            1: {
                halign: 'center'
            },
            2: {
                halign: 'center'
            },
            3: {
                halign: 'center'
            },
            4: {
                halign: 'center'
            }
        }
    });
    file.setFont('Nunito-Regular');
    file.text('Total score:', 10, 180);
    file.setFont('Nunito-Bold');
    file.text(`${resultData.total}`, 40, 180);
    file.setFont('Nunito-Regular');
    file.text('Average:', 10, 187);
    file.setFont('Nunito-Bold');
    file.text(`${resultData.average}`, 40, 187);
    file.save(`${resultData.examinationYear} ${resultData.examinationTerm} result for ${resultData.studentName.toUpperCase()}.pdf`);
}

var candidateResult;
var tableHead = [];
var tableRows = [];

function createResultTable({ selectedSubjects, testScores, examScores, totalScores, grades }) {
    tableHead =  [['Subjects', 'CA Scores', 'Examination Scores', 'Total Scores', 'Grades']];

    for (var i = 0; i < selectedSubjects.length; i++) {
        tableRows[i] = [selectedSubjects[i], testScores[i], examScores[i], totalScores[i], grades[i]]; 
    }
}

const downloadResultButton = document.querySelector('[download-result]');

downloadResultButton.addEventListener('click', () => {
    candidateResult = resultInformation;
    downloadResult(candidateResult);
});
