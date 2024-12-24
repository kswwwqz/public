const currentMonthElement = document.getElementById('current-month');
const daysGridElement = document.getElementById('days-grid');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');
const bookingModal = document.getElementById('booking-modal');
const closeModal = document.getElementById('close-booking-modal');
const selectedDateParagraph = document.getElementById('selected-date');
const bookingForm = document.getElementById('booking-form');
const authModal = document.getElementById('auth-modal');
const closeAuthModal = document.getElementById('close-auth-modal');
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');
const authForm = document.getElementById('auth-form');
const authError = document.getElementById('auth-error');
const adminPanel = document.getElementById('admin-panel');
const addDoctorBtn = document.getElementById('add-doctor-btn');
const addDoctorModal = document.getElementById('add-doctor-modal');
const closeAddDoctorModal = document.getElementById('close-add-doctor-modal');
const addDoctorForm = document.getElementById('add-doctor-form');
const doctorsList = document.getElementById('doctors-list');
const addScheduleModal = document.getElementById('add-schedule-modal');
const closeAddScheduleModal = document.getElementById('close-add-schedule-modal');
const addScheduleForm = document.getElementById('add-schedule-form');
const selectedDateSchedule = document.getElementById('selected-date-schedule');
const doctorSelect = document.getElementById('doctor-select');
const timeSlotSelect = document.getElementById('time-slot');


let currentDate = new Date();
let selectedDate = null;
let isLoggedIn = false;
let doctors = [
  {id: 1, name: 'Доктор 1', specialization: 'Специализация 1', phone: '+11111', description: 'Описание 1'},
    {id: 2, name: 'Доктор 2', specialization: 'Специализация 2', phone: '+22222', description: 'Описание 2'}

]
let timeSlots = {};


function generateCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const dayOfWeek = firstDayOfMonth.getDay() === 0 ? 7 : firstDayOfMonth.getDay();

    currentMonthElement.textContent = new Intl.DateTimeFormat('ru-RU', { month: 'long', year: 'numeric' }).format(currentDate);
    daysGridElement.innerHTML = '';

    for (let i = 1; i < dayOfWeek; i++) {
        daysGridElement.innerHTML += '<div class="day"></div>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        dayElement.classList.add('day');

        if(new Date(year, month, day) < new Date()){
          dayElement.classList.add('past-day');
        }
         else {
           dayElement.addEventListener('click', () => {
             selectedDate = new Date(year, month, day);
             selectedDateParagraph.textContent =  new Intl.DateTimeFormat('ru-RU', {
               day: 'numeric',
               month: 'long',
               year: 'numeric',
               }).format(selectedDate);
               selectedDateSchedule.textContent =  new Intl.DateTimeFormat('ru-RU', {
                 day: 'numeric',
                 month: 'long',
                 year: 'numeric',
               }).format(selectedDate);
              loadTimeSlots(selectedDate);
             bookingModal.style.display = 'flex';
             if(isLoggedIn) {
                addScheduleModal.style.display = 'flex';
             }

           });
         }

        daysGridElement.appendChild(dayElement);
    }

}
function updateAuthUI(loggedIn) {
  if(loggedIn) {
    loginButton.style.display = 'none';
    logoutButton.style.display = 'inline-block';
    adminPanel.style.display = 'block';
  }
  else {
    loginButton.style.display = 'inline-block';
    logoutButton.style.display = 'none';
    adminPanel.style.display = 'none';
  }
}

function loadDoctors() {
        doctorsList.innerHTML = '';
        doctorSelect.innerHTML = '';

           doctors.forEach(doctor => {
             doctorsList.innerHTML += `<li>${doctor.name} (${doctor.specialization})</li>`
               doctorSelect.innerHTML += `<option value="${doctor.id}">${doctor.name}</option>`
           })
}

function loadTimeSlots(date) {
   const formattedDate = date.toISOString().split('T')[0];
     timeSlotSelect.innerHTML = '';
    if (timeSlots[formattedDate]) {
      timeSlots[formattedDate].forEach(time => {
        timeSlotSelect.innerHTML += `<option value="${time}">${time}</option>`
      })
    }

}

prevMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar();
});

nextMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar();
});

closeModal.addEventListener('click', () => {
    bookingModal.style.display = 'none';
    addScheduleModal.style.display = 'none'

});
closeAuthModal.addEventListener('click', () => {
   authModal.style.display = 'none';
   authError.style.display = 'none';
});
closeAddDoctorModal.addEventListener('click', () => {
    addDoctorModal.style.display = 'none';
});
closeAddScheduleModal.addEventListener('click', () => {
    addScheduleModal.style.display = 'none'
});

loginButton.addEventListener('click', () => {
  authModal.style.display = 'flex'
});
logoutButton.addEventListener('click', () => {
  isLoggedIn = false;
  updateAuthUI(false);
});

authForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const loginInput = document.getElementById('login-input').value;
  const passwordInput = document.getElementById('password-input').value;
  if (loginInput === 'admin' && passwordInput === 'admin') {
    isLoggedIn = true;
     authModal.style.display = 'none';
     authError.style.display = 'none';
    updateAuthUI(true);
      loadDoctors();
  }
  else {
    authError.style.display = 'block';
  }

});

addDoctorBtn.addEventListener('click', () => {
   addDoctorModal.style.display = 'flex';
});
addDoctorForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const doctorNameInput = document.getElementById('doctor-name-input').value;
  const doctorSpecializationInput = document.getElementById('doctor-specialization-input').value;
  const doctorPhoneInput = document.getElementById('doctor-phone-input').value;
  const doctorDescriptionInput = document.getElementById('doctor-description-input').value;

  const newDoctor = {
    id: doctors.length + 1,
    name: doctorNameInput,
    specialization: doctorSpecializationInput,
      phone: doctorPhoneInput,
      description: doctorDescriptionInput
  }
  doctors.push(newDoctor)
   addDoctorModal.style.display = 'none';
    loadDoctors();
});

addScheduleForm.addEventListener('submit', (event) => {
  event.preventDefault();
 const doctorSelectValue = document.getElementById('doctor-select').value;
  const timeSlotInput = document.getElementById('time-slot-input').value;
  const formattedDate = selectedDate.toISOString().split('T')[0];
    if (!timeSlots[formattedDate]) {
      timeSlots[formattedDate] = [];
    }
    timeSlots[formattedDate].push(timeSlotInput)
    addScheduleModal.style.display = 'none';
    loadTimeSlots(selectedDate);
});

bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
   const patientName = document.getElementById('patient-name').value;
   const patientPhone = document.getElementById('patient-phone').value;
   const timeSlot = document.getElementById('time-slot').value;
   alert(`Записано на прием:\nДата: ${new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    }).format(selectedDate)} \nИмя: ${patientName}, \nТелефон: ${patientPhone}\nВремя: ${timeSlot}`);
    bookingModal.style.display = 'none';
});

generateCalendar();
updateAuthUI(false);