function deleteResult() {
    const studentName = candidateNameField.value.toLowerCase();
    const examinationYear = yearTakenField.value;
    const examinationTerm = termTakenField.value;

    fetch('delete_result', {
        method: 'DELETE',
        body: JSON.stringify({ studentName, examinationYear, examinationTerm }),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(({ deleted }) => {
        if (!deleted)
            showNotificationBox('Delete Failed', 'Failed to delete the result because the result does not exist.')
        else
            showNotificationBox('Deleted Successfully', `The ${examinationYear} ${examinationTerm} result of ${studentName.toUpperCase()} has been deleted successfully.`);
    }).catch((err) => showNotificationBox('Operation Failed', 'Unable to perform the operation.'));
}

const candidateNameField = document.getElementById('candidate-name');
const yearTakenField = document.getElementById('year-taken');
const termTakenField = document.getElementById('term-taken');
const deleteResultButton = document.querySelector('[delete-result]');

deleteResultButton.addEventListener('click', () => {
    deleteResultButton.style.pointerEvents = 'none';
    deleteResult();
    deleteResultButton.style.pointerEvents = 'all';
});