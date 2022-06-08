const express = require('express') ; 
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()  
const cors = require('cors');   
require('dotenv').config()  
const port = process.env.PORT||5000
//middle ware 
app.use(cors());
app.use(express.json()) ; 

// connnet with mongodb 



const uri = `mongodb+srv://${process.env.TRAVEL_USER}:${process.env.TRAVEL_PASS}@cluster0.iyeky.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  
  async function run(){ 
      try {
        await client.connect(); 
        const travelCollection = client.db("Travel").collection('service'); 
        // get service 
        app.get('/service',async(req,res)=>{ 
            const query = {} ;
            const cursor = travelCollection.find(query); 
            const services = await cursor.toArray() ;
            res.send(services);
         }) 
  // single service load 
     app.get('/service/:id',async(req,res)=>{ 
         const id = req.params.id  ;
         const query = {_id:ObjectId(id)} ; 
         const service = await travelCollection.findOne(query) ;
         res.send(service)

     })
     


      } finally {
          
      }
  }



app.get('/', (req, res) => {
    res.send('Hello World!')
  }) 
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  //run().catch(console.dir)
run().catch(console.dir)
 app.get('/',(req,res)=>{ 
     res.send("runnig server")
 }) 