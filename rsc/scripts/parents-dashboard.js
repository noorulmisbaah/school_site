const viewCalendarButton = document.querySelector('[view-calendar]');
const calendarLink = document.createElement('a');

calendarLink.target = '_blank';
calendarLink.href = 'calendars/CALENDAR FOR FIRST TERM.pdf';
viewCalendarButton.addEventListener('click', () => {
    calendarLink.click();
});