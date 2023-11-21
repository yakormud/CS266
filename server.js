const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

const PORT = 8080;

// app.get('/', (req, res) => {
//   fs.readFile('./src/home.html', 'utf8', (err, html) => {
//     if (err) {
//       res.status(500).send('Internal Server Error');
//       return;
//     }

//     res.send(html);
//   });
// });
//

app.get('/transacData', async (req, res) => {
  const staticHTML = fs.readFileSync('./src/home.html', 'utf8');
  // ...

  try {
        
    let { month } = req.query;
    //console.log (month);
    //Connect Syntax
    await client.connect();
    const database = client.db("CS266");
    const collection = database.collection("User");
     const sumOfIncome = await collection.aggregate([
      {
        $match: {
          "input_type": "income",
          "date": { $regex: month }
        }
      },
      {
        $addFields: {
          parsedAmount: { $toInt: "$amount" }
        }
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: "$parsedAmount" }
        }
      }
    ]).toArray();
    const sumOfExpense = await collection.aggregate([
      {
        $match: {
          "input_type": "expense",
          "date": { $regex: month }
        }
      },
      {
        $addFields: {
          parsedAmount: { $toInt: "$amount" }
        }
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: "$parsedAmount" }
        }
      }
    ]).toArray();
    
    // The result will be an array with a single document containing the totalIncome
    const totalIncome = sumOfIncome.length > 0 ? sumOfIncome[0].totalIncome : 0;
    const totalExpense = sumOfExpense.length > 0 ? sumOfExpense[0].totalIncome : 0;
    //console.log("TotalD Income:", totalIncome);
    //console.log("TotalD Expense:", totalExpense);
    //console.log("TotalD Revenue:", totalIncome-totalExpense);

    if(month){
      let headerDom = `<div class="pageHeader">
                          <h>Expense Tracker</h>
                       </div>
                    <div class="titleContainer">
                    <div class="titleBubble">
                        <p1>Total Revenue</p1>
                        <br>
                        <i class="uil uil-money-insert" style="background-color: gold;"></i>
                        <span>${totalIncome-totalExpense}</span>

                    </div>
                    <div class="titleBubble">
                        <p1>Income</p1>
                        <br>
                        <i class="uil uil-money-insert" style="background-color: greenyellow;"></i>
                        <span>${totalIncome}</span>

                    </div>
                    <div class="titleBubble">
                        <p1>Expense</p1>
                        <br>
                        <i class="uil uil-money-insert" style="background-color: rgb(255, 99, 99);"></i>
                        <span>${totalExpense}</span>

                    </div>
                  </div>`;


                  headerDom += '<div class="activity">';
                  let query;
                     query = {
                      "date": { $regex: month }
                  };
                  
                                  
                  const sort = {
                      "date": -1
                 };
                                  
                  let userHistory = await collection.find(query).sort(sort).toArray();
                  //let dateSet = new Set();
                
                  if(userHistory.length <= 0 ){

                      headerDom += '<center><h><div class = "dateUpper">No Recent Activity Today</div></h></center>';

                    
                  }else{
                    headerDom += '<center><h><div class = "dateUpper">Today Activity</div></h> <br></center>';
                
                    userHistory.forEach(row => {
                      
                      headerDom += `<div class="activityIncome">
                                      <div class="activity-container">
                                          <div class="activityInfo">
                                              <p class="act-header">${row.text}</p>`;
                      if(row.input_type == "income"){
                        headerDom += `<p class="act-header">+ ${row.amount}</p>`;
                      }else{
                        headerDom += `<p class="act-header">- ${row.amount}</p>`;
                      }
                      headerDom +=`</div>
                                          <div class="activityInfo">
                                              <p class="act-lower" style="color: darkgray;">${row.date}</p>`;
                      if(row.input_type == "income"){
                        headerDom += `<p class="act-lower" style="color: green;">${row.tag}</p>`;
                      }else{
                        headerDom += `<p class="act-lower" style="color: red;">${row.tag}</p>`;
                      }
                      headerDom +=  `</div>
                                      </div>
                                  </div>`;
                    });
                  }
                
                
                  headerDom += '</div>';
      res.send(headerDom);
      return;
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the connection
    await client.close();
  }
});



