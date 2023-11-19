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

app.get('/history', async (req, res) => {
  // ...

  try {
    
    //Connect Syntax
    await client.connect();
    const database = client.db("CS266");
    const collection = database.collection("User");
    const collectionTag = database.collection("Tag");

    // Query Syntax
    const result = await collectionTag.find({}).toArray();
    const result2 = await collection.find().toArray();

    // Read the static HTML file
    const staticHTML = fs.readFileSync('./src/history.html', 'utf8');

    ///////////////// END OF SET-UP   NOW ITS HTML BUILDING /////////////////////////////////////

    // Build dynamic HTML content For result1
    let dynamicHTML = '<select name="tags" id="tags">';
      dynamicHTML += `<option value="None">No tag select</option>`;
      dynamicHTML += `<option value="Other">Other</option>`;
    result.forEach(row => {
      dynamicHTML += `<option value="${row.tag}">${row.tag}</option>`;
      //dynamicHTML += `<div>${doc.date}</div>`; 
    });
    dynamicHTML += '</select>';

    // Build dynamic HTML content For result2

    let dynamicHTML2 = '';
    result2.forEach(doc => {
      dynamicHTML2 += `<div>${doc.tag}</div>`; 
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Combine and sent to page
    const finalHTML = staticHTML.replace('<!-- Drop down tags goes here -->', dynamicHTML)
    //.replace('<!-- INSERT_DYNAMIC_CONTENT_HERE2 -->', dynamicHTML2);

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
  console.log("hihihihihihi");
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
    console.log(result);
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
    const client = new MongoClient("mongodb+srv://ploy:ploy@cs266.hlnjicp.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const database = client.db("CS266");
    const collection = database.collection("User");
    const collectionTag = database.collection("Tag");
    console.log('x');
      // Use the aggregation framework to sum up the values
    //  collection.aggregate([
    //     {
    //       $group: {
    //         _id: null,
    //         total: { $sum: '$amount' }
    //       }
    //     }
    //   ]).toArray(function (err, result) {
    //     if (err) throw err; else console.log("there");
    

        // const total = result.length > 0 ? result[0].total : 0;
        // console.log(total);

         // Find all documents in the collection
          const documents = await collection.find({}).toArray();
          
          // Sum up the values in the "amount" field
          const totalAmount = documents.reduce((sum, doc) => sum + (parseInt(doc.amount) || 0), 0);

          // Log the total amount
          console.log('Total Amount:', totalAmount);
          let homepage = fs.readFileSync('./src/home.html', 'utf8');
          console.log('hi');
          homepage = homepage.replace('{income}',totalAmount);
          // res.send(homepage);
        
//try
const documents2 = await collection.aggregate([
  {
    $group: {
      _id: '$input_type', // Group by input_type field
      totalAmount: { $sum: { $toInt: '$amount' } }// Sum the amount field
    }
  }
]).toArray();

console.log(totalAmount + 20) // this works
// Extract the results for income and expense
const incomeSum = (documents2.find(item => item._id === 'income') || {}).totalAmount || 0;
const expenseSum = (documents2.find(item => item._id === 'expense') || {}).totalAmount || 0;

console.log('Income Sum:', incomeSum);
console.log('Expense Sum:', expenseSum);


    // Query Syntax
    const result = await collectionTag.find({}).toArray();
    const result2 = await collection.find().toArray();

    // Read the static HTML file
    const staticHTML = fs.readFileSync('./src/home.html', 'utf8');

    ///////////////// END OF SET-UP   NOW ITS HTML BUILDING /////////////////////////////////////

    // Build dynamic HTML content For result1
    let dynamicHTML = '<select name="tags" id="tags">';
      dynamicHTML += `<option value="Other">Other</option>`;
    result.forEach(row => {
      dynamicHTML += `<option value="${row.tag}">${row.tag}</option>`;
      //dynamicHTML += `<div>${doc.date}</div>`; 
    });
    dynamicHTML += '</select>';

    // Build dynamic HTML content For result2

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
    //.replace('<!-- INSERT_DYNAMIC_CONTENT_HERE2 -->', dynamicHTML2);

    // Send the response
    res.send(finalHTML);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the connection
    await client.close();
  }
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
