// Story 1

// เช็คว่าวันที่ validated ไหม
function isValidDate(selectedDate) {
    //GET TO DAY DATE AND THEN MAKE RANGE TO DAY TO PAST YEAR (1 YEAR RANGE)
    //IF INPUT SELECTEDDATE IS IN RAGE RETURN TRUE
    //ELSE NOT
    if (!selectedDate) {
        return false;
      }
    
      // Convert the selectedDate string to a Date object
      const selectedDateTime = new Date(selectedDate);
    
      // Get today's date
      const today = new Date();
    
      // Calculate the date from one year ago
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(today.getFullYear() - 1);
    
      // Check if the selectedDate is within the past year
      return selectedDateTime >= oneYearAgo && selectedDateTime <= today;
}

//เมื่อเลือกวันที่ จะเปลี่ยนวันที่ที่โชว์ใหม่
function changeDate(oldDate, newDate) {
    if(!isValidDate(newDate)){
        return false;
    }else{
        oldDate = newDate;
        return oldDate;
    }
    //IF DATE IS NOT VALID RETURN FALSE
    //IF DATE IS VALID CHANGE DATE IN "ELEMENTID" THEN RETURN TRUE
}

//หลัง submit form แล้ววันที่ยังคงเป็นวันเดิม เพื่อให้พร้อมกับการกรอก transaction ต่อไป
function submitDate(date, elementId){
    if(elementId = new Date()){
        return true;
    } 
    if(!isValidDate(date)){
        return false;
    }else{
        elementId = temp;
        return elementId;
    }
    //IF DATE IS VALID RETURN DATE, IF NOT RETURN FALSE
    //DEFAULT RETURN TRUE
}

// Story 2 & 4

const { MongoClient } = require('mongodb');

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

module.exports = {
    isValidDate,
    changeDate,
    submitDate
  };