app.get('/historyData', async (req, res) => {
  const staticHTML = fs.readFileSync('./src/history.html', 'utf8');
  //console.log(month);
  // ...

  try {
        
    let { month, tag } = req.query;
    //Connect Syntax
    await client.connect();
    const database = client.db("CS266");
    const collection = database.collection("User");
     const sumOfIncome = await collection.aggregate([
      {
        $match: {
          "input_type": "income",
          "date": { $regex: month }
        }
      },
      {
        $addFields: {
          parsedAmount: { $toInt: "$amount" }
        }
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: "$parsedAmount" }
        }
      }
    ]).toArray();
    const sumOfExpense = await collection.aggregate([
      {
        $match: {
          "input_type": "expense",
          "date": { $regex: month }
        }
      },
      {
        $addFields: {
          parsedAmount: { $toInt: "$amount" }
        }
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: "$parsedAmount" }
        }
      }
    ]).toArray();
    
    // The result will be an array with a single document containing the totalIncome
    const totalIncome = sumOfIncome.length > 0 ? sumOfIncome[0].totalIncome : 0;
    const totalExpense = sumOfExpense.length > 0 ? sumOfExpense[0].totalIncome : 0;
    //console.log("TotalD Income:", totalIncome);
    //console.log("TotalD Expense:", totalExpense);
    //console.log("TotalD Revenue:", totalIncome-totalExpense);

    if(month && tag){
      let headerDom = `<div class="titleContainer">
                    <div class="titleBubble">
                        <p1>Total Revenue</p1>
                        <br>
                        <i class="uil uil-money-insert" style="background-color: gold;"></i>
                        <span>${totalIncome-totalExpense}</span>

                    </div>
                    <div class="titleBubble">
                        <p1>Income</p1>
                        <br>
                        <i class="uil uil-money-insert" style="background-color: greenyellow;"></i>
                        <span>${totalIncome}</span>

                    </div>
                    <div class="titleBubble">
                        <p1>Expense</p1>
                        <br>
                        <i class="uil uil-money-insert" style="background-color: rgb(255, 99, 99);"></i>
                        <span>${totalExpense}</span>

                    </div>
                  </div>`;


                  headerDom += '<div class="activity">';
                  let query;
                  if(tag == "None") {
                     query = {
                      "date": { $regex: month }
                  };
                  }else{
                    query = {
                      "date": { $regex: month },
                      "tag" : tag
                  };
                  }
                                  
                  const sort = {
                      "date": -1
                 };
                                  
                  let userHistory = await collection.find(query).sort(sort).toArray();
                  let dateSet = new Set();
                
                  if(userHistory.length <= 0 ){
                    if(tag != "None"){
                      headerDom += '<center><h>No Activity match "'+ tag +'"</h></center>';
                    }else{
                      headerDom += '<center><h>No Activity</h></center>';
                    }
                    
                  }else{
                    headerDom += '<center><h>Recent Activity</h> <br></center>';
                
                    userHistory.forEach(row => {
                      if(!dateSet.has(row.date)){
                        headerDom += `<br><h class="dateUpper">${row.date}</h>`;
                        dateSet.add(row.date);
                      }
                      headerDom += `<div class="activityIncome">
                                      <div class="activity-container">
                                          <div class="activityInfo">
                                              <p class="act-header">${row.text}</p>`;
                      if(row.input_type == "income"){
                        headerDom += `<p class="act-header">+ ${row.amount}</p>`;
                      }else{
                        headerDom += `<p class="act-header">- ${row.amount}</p>`;
                      }
                      headerDom +=`</div>
                                          <div class="activityInfo">
                                              <p class="act-lower" style="color: darkgray;">${row.date}</p>`;
                      if(row.input_type == "income"){
                        headerDom += `<p class="act-lower" style="color: green;">${row.tag}</p>`;
                      }else{
                        headerDom += `<p class="act-lower" style="color: red;">${row.tag}</p>`;
                      }
                      headerDom +=  `</div>
                                      </div>
                                  </div>`;
                    });
                  }
                
                
                  headerDom += '</div>';
      res.send(headerDom);
      return;
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the connection
    await client.close();
  }
});

