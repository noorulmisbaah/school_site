function makeSchoolFeesPayment() {
    const studentName = studentNameField.value.toLowerCase();
    const amountPaid = amountFieldField.value;
    const studentClass = studentClassOptions.value;

    paymentButton.style.pointerEvents = 'none';

    if ((!studentName) || (!amountPaid) || (!studentClass) || (!paymentSelected))
        showNotificationBox('Invalid Data', 'All fields are required. You need to fill them all and select the payment mode.');
    else {
        fetch('payment', {
            method: 'POST',
            body: JSON.stringify({ studentName, studentClass, amountPaid, paymentChoice }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()).then(({ submitted }) => {
            if (submitted)
                showNotificationBox('Payment Updated', 'The payment has been updated successfully.');
            else
                showNotificationBox('Update Failed', 'The payment is not updated. Check the information you provided and try again.');
        })
        .catch(err => showNotificationBox('Error', 'Something went wrong--probably the internet connection or an error.'));
    }

    paymentButton.style.pointerEvents = 'all';
}

function submitTransaction() {
    const purpose = purposeField.value;
    const academicSession = sessionField.value;
    const academicTerm = termField.value;
    const amount = amountField.value;

    submitTransactionButton.style.pointerEvents = 'none';

    if (!transactionSelected || !amount || !purpose)
        showNotificationBox('Invalid Data', 'Looks like some fields are empty or the transaction mode is not selected. You need to fill them all and select the transaction mode. They are all required.');
    else {
        fetch('make_transaction', {
            body: JSON.stringify({ academicSession, academicTerm, purpose, amount, transactionMode }),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()).then(({ made }) => {
            if (made)
                showNotificationBox('Submission Successful', 'The transaction has been submitted successfully.');
            else
                showNotificationBox('Submission Failed', 'The submission was not successful. Try again.');
        }).catch(err => showNotificationBox('Error', 'Something went wrong--probably the internet connection or an error.'));
    }

    submitTransactionButton.style.pointerEvents = 'all';
}

function displayTranstionDetails(data) {
    const transactionPreviewTable = document.getElementById('preview-transaction-table');
    const transactionTable = document.getElementById('transaction-table');
    const transactionTitle = document.getElementById('transaction-title');

    transactionTable.removeAttribute('hidden');
    transactionTitle.innerText = `Financial Records for ${academicTermFetchField.value} ${academicSessionFetchField.value} Academic Session`;
    transactionPreviewTable.innerHTML = data.map(row => {
        return `
            <tr>
                <td> ${row.date} </td>
                <td> ${row.transactionMode} </td>
                <td> ${row.purpose} </td>
                <td> ${row.academicSession} </td>
                <td> ${row.academicTerm} </td>
                <td> ${Number(row.amount).toLocaleString()} </td>
            </tr>
        `}).join('');
}

function retrieveTransactionDetails() {
    const academicTerm = academicTermFetchField.value;
    const academicSession = academicSessionFetchField.value;

    fetchTransactionButton.style.pointerEvents = 'none';

    fetch('fetch_transaction', {
        body: JSON.stringify({ academicSession, academicTerm }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json'}
    }).then(res => res.json()).then(({ fetched, data }) => {
        if (fetched)
            displayTranstionDetails(data);
        else
            showNotificationBox('Fetch Failed', `The transaction details for ${academicTerm.toLowerCase()} ${academicSession} session could not be fetched. It may not be available.`)
    })//.catch(err => showNotificationBox('Error', 'Something went wrong--probably the internet connection or an error.'));

    fetchTransactionButton.style.pointerEvents = 'all';
}

const studentNameField = document.querySelector('[student-name]');
const amountFieldField = document.querySelector('[payment-amount]');
const studentClassOptions = document.querySelector('[student-class]');
const paymentRadioButtons = document.querySelectorAll('input[name="payment-mode"]');
const transactionRadioButtons = document.querySelectorAll('input[name="transaction-mode"]');
const submitTransactionButton = document.querySelector('.submit');
const paymentButton = document.querySelector('[make-payment]');
const viewCalendarButton = document.querySelector('[view-calendar]');
const purposeField = document.getElementById('purpose-field');
const sessionField = document.getElementById('session-field');
const termField = document.getElementById('term-field');
const amountField = document.getElementById('amount-field');
const academicSessionFetchField = document.getElementById('academic-session-fetch-field');
const academicTermFetchField = document.getElementById('academic-term-fetch-field');
const fetchTransactionButton = document.getElementById('fetch-record');
const calendarLink = document.createElement('a');

var paymentSelected;
var transactionSelected;
var transactionMode;
var paymentChoice;

calendarLink.target = '_blank';
calendarLink.href = 'calendars/CALENDAR FOR FIRST TERM (STAFF).pdf';
viewCalendarButton.addEventListener('click', () => {
    calendarLink.click();
});

paymentRadioButtons.forEach(radioButton => {
    radioButton.addEventListener('click', (arg) => {
        paymentChoice = arg.target.value;
        paymentSelected = true;
    });
});

transactionRadioButtons.forEach(radioButton => {
    radioButton.addEventListener('click', (arg) => {
        transactionMode = arg.target.value;
        transactionSelected = true;
    });
});

paymentButton.addEventListener('click', () => {
    makeSchoolFeesPayment();
});

submitTransactionButton.addEventListener('click', () => {
    submitTransaction();
});

fetchTransactionButton.addEventListener('click', () => {
    retrieveTransactionDetails();
});
