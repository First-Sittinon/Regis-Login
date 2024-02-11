const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const { MongoClient } = require("mongodb");
const uri = "mongodb://myUserAdmin:myUserAdmin@localhost:27017";

// เส้น user login -------------------------------------------
app.post('/login', async(req, res) => {
    const {email, password} = req.body;
    const client = new MongoClient(uri);
    await client.connect();
    const user = await client.db('mydb').collection('users').findOne({"email": email, "password": password});
    await client.close();

    if (!user) {
        res.send({
            "status": "!"
        })
    } else {
        res.status(200).send({
            "status": "ok"
          });
    }  
  })


// เส้น user page ---------------------------------------------
  app.get('/user/:email', async(req, res) => {
    const email = req.params.email;
    const client = new MongoClient(uri);
    await client.connect();
    const user = await client.db('mydb').collection('users').findOne({"email": email});
    await client.close();

    res.status(200).send({
        "avatar": user.avatar,
        "username": user.username,
        "email": user.email,
        "fname": user.fname,
        "lname": user.lname
    });
  });

// เส้น สมัคสมากชิก ------------------------------------------------------------------
  app.post('/register', async(req, res) => {
    const {email, username, fname, lname, pass, avatar} = req.body;
    const client = new MongoClient(uri);
    await client.connect();
    const user = await client.db('mydb').collection('users').findOne({"email": email});
    if (!user) {
    await client.db('mydb').collection('users').insertOne({
      email: email,
      username: username,
      fname: fname,
      lname: lname,
      password: pass,
      avatar: avatar
    });
      res.status(200).send({
      "status": "ok"
    });
    } else {
      res.send({
        "status": "!"
    })
    await client.close();

    }});