app.get('/history', async (req, res) => {
  const staticHTML = fs.readFileSync('./src/history.html', 'utf8');
  //console.log(month);
  // ...

  try {
    
    //Connect Syntax
    await client.connect();
    const database = client.db("CS266");
    const collection = database.collection("User");
    const collectionTag = database.collection("Tag");



     let { month, tag } = req.query;
    if(month && tag){
      let headerDom = `<div class="titleContainer">
                    <div class="titleBubble">
                        <p1>Total Revenue</p1>
                        <br>
                        <i class="uil uil-money-insert" style="background-color: gold;"></i>
                        <span>${totalIncome-totalExpense}</span>

                    </div>
                    <div class="titleBubble">
                        <p1>Income</p1>
                        <br>
                        <i class="uil uil-money-insert" style="background-color: greenyellow;"></i>
                        <span>${totalIncome}</span>

                    </div>
                    <div class="titleBubble">
                        <p1>Expense</p1>
                        <br>
                        <i class="uil uil-money-insert" style="background-color: rgb(255, 99, 99);"></i>
                        <span>${totalExpense}</span>

                    </div>
                  </div>`;
      res.send(headerDom);
      return;
    }
    if(!month){
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
      month = `${currentYear}-${currentMonth}`;
      //month = "2023-01";
    }
    if(!tag){
      tag = "None";
    }

  //   // Query Syntax
     const result = await collectionTag.find({}).toArray();
     const sumOfIncome = await collection.aggregate([
      {
        $match: {
          "input_type": "income",
          "date": { $regex: month }
        }
      },
      {
        $addFields: {
          parsedAmount: { $toInt: "$amount" }
        }
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: "$parsedAmount" }
        }
      }
    ]).toArray();
    const sumOfExpense = await collection.aggregate([
      {
        $match: {
          "input_type": "expense",
          "date": { $regex: month }
        }
      },
      {
        $addFields: {
          parsedAmount: { $toInt: "$amount" }
        }
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: "$parsedAmount" }
        }
      }
    ]).toArray();
    
    // The result will be an array with a single document containing the totalIncome
    const totalIncome = sumOfIncome.length > 0 ? sumOfIncome[0].totalIncome : 0;
    const totalExpense = sumOfExpense.length > 0 ? sumOfExpense[0].totalIncome : 0;
    //console.log("Total Income:", totalIncome);
    //console.log("Total Expense:", totalExpense);
    //console.log("Total Revenue:", totalIncome-totalExpense);


  //   ///////////////// END OF SET-UP   NOW ITS HTML BUILDING /////////////////////////////////////

  //   // FOR TAG
    let tagDom = '<select name="tags" id="tags">';
      tagDom += `<option value="None">No tag select</option>`;
      tagDom += `<option value="Other">Other</option>`;
    result.forEach(row => {
      tagDom += `<option value="${row.tag}">${row.tag}</option>`;
      //dynamicHTML += `<div>${doc.date}</div>`; 
    });
    tagDom += '</select>';

  // FOR RESULT HEADER
    
  let headerDom = `<div class="titleContainer">
                    <div class="titleBubble">
                        <p1>Total Revenue</p1>
                        <br>
                        <i class="uil uil-money-insert" style="background-color: gold;"></i>
                        <span>${totalIncome-totalExpense}</span>

                    </div>
                    <div class="titleBubble">
                        <p1>Income</p1>
                        <br>
                        <i class="uil uil-money-insert" style="background-color: greenyellow;"></i>
                        <span>${totalIncome}</span>

                    </div>
                    <div class="titleBubble">
                        <p1>Expense</p1>
                        <br>
                        <i class="uil uil-money-insert" style="background-color: rgb(255, 99, 99);"></i>
                        <span>${totalExpense}</span>

                    </div>
                  </div>`;
  
  headerDom += '<div class="activity">';
  const query = {
      "date": { $regex: month }
  };
                  
  const sort = {
      "date": -1
 };
                  
  let userHistory = await collection.find(query).sort(sort).toArray();
  let dateSet = new Set();

  if(userHistory.length < 0 ){
    headerDom += '<center><h>No Activity</h></center>';
  }else{
    headerDom += '<center><h><div class = "dateUpper">Recent Activity</div></h> <br></center>';

    userHistory.forEach(row => {
      if(!dateSet.has(row.date)){
        headerDom += `<br><h class="dateUpper">${row.date}</h>`;
        dateSet.add(row.date);
      }
      headerDom += `<div class="activityIncome">
                      <div class="activity-container">
                          <div class="activityInfo">
                              <p class="act-header">${row.text}</p>`;
      if(row.input_type == "income"){
        headerDom += `<p class="act-header">+ ${row.amount}</p>`;
      }else{
        headerDom += `<p class="act-header">- ${row.amount}</p>`;
      }
      headerDom +=`</div>
                          <div class="activityInfo">
                              <p class="act-lower" style="color: darkgray;">${row.date}</p>`;
      if(row.input_type == "income"){
        headerDom += `<p class="act-lower" style="color: green;">${row.tag}</p>`;
      }else{
        headerDom += `<p class="act-lower" style="color: red;">${row.tag}</p>`;
      }
      headerDom +=  `</div>
                      </div>
                  </div>`;
    });
  }


  headerDom += '</div>';
  
                  

  //   ////////////////////////////////////////////////////////////////////////////////////////////////
  //   // Combine and sent to page
  const finalHTML = staticHTML.replace('<!-- Drop down tags goes here -->', tagDom)
  .replace('<!-- ACTIVITY -->', headerDom);

    // Send the response
  res.send(finalHTML);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the connection
    await client.close();
  }
});

