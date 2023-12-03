const chai = require('chai');
const expect = chai.expect;
const { isValidDate, changeDate, submitDate, mockDatabaseData, addTag, removeTag, makeGraph, setDarkMode, summaryOfTag, getExpensesByTag, sortTagsByTotalExpense } = require('../src/addDate'); // Import your functions
const fs = require('fs');
const sinon = require('sinon');
const { assert } = require('chai');
const axios = require('axios');
const cheerio = require('cheerio');
const { JSDOM } = require('jsdom');
const luxon = require('luxon');
const path = require('path');



// Mock server response for /historyData endpoint
const mockServerResponse = '<div class="activity">Mocked history data</div>';

// Mock implementation of queryDatabaseForData
const queryDatabaseForData = async (tag) => {
  // นำทุก transaction ที่มี tag ตรงกับที่ user เลือกค้นหา
  const result = mockDatabaseData.filter(transaction => transaction.tag === tag);

  return result;
};

// Story 1

describe('[Sprint 1]: User Story 1', () => {
  it('date selection should return false for a date in the future', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1); // One day in the future
    const isValid = isValidDate(futureDate.toISOString());
    expect(isValid).to.be.false;
  });

  it('date selection should return true for a date exactly one year ago', () => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1); // Exactly one year ago
    const isValid = isValidDate(oneYearAgo.toISOString());
    expect(isValid).to.be.true;
  });

  it('date selection should return false for a date more than one year ago', () => {
    const moreThanOneYearAgo = new Date();
    moreThanOneYearAgo.setFullYear(moreThanOneYearAgo.getFullYear() - 1 - 1); // More than one year ago
    const isValid = isValidDate(moreThanOneYearAgo.toISOString());
    expect(isValid).to.be.false;
  });
  it('date should change the element value to the provided date', () => {
    let newDate = '2023-11-09';
    let element = '2023-11-07'; // Mock element with value property

    expect(changeDate(element, newDate)).to.equal(newDate);
  });

  it('date should not change the element value for a future date', () => {
    let newDate = '2024-11-05';
    let element = '2023-11-09'; // Mock element with value property

    expect(changeDate(element, newDate)).to.be.false;
  });

  it('page should keep the date input value unchanged when the form is submitted', () => {
    const date = '2023-11-09';
    expect(submitDate(date)).to.be.true;
  });
});

// Story 2

