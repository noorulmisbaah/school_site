function displayStudentsInformation() {
    try {
        const allStudents = JSON.parse(document.querySelector('[all-students-json]').innerHTML);
        const studentName = document.querySelector('.student-name-text');
        const studentParent = document.querySelector('.student-parent-text');
        const studentClass = document.querySelector('.student-class-text');
        const studentAdmissionDate = document.querySelector('.student-admission-date-text');
        const currentStudent = allStudents.filter(student => student.studentName === allStudentsField.value.toLowerCase());

        studentName.innerText = currentStudent[0].studentName;
        studentParent.innerText = currentStudent[0].parentName;
        studentClass.innerText = currentStudent[0].studentClass;
        studentAdmissionDate.innerText = currentStudent[0].admissionDate;

    } catch(e) {
       
    }
}