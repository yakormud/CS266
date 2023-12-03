// Story 1
const { MongoClient } = require('mongodb');
const luxon = require('luxon');
const Plotly = require('plotly');
const path = require('path');
const fs = require('fs');
const { JSDOM } = require('jsdom');


// เช็คว่าวันที่ validated ไหม
function isValidDate(selectedDate) {
    
    //GET TO DAY DATE AND THEN MAKE RANGE TO DAY TO PAST YEAR (1 YEAR RANGE)
    //IF INPUT SELECTEDDATE IS IN RAGE RETURN TRUE
    //ELSE NOT
    if (!selectedDate) {
        return false;
    }

    // Convert the selectedDate string to a Date object
    const selectedDateTime = luxon.DateTime.fromISO(selectedDate).toFormat('yyyy-MM-dd');

    // Get today's date
    const today = luxon.DateTime.local().toFormat('yyyy-MM-dd');

    // Calculate the date from one year ago
    const oneYearAgo = luxon.DateTime.local().minus({ years: 1 }).toFormat('yyyy-MM-dd');
    //oneYearAgo.setFullYear(today.getFullYear() - 1);

    // Check if the selectedDate is within the past year
    // console.log(selectedDateTime)
    // console.log(today);
    // console.log(oneYearAgo)
    // console.log(selectedDateTime >= oneYearAgo)
    // console.log(selectedDateTime <= today)
    return selectedDateTime >= oneYearAgo && selectedDateTime <= today;
}

//เมื่อเลือกวันที่ จะเปลี่ยนวันที่ที่โชว์ใหม่
function changeDate(oldDate, newDate) {
    if (!isValidDate(newDate)) {
        return false;
    } else {
        oldDate = newDate;
        return oldDate;
    }
    //IF DATE IS NOT VALID RETURN FALSE
    //IF DATE IS VALID CHANGE DATE IN "ELEMENTID" THEN RETURN TRUE
}

//หลัง submit form แล้ววันที่ยังคงเป็นวันเดิม เพื่อให้พร้อมกับการกรอก transaction ต่อไป
function submitDate(date, elementId) {
    if (elementId = new Date()) {
        return true;
    }
    if (!isValidDate(date)) {
        return false;
    } else {
        elementId = temp;
        return elementId;
    }
    //IF DATE IS VALID RETURN DATE, IF NOT RETURN FALSE
    //DEFAULT RETURN TRUE
}

// Story 2 & 4

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
    {
        _id: '655b77ad323b2b687142d98c',
        amount: 50,
        date: '2023-10-05',
        input_type: 'expense',
        tag: 'Travel',
        text: ' ',
        balance: ' ',
    },
];


async function queryDatabaseForData() {
    const uri = "mongodb+srv://ploy:ploy@cs266.hlnjicp.mongodb.net/";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db('CS266'); // Replace 'YourDatabaseName' with your actual database name
        const collection = database.collection('User');

        // Assuming data has a similar structure in the database
        const databaseData = await collection.find({}).toArray();

        return databaseData;
    } finally {
        await client.close();
    }
}

// Story 3

const addTag = (tag) => {
    if (tag != null) {
        mockDatabaseData.push({
            _id: '655b77ad323b2b687142d98c',
            amount: 100,
            date: '2023-11-06',
            input_type: 'income',
            tag: 'Netflix',
            text: ' ',
            balance: ' ',
        });
    } else {
        mockDatabaseData.push({
            _id: '655b77ad323b2b687142d98c',
            amount: 100,
            date: '2023-11-07',
            input_type: 'income',
            tag: 'Other',
            text: ' ',
            balance: ' ',
        });
    }

};

const removeTag = (tag) => {
    const index = mockDatabaseData.findIndex(entry => entry.tag === tag);
    if (index > -1) {
        mockDatabaseData.splice(index, 1);
    }
};

// Updated makeGraph function that accepts data as a parameter
function makeGraph(data) {
    const chartContainer = document.getElementById('chart');

    if (data.every(entry => Object.keys(entry).length === 0)) {
        chartContainer.style.display = 'none';
        return new Promise((resolve, reject) => {
            // Simulating an asynchronous operation (e.g., fetching data)
            setTimeout(() => {
                const result = processData(data);
                resolve(result);
            }, 1); // Simulating a delay of 1 second
        });
    }

    chartContainer.style.display = 'block';

    // Extract labels and values from the data
    const labels = data.map(entry => entry.tag);
    const values = data.map(entry => entry.netBalance);
    const colors = ['red', 'green', 'blue', 'orange', 'purple', 'pink'];
    const hoverText = data.map(entry => `${entry.tag}: ${entry.netBalance}`);

    // Create a pie chart using Plotly.js
    const chartData = [{
        labels,
        values,
        type: 'pie',
        hoverinfo: 'label+percent',
        text: hoverText,
        marker: {
            line: {
                color: 'black',
                width: 2
            }
        }
    }];

    const chartLayout = {
        title: 'Expense Summary',
        height: 350,
        width: 400
    };

    return new Promise((resolve, reject) => {
        // Simulating an asynchronous operation (e.g., fetching data)
        setTimeout(() => {
            const result = processData(data);
            resolve(result);
        }, 1); // Simulating a delay of 1 second
    });

    //Plotly.newPlot('chart', chartData, chartLayout);
}

function processData(data) {
    // Process the data as needed
    // For example, updating the DOM, etc.
    return 'Processed data';
}
const mockDocument = new JSDOM(`
  <!DOCTYPE html>
  <html>
    <body>
      <nav></nav>
      <div class="toggle"></div>
      <div class="toggle-switch"></div>
      <div class="mode-text"></div>
    </body>
  </html>
`);

function setDarkMode(mode) {

global.document = mockDocument.window.document;


    // functio nto check whether it should be dark or light and then return value to process in html page
    if(mode === 'dark'){
        mode = 'dark';
    }else {
        mode = 'light'
    }
    const body = document.querySelector('body'),
                sidebar = body.querySelector('nav'),
                toggle = body.querySelector(".toggle"),
                modeSwitch = body.querySelector(".toggle-switch"),
                modeText = body.querySelector(".mode-text");
        
            // Function to toggle the sidebar
            toggle.addEventListener("click", () => {
                sidebar.classList.toggle("close");
            });
        
            // Function to toggle between dark and light modes
            modeSwitch.addEventListener("click", () => {
                body.classList.toggle("dark");
        
                if (body.classList.contains("dark")) {
                    modeText.innerText = "Light mode";
                    setMode('dark'); // Save the mode in localStorage
                } else {
                    modeText.innerText = "Dark mode";
                    setMode('light'); // Save the mode in localStorage
                }
            });
    return mode;
}

function summaryOfTag(data, tag){

    const filteredData = data.filter((item) => item.tag === tag);

  // Calculate total_expense, total_income, and total_revenue
  const totalExpense = filteredData
    .filter((item) => item.input_type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalIncome = filteredData
    .filter((item) => item.input_type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalRevenue = totalIncome - totalExpense;

  //console.log(totalRevenue)
  //console.log(totalIncome)
  //console.log(totalExpense)

  // Return an array of objects with calculated totals
  return [
    {
      total_expense: totalExpense,
      total_income: totalIncome,
      total_revenue: totalRevenue,
    },
  ];
};






module.exports = {
    isValidDate,
    changeDate,
    submitDate,
    mockDatabaseData,
    addTag,
    removeTag,
    makeGraph,
    setDarkMode,
    summaryOfTag
};