// Serve static files (CSS, JS, images, etc.) from the 'public' directory
app.use(express.static('src'));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ploy:ploy@cs266.hlnjicp.mongodb.net/";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const database = client.db("CS266");
    const collection = database.collection("Tag");
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const query = {};
    const result = await collection.find(query).toArray();

    // Output the result
    // console.log(result);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// ...

app.get('/', async (req, res) => {
  // ...
  
  try {
    
    //Connect Syntax
    const client = new MongoClient("mongodb+srv://ploy:ploy@cs266.hlnjicp.mongodb.net/");
    await client.connect();
    const database = client.db("CS266");
    const collection = database.collection("User");
    const collectionTag = database.collection("Tag");

         // Find all documents in the collection
          const documents = await collection.find({}).toArray();
          
          // Sum up the values in the "amount" field
          const totalAmount = documents.reduce((sum, doc) => sum + (parseInt(doc.amount) || 0), 0);

          // console.log('Total Amount:', totalAmount);
          let homepage = fs.readFileSync('./src/home.html', 'utf8');
          homepage = homepage.replace('{income}',totalAmount);
          // res.send(homepage);
        
//Sum up with aggregate 
const documents2 = await collection.aggregate([
  {
    $group: {
      _id: '$input_type', // Group by input_type field
      totalAmount: { $sum: { $toInt: '$amount' } }// Sum the amount field
    }
  }
]).toArray();

// console.log(totalAmount + 20) // this works
// Extract the results for income and expense
const incomeSum = (documents2.find(item => item._id === 'income') || {}).totalAmount || 0;
const expenseSum = (documents2.find(item => item._id === 'expense') || {}).totalAmount || 0;

// console.log('Income Sum:', incomeSum);
// console.log('Expense Sum:', expenseSum);



    // Query Syntax
    const result = await collectionTag.find({}).toArray();
    const result2 = await collection.find().toArray();

    // Read the static HTML file
    const staticHTML = fs.readFileSync('./src/home.html', 'utf8');

    ///////////////// END OF SET-UP   NOW ITS HTML BUILDING /////////////////////////////////////

    // Build dynamic HTML content For result1
    let dynamicHTML = '<select name="tags" id="tags" class = "dropdown-el" >';
      dynamicHTML += `<option value="Other">Other</option>`;
    result.forEach(row => {
      dynamicHTML += `<option value="${row.tag}">${row.tag}</option>`;
      //dynamicHTML += `<div>${doc.date}</div>`; 
    });
    dynamicHTML += '</select>';

    // // Build dynamic HTML content For result2

    let dynamicHTML2 = '';
    result2.forEach(doc => {
      dynamicHTML2 += `<div>${doc.tag}</div>`; 
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Combine and sent to page
    let finalHTML = staticHTML.replace('<!-- Drop down tags goes here -->', dynamicHTML);
    finalHTML = finalHTML.replace('{income}',incomeSum);
    finalHTML = finalHTML.replace('{expense}',expenseSum);
    finalHTML = finalHTML.replace('{balance}',incomeSum-expenseSum);

    // finalHTML = finalHTML.replace('{income}',responseData.incomeSum);
    // finalHTML = finalHTML.replace('{expense}',responseData.expenseSum);
    // finalHTML = finalHTML.replace('{balance}',responseData.incomeSum-responseData.expenseSum);


   
    //.replace('<!-- INSERT_DYNAMIC_CONTENT_HERE2 -->', dynamicHTML2);

    // Send the response
    res.send(finalHTML);
    // res.json(responseData);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the connection
    await client.close();
  }
});

app.get('/user/data', async(req,res)=>{
  const client = new MongoClient("mongodb+srv://ploy:ploy@cs266.hlnjicp.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const database = client.db("CS266");
  const collection = database.collection("User");
  const collectionTag = database.collection("Tag");

  const documents2 = await collection.aggregate([
    {
      $group: {
        _id: '$input_type', // Group by input_type field
        totalAmount: { $sum: { $toInt: '$amount' } }// Sum the amount field
      }
    }
  ]).toArray();
  const incomeSum = (documents2.find(item => item._id === 'income') || {}).totalAmount || 0;
  const expenseSum = (documents2.find(item => item._id === 'expense') || {}).totalAmount || 0;


  const result = await collectionTag.find({}).toArray();
  const result2 = await collection.find().toArray();


  const responseData={
    incomeSum: incomeSum,
    expenseSum: expenseSum,
    balance: incomeSum - expenseSum,
    result: result,
    result2: result2
  };

  console.log(responseData);
  res.send(responseData);
});


app.get('/activity', async(req,res)=>{
  const client = new MongoClient("mongodb+srv://ploy:ploy@cs266.hlnjicp.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const database = client.db("CS266");
  const collection = database.collection("User");

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set hours to midnight
  // const todayDate = await collection.find({ date: { $gte: today } }).toArray();
  
  const todayDocument = await collection.findOne({
    date: {
      $gte: today
    }
    
  });
  res.json(todayDocument);
  console.log(todayDocument);
  // res.send(responseData2);
});


app.post('/insertData', async (req, res) => {
  try {
    // Connect to MongoDB
    const client = new MongoClient("mongodb+srv://ploy:ploy@cs266.hlnjicp.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    // Specify the database and collection you want to insert data into
    const database = client.db("CS266");
    const collection = database.collection("User");

    // Document to be inserted
    const documentToInsert = {
      input_type: "income",
      date: "19/11/2566",
      amount: 1567,
      tag: "salary",
      text: " ",
    };

    // Insert the document
    const result = await collection.insertOne(documentToInsert);

    console.log(`Document inserted with _id: ${result.insertedId}`);

    res.send('Data inserted successfully!');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
});

// app.get('/history', async (req, res) => {
//   // ...

//   try {
    
//     //Connect Syntax
//     await client.connect();
//     const database = client.db("CS266");
//     const collection = database.collection("User");

//     // Query Syntax
//     const result = await collection.find({}).toArray();
//     const result2 = await collection.find({tag:"salary"}).toArray();

//     // Read the static HTML file
//     const staticHTML = fs.readFileSync('./src/history.html', 'utf8');

//     ///////////////// END OF SET-UP   NOW ITS HTML BUILDING /////////////////////////////////////

//     // Build dynamic HTML content For result1
//     let dynamicHTML = '';
//     result.forEach(doc => {
//       dynamicHTML += `<div>${doc.date}</div>`; 
//     });

//     // Build dynamic HTML content For result2

//     let dynamicHTML2 = '';
//     result2.forEach(doc => {
//       dynamicHTML2 += `<div>${doc.tag}</div>`; 
//     });

//     ////////////////////////////////////////////////////////////////////////////////////////////////
//     // Combine and sent to page
//     const finalHTML = staticHTML.replace('<!-- INSERT_DYNAMIC_CONTENT_HERE -->', dynamicHTML)
//     .replace('<!-- INSERT_DYNAMIC_CONTENT_HERE2 -->', dynamicHTML2);

//     // Send the response
//     res.send(finalHTML);

//   } catch (error) {
//     console.error('Error:', error);
//   } finally {
//     // Close the connection
//     await client.close();
//   }
// });




app.get('/tag', async (req, res) => {
  try {
    // Connect to MongoDB
    const client = new MongoClient("mongodb+srv://ploy:ploy@cs266.hlnjicp.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    // Specify the database and collection to fetch tags from
    const database = client.db("CS266");
    const collection = database.collection("Tag");

    // Fetch tags from the collection
    const tags = await collection.find({}).toArray();

    // Read the static HTML file
    const staticHTML = fs.readFileSync('./src/tag.html', 'utf8');

    // Inject the fetched tags into the HTML content
    const modifiedHTML = injectDynamicContent(staticHTML, tags);

    // Send the response
    res.send(modifiedHTML);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
});

function injectDynamicContent(staticHTML, tags) {
  // Create the dynamic content based on the tags array
  const dynamicContent = generateDynamicContent(tags);

  // Replace the placeholder in the static HTML with the dynamic content
  const modifiedHTML = staticHTML.replace('<!-- INSERT_DYNAMIC_CONTENT_HERE -->', dynamicContent);

  return modifiedHTML;
}

function generateDynamicContent(tags) {
  // Create the dynamic content based on the tags array
  let dynamicHTML = '<div id="data-list">';
  tags.forEach(tag => {
    dynamicHTML += `<div><button class="tag-button" data-tag-id="${tag._id}">${tag.tag}</button></div>`;
  });
  dynamicHTML += '</div>';
  return dynamicHTML;
}

app.delete('/deleteTag/:tagId', async (req, res) => {
  try {
    const { MongoClient, ObjectId } = require('mongodb');
    const tagId = req.params.tagId;
    console.log('Deleting tag with ID:', tagId);

    // Connect to MongoDB
    const client = new MongoClient("mongodb+srv://ploy:ploy@cs266.hlnjicp.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true });
    
    // Use a try-finally block to ensure the connection is closed even if an error occurs
    try {
      await client.connect();

      // Specify the database and collection to delete the tag from
      const database = client.db("CS266");
      const collection = database.collection("Tag");

      // Delete the tag from MongoDB
      const result = await collection.deleteOne({ _id: new ObjectId(tagId) });


      if (result.deletedCount === 1) {
        console.log('Tag deleted successfully:', result);
        res.json({ success: true, message: 'Tag deleted successfully' });
      } else {
        console.log('Tag not found:', result);
        res.status(404).json({ success: false, message: 'Tag not found' });
      }
    } finally {
      // Close the MongoDB connection in the finally block
      await client.close();
    }
  } catch (error) {
    // Log any errors that occur during the deletion process
    console.error('Error deleting tag:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.post('/submitForm', async (req, res) => {
  let client
  try {
    // Connect to MongoDB
    client = new MongoClient("mongodb+srv://ploy:ploy@cs266.hlnjicp.mongodb.net/");
    await client.connect();

    // Specify the database and collection you want to insert data into
    const database = client.db("CS266");
    const collection = database.collection("User");

    // Get the data from the request body
    const { input_type, date, amount, tag, text } = req.body;

    // Log the request body
    console.log('Request Body:', req.body);

    // Document to be inserted
    const documentToInsert = {
      input_type: input_type,
      date: date,
      amount: amount,
      tag: tag,
      text: text,
    };

    // Insert the document
    const result = await collection.insertOne(documentToInsert);

    console.log(`Document inserted with _id: ${result.insertedId}`);

    res.send('Data inserted successfully!');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
});

// ...

app.post('/addtag', async (req, res) => {
  let client;
  try {
    // Connect to MongoDB
    client = new MongoClient("mongodb+srv://ploy:ploy@cs266.hlnjicp.mongodb.net/");
    await client.connect();

    // Specify the database and collection you want to insert data into
    const database = client.db("CS266");
    const collection = database.collection("Tag");

    // Get the data from the request body
    const { tag } = req.body;

    // Document to be inserted
    const documentToInsert = {
      tag: tag,
    };

    // Insert the document
    const result = await collection.insertOne(documentToInsert);

    console.log(`Document inserted with _id: ${result.insertedId}`);

    res.send('Data inserted successfully!');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
});

module.exports = app;
