
const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const generateCalendar = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = daysInMonth(year, month);

  const calendar = [];

  // Add empty placeholders for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    calendar.push('');
  }

  // Add days of the month
  for (let day = 1; day <= totalDays; day++) {
    calendar.push(day);
  }

  return calendar;
};

const showCustomCalendarPicker = async () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const { value: selectedDate } = await Swal.fire({
    title: 'Select Date',
    html: '<div id="custom-calendar"></div>',
    showCancelButton: true,
    didOpen: () => {
      const calendarContainer = document.getElementById('custom-calendar');
      const calendar = generateCalendar(currentYear, currentMonth);

      calendar.forEach((day) => {
        const button = document.createElement('button');
        button.textContent = day;
        button.addEventListener('click', () => {
          const selectedDay = day < 10 ? `0${day}` : day;
          const selectedMonth = currentMonth + 1 < 10 ? `0${currentMonth + 1}` : currentMonth + 1;
          const selectedYear = currentYear;
          const selectedDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;

          Swal.close();
          Swal.fire('Selected Date', selectedDate);
        });

        calendarContainer.appendChild(button);
      });
    },
  });

  if (selectedDate) {
    Swal.fire('Selected Date', selectedDate);
  }
};

// Trigger the custom calendar picker
//showCustomCalendarPicker();
document.getElementById('date').addEventListener('click', showCustomCalendarPicker);
