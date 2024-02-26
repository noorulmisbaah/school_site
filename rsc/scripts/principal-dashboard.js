function displayUserInformation() {
    currentUser = allUsers.filter(user => user.username === allUsersField.value.toLowerCase());

    usernameText.innerText = currentUser[0].username;
    passwordText.innerText = currentUser[0].password;
    phoneText.innerText = currentUser[0].number;
    emailText.innerText = currentUser[0].email;
}

const radioButtons = document.querySelectorAll('input[type="radio"]');
const recipientField = document.querySelector('[recipient-field]');
const messageTextArea = document.querySelector('textarea');
const sendButton = document.querySelector('[send-message]');
const studentNameField = document.querySelector('[student-name]');
const studentClassField = document.querySelector('[student-class]');
const studentParentField = document.querySelector('[student-parent]');
const removeStudentButton = document.querySelector('[remove-student]');
const viewCalendarButton = document.querySelector('[view-calendar]');
const usernameField = document.querySelector('[username]');
const options = document.querySelector('[options]');
const removeUserButton = document.querySelector('[remove-user]');
const calendarLink = document.createElement('a');
const allUsersField = document.getElementById('all-users-field');
const usernameText = document.querySelector('.username-text');
const passwordText = document.querySelector('.password-text');
const emailText = document.querySelector('.email-text');
const phoneText = document.querySelector('.phone-text');
const allUsers = JSON.parse(document.querySelector('[all-users-json]').innerHTML); 
const allStudentsField = document.getElementById('students-list-field');

var type;
var selected;
var currentUser;

displayUserInformation();
displayStudentsInformation();

calendarLink.target = '_blank';
calendarLink.href = 'calendars/CALENDAR FOR FIRST TERM (STAFF).pdf';
viewCalendarButton.addEventListener('click', () => {
    calendarLink.click();
});

radioButtons.forEach(button => {
    button.addEventListener('click', (arg) => {
        type = arg.target.value.toLowerCase();
        selected = true;
    });
});

if (allStudentsField) {
    allStudentsField.addEventListener('change', () => {
        displayStudentsInformation();
    });
}

allUsersField.addEventListener('change', () => {
    displayUserInformation();
});

sendButton.addEventListener('click', () => {
    const recipientName = recipientField.value.toLowerCase();
    const message = messageTextArea.value;

    if ((!message) || (!selected) || (!recipientName))
        showNotificationBox('Field(s) Empty', 'All fields are required. You need to fill them all and select who will recieve the message.');
    else {
        sendButton.style.pointerEvents = 'none';
        
        fetch('message', {
            method: 'POST',
            body: JSON.stringify({ recipientName, type, message }),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        }).then(res => res.json()).then(({ sent }) => {
            if (!sent)
                showNotificationBox('Recepient Unavailable', 'The message was not sent because the recipient could not be found. Check the fields you filled and the option you selected and ensure the information are correct.');
            else
                showNotificationBox('Message Sent', 'The message was sent successfully.');
            sendButton.style.pointerEvents = 'all';
        })
        .catch(err => { showNotificationBox('Sending Error', 'The message was not sent because your internet connection may be down. Check your internet connection and try again.') });
    }  
});

removeStudentButton.addEventListener('click', () => {
    const studentName = studentNameField.value.toLowerCase();
    const studentClass = studentClassField.value;
    const studentParent = studentParentField.value.toLowerCase();

    if ((!studentName) || (!studentParent))
        showNotificationBox('Invalid Data', 'All fields are required.');
    else {
        removeStudentButton.style.pointerEvents = 'none';
        fetch('remove_student', {
            method: 'POST',
            body: JSON.stringify({ studentName, studentClass, studentParent }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()).then(({ exists, text }) => {
            if (!exists)
                showNotificationBox('Not Found', 'The operation failed because the student with the information you provided does not exist. Check the information and try again.');
            else 
                showNotificationBox('Removal Successful', text);
        }).catch(err => showNotificationBox('Operation Error', 'Looks like you are not connected to the internet. Check your internet connection and try again.'));
        removeStudentButton.style.pointerEvents = 'all';
    }
});

removeUserButton.addEventListener('click', () => {
    const username = usernameField.value.toLowerCase();
    const option = options.value.toLowerCase();

    removeUserButton.style.pointerEvents = 'none';

    if ((!username))
        showNotificationBox('Username Missing', 'The username is missing. Ensure that you provide it.')
    else {
        fetch('remove_user', {
            method: 'POST',
            body: JSON.stringify({ username, option }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()).then(({ removed }) => {
            if (!removed)
                showNotificationBox('Removal Failed', 'The removal was not successful because the user with the information you provided could not be found. Check the information and try again.');
            else if (removed)
                showNotificationBox('Removal Successful', 'The user has been removed successfully. If the user has children, all the children have been removed, too.');
            else
                showNotificationBox('Unknown Error', 'An unknown error prevented the operation from proceeding. Try again.');
        }).catch(() => showNotificationBox('Network Error', 'Looks like you are connected to the internet. Check your internet connection and try again.'));
    }

    removeUserButton.style.pointerEvents = 'all';
});