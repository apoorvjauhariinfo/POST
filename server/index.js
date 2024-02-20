const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Hospital = require("./model/schema.js"); 

app.use(express.json());
app.use(cors());


// DB config
//const db = require('./config/keys').MongoURI; 
mongoose.set('strictQuery', true);


// connect to mongo 
mongoose.connect("mongodb+srv://apoorvinfo:Apj171096@cluster0.af4k34f.mongodb.net/?retryWrites=true&w=majority"
    , {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
  .then(() => 
    console.log('MongoDB Connected'))
  .catch( error => 
    console.log(error)
  );

  // bodyparser gets the req.body
app.use(express.urlencoded({extended: false}));

app.get('/hospitals', async (req, res) => {
    //const { walletAddress } = req.params;
    const document = await Hospital.find()
    
    res.json({ document });
  });

app.post("/posthospitals", async (req, res) => {
  const hospitalname = req.body.hospitalname;
  const billingname = req.body.billingname;
  const address = req.body.address;
  const ceanumber = req.body.ceanumber;
  const email = req.body.email;
  const phone = req.body.phone;
  const state = req.body.state;
  const district = req.body.district;
  const landmark = req.body.landmark;
  const pincode = req.body.pincode;
 

  const formData = new Hospital({
    hospitalname,
    billingname,
    address,
    ceanumber,
    email,
    phone,
    state,
    district,
    landmark,
    pincode,
 
  });

  try {
    await formData.save();
    res.send("inserted data..");
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 4000; 

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
