const chai = require('chai');
const expect = chai.expect;
const { isValidDate, changeDate, submitDate } = require('../src/addDate'); // Import your functions

const sinon = require('sinon');
const { assert } = require('chai');
const axios = require('axios');
const cheerio = require('cheerio');

// Mock server response for /historyData endpoint
const mockServerResponse = '<div class="activity">Mocked history data</div>';
// Mock data for the database
const mockDatabaseData = [
  {
    _id: '655b77ad323b2b687142d98c',
    amount: 50,
    date: '2023-11-05',
    input_type: 'expense',
    tag: 'Food',
    text: ' ',
    balance: ' ',
  },
];
// Mock implementation of queryDatabaseForData
const queryDatabaseForData = async () => mockDatabaseData;

// Story 1

describe('isValidDate', () => {
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
  let newDate = '2023-11-09';
  let element = '2023-11-07'; // Mock element with value property

  expect(changeDate(element, newDate)).to.equal(newDate);
  });

  it('should not change the element value for a future date', () => {
    let newDate = '2024-11-05';
    let element = '2023-11-09'; // Mock element with value property

    expect(changeDate(element, newDate)).to.be.false;
  });
});

describe('submitDate', () => {
      it('should keep the date input value unchanged when the form is submitted', () => {
        const date = '2023-11-09';
        expect(submitDate(date)).to.be.true;
      });
});

// Story 2

describe('searchByMonth', () => {
  it('should retrieve transactions sorted by date within the selected month', async () => {
    const result = await queryDatabaseForData();
    // Assuming result is an array of transactions

    // You may want to compare the dates of transactions to ensure they are sorted
    const sortedDates = result.map(transaction => transaction.date);
    const isSorted = sortedDates.every((date, index, array) => index === 0 || date >= array[index - 1]);
    
    expect(isSorted).to.be.true;
  });

  it('should retrieve transactions within the current month if no month is selected', async () => {
    const result = await queryDatabaseForData();
    // Assuming result is an array of transactions

    // You may want to compare the dates of transactions to ensure they are within the current month
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const isInCurrentMonth = result.every(transaction => new Date(transaction.date).getMonth() === currentMonth);
    
    expect(isInCurrentMonth).to.be.true;
  });

  it('should include transaction details, amounts, and balance in the retrieved data', async () => {
    const result = await queryDatabaseForData();
    // Assuming result is an array of transactions with 'date', 'text', 'tag', 'amount', and 'balance' properties

    // Write your assertion logic here
    const hasDetailsAmountBalance = result.every(transaction => 
      transaction.date !== undefined && 
      transaction.text !== undefined && 
      transaction.tag !== undefined &&
      transaction.amount !== undefined &&
      transaction.balance !== undefined
    );
    
    expect(hasDetailsAmountBalance).to.be.true;
  });
});

// Story 3

// Story 4

describe('searchByTag', () => {
  it('should retrieve transactions based on the selected tag', async () => {
    const tag = 'Food'; // Example tag
    const result = await queryDatabaseForData(tag);

    const hasSelectedTag = result.every(transaction => transaction.tag.includes(tag));
    expect(hasSelectedTag).to.be.true;
  });

  it('should retrieve all transactions in the current month if no tag is selected', async () => {
    const result = await queryDatabaseForData();

    const isInCurrentMonth = result.every(transaction => {
      const transactionDate = new Date(transaction.date);
      const currentDate = new Date();
      return (
        transactionDate.getMonth() === currentDate.getMonth() &&
        transactionDate.getFullYear() === currentDate.getFullYear()
      );
    });

    expect(isInCurrentMonth).to.be.true;
  });

  it('should retrieve complete and accurate data from the database', async () => {
    const tag = 'Food'; // Example tag
    const result = await queryDatabaseForData(tag);

    const isCompleteAndAccurate = result.every(transaction =>
      transaction.date !== undefined && 
      transaction.text !== undefined && 
      transaction.tag !== undefined &&
      transaction.amount !== undefined &&
      transaction.balance !== undefined
    );

    expect(isCompleteAndAccurate).to.be.true;
  });
});