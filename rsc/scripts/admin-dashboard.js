const sendMessageButton = document.querySelector('[send-message]');
const messageBox = document.querySelector('textarea');
const user = document.querySelector('[user]');
const recipientField = document.querySelector('[recipient-field]');
const radioButtons = document.querySelectorAll('input[type="radio"]');
const allStudentsField = document.getElementById('students-list-field');

var type;
var selected;

displayStudentsInformation();

if (allStudentsField) {
    allStudentsField.addEventListener('change', () => {
        displayStudentsInformation();
    });
}

radioButtons.forEach(button => {
    button.addEventListener('click', (arg) => {
        type = arg.target.value;
        selected = true;
    });
});

sendMessageButton.addEventListener('click', () => {
    const message = messageBox.value;
    const recipientName = recipientField.value.toLowerCase();
    
    if ((!message) || (!selected) || (!recipientName))
        showNotificationBox('Field(s) Empty', 'All fields are required. You need to fill them all and select who will recieve your message.');
    else {
        sendMessageButton.style.pointerEvents = 'none';
        
        fetch('message', {
            method: 'POST',
            body: JSON.stringify({ recipientName, type, message }),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        }).then(res => res.json()).then(({ sent }) => {
            if (!sent)
                showNotificationBox('Recepient Unavailable', 'The message was not sent because the recipient could not be found. Check the fields you filled and the option you selected and ensure the information are correct.');
            else
                showNotificationBox('Message Sent', 'The message was sent successfully.');
            sendMessageButton.style.pointerEvents = 'all';
        })
        .catch(() => { showNotificationBox('Sending Error', 'The message was not sent because your internet connection may be down. Check your internet connection and try again.') });
    }
})