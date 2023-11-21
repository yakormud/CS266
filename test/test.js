const chai = require('chai');
const expect = chai.expect;
const { isValidDate, changeDate, submitDate } = require('../src/addDate'); // Import your functions

describe('Unit test: isValidDate', () => {
  it('should return false for a date in the future', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1); // One day in the future
    const isValid = isValidDate(futureDate.toISOString());
    expect(isValid).to.be.false;
  });

  it('should return true for a date exactly one year ago', () => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1); // Exactly one year ago
    const isValid = isValidDate(oneYearAgo.toISOString());
    expect(isValid).to.be.true;
  });

  it('should return false for a date more than one year ago', () => {
    const moreThanOneYearAgo = new Date();
    moreThanOneYearAgo.setFullYear(moreThanOneYearAgo.getFullYear() - 1 - 1); // More than one year ago
    const isValid = isValidDate(moreThanOneYearAgo.toISOString());
    expect(isValid).to.be.false;
  });
});

describe('changeDate', () => {
  it('should change the element value to the provided date', () => {
    const elementId = 'date-input';
    const newDate = '2022-11-09';
    //const element = { value: '2022' }; // Mock element with value property

    changeDate(elementId, newDate);
    expect(elementId.value).to.equal(newDate);
  });

  it('should not change the element value for a future date', () => {
    const elementId = 'date-input';
    const futureDate = '2023-11-09';
    //const element = { value: '' }; // Mock element with value property

    changeDate(elementId, futureDate, element);
    expect(element.value).to.be.empty;
  });
});

describe('submitDate', () => {
      it('should keep the date input value unchanged when the form is submitted', () => {
        const date = '2023-11-09';
        expect(submitDate(date)).to.equal(date);
      });
});

//UNUSE
  
// describe('Html page', () => {

//     it('should have the calendar button element', () => {
//         const calendarButton = document.getElementById('calendar-button');
//         expect(calendarButton).to.not.be.null;
//       });

//     it('should have the date element', () => {
//         const dateInput = document.getElementById('date');
//         expect(dateInput).to.not.be.null;
//     });
// });
  // describe('System Date', () => {
  //   it('should match the date in a specific time zone', () => {
  //     const systemDate = new Date(); // Get the current system date and time
  //     const systemTimeZoneOffset = systemDate.getTimezoneOffset() * 60 * 1000; // Get system time zone offset in milliseconds
  
  //     const targetTimeZoneOffset = -8 * 60 * 60 * 1000; // Target time zone offset (for example, UTC-08:00)
  //     const targetDate = new Date(systemDate.getTime() - systemTimeZoneOffset + targetTimeZoneOffset);
  
  //     // Get components of the system date and target date
  //     const systemYear = systemDate.getFullYear();
  //     const systemMonth = systemDate.getMonth() + 1; // Months are 0-indexed
  //     const systemDay = systemDate.getDate();
  
  //     const targetYear = targetDate.getFullYear();
  //     const targetMonth = targetDate.getMonth() + 1; // Months are 0-indexed
  //     const targetDay = targetDate.getDate();
  
  //     // Expect the components of the system date to match the components of the target date
  //     expect(systemYear).to.equal(targetYear);
  //     expect(systemMonth).to.equal(targetMonth);
  //     expect(systemDay).to.equal(targetDay);
  //   });
  // });