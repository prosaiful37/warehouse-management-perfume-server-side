const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;
const app = express();


//middel ware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ewzs8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

    try{
        await client.connect();
        const inventoryCollection = client.db('perfume').collection('product');


        app.get('/product', async(req, res) => {
            const query = {};
            const cursor = inventoryCollection.find(query)
            const products = await cursor.toArray();
            res.send(products)
        });


        app.get('/product/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const product = await inventoryCollection.findOne(query)
            res.send(product);

        });

        
    }
    finally{

    }

}

run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('perfume is running');
})

app.listen(port, () => {
    console.log("listening to ", port);
});
  