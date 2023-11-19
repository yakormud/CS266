const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

const PORT = 8080;

app.get('/', (req, res) => {
  fs.readFile('./src/index.html', 'utf8', (err, html) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }

    res.send(html);
  });
});

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
});


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://yakor:yakor@cs266.hlnjicp.mongodb.net/?retryWrites=true&w=majority";

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

app.get('/user', async (req, res) => {
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


app.post('/insertData', async (req, res) => {
  try {
    // Connect to MongoDB
    const client = new MongoClient("mongodb+srv://yakor:yakor@cs266.hlnjicp.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
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


app.post('/submitForm', async (req, res) => {
  let client
  try {
    // Connect to MongoDB
    client = new MongoClient("mongodb+srv://yakor:yakor@cs266.hlnjicp.mongodb.net/?retryWrites=true&w=majority");
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