describe('[Sprint 1]: User Story 2', () => {
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

describe('[Sprint 1]: User Story 3', () => {
  it('should add a tag to the database', () => {
    const initialLength = mockDatabaseData.length;
    const newTag = 'Netflix';

    // เพิ่ม tag เข้าไปใน database
    addTag(newTag);

    // ตรวจสอบว่า tag ถูกเพิ่มเข้าไปใน database สำเร็จ
    assert.equal(mockDatabaseData.length, initialLength + 1, 'Tag should be added to the database');
    assert.include(mockDatabaseData.map(entry => entry.tag), newTag, 'Tag should be included in the database');
  });

  it('should remove a tag from the database', () => {
    const initialLength = mockDatabaseData.length;
    const tagToRemove = 'Netflix';

    // ลบ tag จาก database
    removeTag(tagToRemove);

    // ตรวจสอบว่า tag ถูกลบจาก database สำเร็จ
    assert.equal(mockDatabaseData.length, initialLength - 1, 'Tag should be removed from the database');
    assert.notInclude(mockDatabaseData.map(entry => entry.tag), tagToRemove, 'Tag should not be included in the database');
  });

  it('should add tag Other when user does not add the tag ', () => {
    const initialLength = mockDatabaseData.length;

    // เรียกใช้ addTag โดยไม่ระบุ newTag
    addTag();

    // ตรวจสอบว่า tag ถูกเพิ่มเข้าไปใน database สำเร็จ
    assert.equal(mockDatabaseData.length, initialLength + 1, 'Tag should be added to the database');
    assert.include(mockDatabaseData.map(entry => entry.tag), 'Other', 'Tag should be set to "Other"');
  });

  it('should add the specified tag when user adds the tag ', () => {
    const initialLength = mockDatabaseData.length;
    const newTag = 'Netflix';

    // เรียกใช้ addTag โดยระบุ newTag
    addTag(newTag);

    // ตรวจสอบว่า tag ถูกเพิ่มเข้าไปใน database สำเร็จ
    assert.equal(mockDatabaseData.length, initialLength + 1, 'Tag should be added to the database');
    assert.include(mockDatabaseData.map(entry => entry.tag), newTag, `Tag should be set to "${newTag}"`);
  });
});


// Story 4

describe('[Sprint 1]: User Story 4', () => {
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

// Story 5

describe('[Sprint 2]: User Story 5', function () {
  it('should display chart when data is present', function (done) {
    // Create a virtual DOM environment
    const dom = new JSDOM('<!DOCTYPE html><div id="chart"></div>', { runScripts: 'dangerously' });
    global.window = dom.window;
    global.document = dom.window.document;

    // Create a spy for makeGraph
    const makeGraphSpy = sinon.spy(makeGraph);

    // Trigger the function you want to test (e.g., calling the function that contains your code)
    makeGraphSpy([{ tag: 'Category 1', netBalance: 100 }]).then(() => {
      // Assert that the chart is displayed
      const chartContainer = document.getElementById('chart');
      expect(chartContainer.style.display).to.equal('block');

      // Check if makeGraph was called
      expect(makeGraphSpy.calledOnce).to.be.true;

      // Clean up the virtual DOM
      global.window = undefined;
      global.document = undefined;

      // Signal that the test is complete
      done();
    });
  });

  it('should not display chart when data is empty', function (done) {
    // Create a virtual DOM environment
    const dom = new JSDOM('<!DOCTYPE html><div id="chart"></div>', { runScripts: 'dangerously' });
    global.window = dom.window;
    global.document = dom.window.document;

    // Create a spy for makeGraph
    const makeGraphSpy = sinon.spy(makeGraph);

    // Trigger the function you want to test with empty data
    makeGraphSpy([{}]).then(() => {
      // Assert that the chart is not displayed
      const chartContainer = document.getElementById('chart');
      expect(chartContainer.style.display).to.equal('none');

      // Check if makeGraph was called
      expect(makeGraphSpy.calledOnce).to.be.true;

      // Clean up the virtual DOM
      global.window = undefined;
      global.document = undefined;

      // Signal that the test is complete
      done();
    }).catch(error => {
      // Handle errors
      console.error('Test failed:', error);

      // Clean up the virtual DOM
      global.window = undefined;
      global.document = undefined;
    });


  });
  it('should not display chart again when data were removed', function (done) {
    // Create a virtual DOM environment
    const dom = new JSDOM('<!DOCTYPE html><div id="chart"></div>', { runScripts: 'dangerously' });
    global.wisndow = dom.window;
    global.document = dom.window.document;

    // Create a spy for makeGraph
    const makeGraphSpy = sinon.spy(makeGraph);

    // Trigger the function you want to test (e.g., calling the function that contains your code)
    makeGraphSpy([{ tag: 'Category 1', netBalance: 100 }])
      .then(() => {
        // Assert that the chart is displayed
        const chartContainer = document.getElementById('chart');
        expect(chartContainer.style.display).to.equal('block');

        // Check if makeGraph was called
        expect(makeGraphSpy.calledOnce).to.be.true;

        // Now, call makeGraph again with empty data
        return makeGraphSpy([{}]);
      })
      .then(() => {
        // Assert that the chart is not displayed
        const chartContainer = document.getElementById('chart');
        expect(chartContainer.style.display).to.equal('none');

        // Check if makeGraph was called again
        expect(makeGraphSpy.calledTwice).to.be.true;

        // Clean up the virtual DOM
        global.window = undefined;
        global.document = undefined;

        // Signal that the test is complete
        done();
      })
      .catch(error => {
        // Handle errors
        console.error('Test failed:', error);

        // Clean up the virtual DOM
        global.window = undefined;
        global.document = undefined;

        // Signal that the test is complete with failure
        done(error);
      });
  });
});


// Story 6

describe('[Sprint 2]: User Story 6', () => {
  it('should return total expenses for the specified tag', () => {
    const tag = 'Food';
    const result = getExpensesByTag(mockDatabaseData, tag);
    expect(result).to.equal(150);
  });

  it('should return 0 for a tag with no expenses', () => {
    const tag = 'Other';
    const result = getExpensesByTag(mockDatabaseData, tag);
    expect(result).to.equal(0);
  });

  it('should sort tags by total expense from highest to lowest', () => {
    const sortedTags = sortTagsByTotalExpense(mockDatabaseData);

    expect(sortedTags).to.be.an('array');
    expect(sortedTags).to.have.lengthOf(2);

    // Check if the sorting is correct
    expect(sortedTags[0].tag).to.equal('Food');
    expect(sortedTags[0].totalExpense).to.equal(150);

    expect(sortedTags[1].tag).to.equal('Travel');
    expect(sortedTags[1].totalExpense).to.equal(70);
  });

});


describe('[Sprint 2]: User Story 7', () => {
  let html = fs.readFileSync(path.join(__dirname, '..', '/src/home.html'), 'utf8');
  let dom = new JSDOM(html);

  it('should change mode to dark mode if it was light mode before', () => {
    expect(setDarkMode('dark')).to.equal('dark');
  });
  it('should change mode to light mode if it was dark mode before', () => {
    expect(setDarkMode('light')).to.equal('light');
  });
  it('changing the page will also keep the mode unchanged', () => {
    // Your test logic here
    let body = dom.window.document.querySelector('body');
    let modeSwitch = dom.window.document.querySelector('.toggle-switch');

    expect(body.classList.contains('dark')).to.be.false;

    // changing the page

    html = fs.readFileSync(path.join(__dirname, '..', '/src/history.html'), 'utf8');
    dom = new JSDOM(html);
    body = dom.window.document.querySelector('body');
    modeSwitch = dom.window.document.querySelector('.toggle-switch');

    expect(body.classList.contains('dark')).to.be.false;
  });
});


// Error in sprint 2


describe('[Sprint 2]: Error 1', () => {
  const mockData = [
    {
      _id: "655b77ad323b2b687142d98c",
      amount: 50,
      date: "2023-11-05",
      input_type: "expense",
      tag: "Food",
      text: "",
    },
    {
      _id: "655b77ad323b2b687142d98d",
      amount: 30,
      date: "2023-11-06",
      input_type: "income",
      tag: "Food",
      text: "",
    },
    {
      _id: "655b77ad323b2b687142d98e",
      amount: 20,
      date: "2023-11-07",
      input_type: "revenue",
      tag: "Food",
      text: "",
    },
    // Add more mock data with different tags
    {
      _id: "655b77ad323b2b687142d98f",
      amount: 20,
      date: "2023-11-08",
      input_type: "expense",
      tag: "Travel",
      text: "",
    },
    {
      _id: "655b77ad323b2b687142d990",
      amount: 40,
      date: "2023-11-09",
      input_type: "income",
      tag: "Travel",
      text: "",
    },
    {
      _id: "655b77ad323b2b687142d991",
      amount: 30,
      date: "2023-11-10",
      input_type: "expense",
      tag: "Other",
      text: "",
    },
    {
      _id: "655b77ad323b2b687142d992",
      amount: 60,
      date: "2023-11-11",
      input_type: "income",
      tag: "Other",
      text: "",
    },
  ];

  it('in history page, choosing a tag that have no data, will show 0 money revenue', () => {
    const tagWithData = "Unknown";
    const data = summaryOfTag(mockData, tagWithData)[0];

    //console.log(data)

    // Your actual expectations based on the calculated totals
    expect(data.total_expense).to.equal(0)
    expect(data.total_income).to.equal(0);
    expect(data.total_revenue).to.equal(0); // (total_income - total_expense)
  });

  it('in history page, choosing a tag that has data in the database will show accumulated money based on tag and type', () => {

    const tagWithData = "Food";
    const data = summaryOfTag(mockData, tagWithData)[0];

    //console.log(data)

    // Your actual expectations based on the calculated totals
    expect(data.total_expense).to.equal(50);
    expect(data.total_income).to.equal(30);
    expect(data.total_revenue).to.equal(-20); // (total_income - total_expense)
  });
});




// console.log(mockDatabaseData);

