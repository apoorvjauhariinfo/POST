const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Hospital = require("./model/hospitalschema.js"); 
const User = require("./model/user"); 
const NewUser = require("./model/userschema.js")
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");


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
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get('/hospitals', async (req, res) => {
    //const { walletAddress } = req.params;
    const document = await Hospital.find()
    
    res.json({ document });
  });

  app.get('/users', async (req, res) => {
    //const { walletAddress } = req.params;
    const document = await NewUser.findOne(req.body.email,req.body.password)
    
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

app.post("/postusers", async (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname; 
  const phone = req.body.phone;
  const email = req.body.email;
  const address = req.body.address;
  const landmark = req.body.landmark;
  const pincode = req.body.pincode;
  const district = req.body.district;
  const state = req.body.state;
  const hospitalname = req.body.hospitalname;
  const registeras = req.body.registeras;
  const password = req.body.password;
  const verified = req.body.verified;
 
  
  
  
 

  const formData = new User({
    firstname,
    lastname,
    phone,
    email,
    address,
    landmark,
    pincode,
    district,
    state,
    hospitalname,
    registeras,
    password,
    verified,
 
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
