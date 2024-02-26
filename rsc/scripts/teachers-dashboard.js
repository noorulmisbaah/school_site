const calendarLink = document.createElement('a');
const viewCalendarButton = document.querySelector('[view-calendar]');

calendarLink.target = '_blank';
calendarLink.href = 'calendars/CALENDAR FOR FIRST TERM (STAFF).pdf';
viewCalendarButton.addEventListener('click', () => {
    calendarLink.click();
});
