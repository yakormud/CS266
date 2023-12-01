// Story 1
const { MongoClient } = require('mongodb');


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
    console.log(selectedDateTime)
    console.log(today);
    console.log(oneYearAgo)
    console.log(selectedDateTime >= oneYearAgo)
    console.log(selectedDateTime <= today)
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


module.exports = {
    isValidDate,
    changeDate,
    submitDate,
    mockDatabaseData,
    addTag,
    removeTag
};
