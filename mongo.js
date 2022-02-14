
import { MongoClient } from "mongodb";
// Connection URI
const uri =
  "mongodb://127.0.0.1:27017/";
const dbname='test';
const collection = 'coords';
// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


async function ping() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to DB");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
// run().catch(console.dir);


async function insert(user, value) {

    try {
  
      await client.connect();
  
      const database = client.db(dbname);
  
      const movies = database.collection(collection);
  
      // create a document to be inserted
  
      const doc = { user: user, coord: value};
  
      const result = await movies.insertOne(doc);
  
      console.log(
  
        `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
  
      );
  
    } finally {
  
      await client.close();
  
    }
  
  }

// insert(1, [15.25]).catch(console.dir);

  
export {ping, insert};
