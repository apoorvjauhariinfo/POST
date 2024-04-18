const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const User = require("./model/user");
const Product = require("./model/product"); 
const Stock = require("./model/stock");  
const Issued = require("./model/issue");  
const Department = require("./model/department");  
const History = require("./model/history");  
const Hospital = require("./model/hospitalschema");  



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

app.get('/api/hospitals', async (req, res) => {
    //const { walletAddress } = req.params;
    const document = await Hospital.find()
    
    res.json({ document });
  });
  app.get('/api/products', async (req, res) => {
    //const { walletAddress } = req.params;
    const document = await Product.find()
    
    res.json({ document });
  });
  app.get('/api/stocks', async (req, res) => {
    //const { walletAddress } = req.params;
    const document = await Stock.find()
    
    res.json({ document });
  });
  // app.put('/updatestocks', async (req, res) => {
  //   //const { walletAddress } = req.params;
  //   const document = await Stock.findOneAndUpdate({ _id }, updateData, { new: true });    
  //   res.json({ document });
  // });

  app.put('/api/updatestocks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { totalquantity } = req.body;
 
        // Assuming Stock is your Mongoose model
        const document = await Stock.findOneAndUpdate(
            { _id: id },
            { totalquantity },
            { new: true }
        );
 
        if (document) {
            res.json({ document });
        } else {
            res.status(404).json({ error: "Stock not found" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.put('/api/updateexistingstocks/:id', async (req, res) => {
  try {
      const { id } = req.params;
      

      const { batchno,unitcost,totalquantity,buffervalue,doe,dom } = req.body;
    
      // Assuming Stock is your Mongoose model
      const document = await Stock.findByIdAndUpdate(id, { batchno, unitcost,totalquantity,buffervalue,doe,dom }, { new: true });


      if (document) {
          res.json({ document });
      } else {
          res.status(404).json({ error: "Stock not found" });
      }
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

  app.get('/api/issueds', async (req, res) => {
    //const { walletAddress } = req.params;
    const document = await Issued.find()
    
    res.json({ document });
  });

  app.get('/read/users', async (req, res) => {
    //const { walletAddress } = req.params;
    const document = await NewUser.find();
    
    res.json({ document });
  });  

  app.get('/api/departments', async (req, res) => {
    //const { walletAddress } = req.params;
    const document = await Department.find()
    
    res.json({ document });
  });  

  app.get('/api/history', async (req, res) => {
    //const { walletAddress } = req.params;
    const document = await History.find()
    
    res.json({ document });
  }); 

  app.get('/api/hospitals', async (req, res) => {
    //const { walletAddress } = req.params;
    const document = await Hospital.find()
    
    res.json({ document });
  }); 

 

app.post("/api/posthospitals", async (req, res) => {
  const userid = req.body.userid;
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
    userid,
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
    let hospital = await Hospital.findOne({ email: req.body.email });
    hospital = await new Hospital({ ...req.body }).save();

    await formData.save();
    res.send(hospital);
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/postusers", async (req, res) => {
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
app.post("/api/postproducts", async (req, res) => {
  const hospitalid = req.body.hospitalid
  const producttype = req.body.producttype 
  const category = req.body.category 
  const subcategory = req.body.subcategory 

  const upccode = req.body.upccode;
  const name = req.body.name;
  const manufacturer = req.body.manufacturer;
  const origin = req.body.origin;

  const emergencytype = req.body.emergencytype;
  const description = req.body.description;

  const product = new Product({
    hospitalid,
    producttype,
    category,
    subcategory,
    upccode,
    name,
    manufacturer,
    origin,
    emergencytype,
    description,
   
  });

  try {
    await product.save();
    res.send("inserted product..");
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/poststocks", async (req, res) => {
  const hospitalid = req.body.hospitalid

  const productid = req.body.productid 
  const batchno = req.body.batchno 
  const unitcost = req.body.unitcost;
  const totalquantity = req.body.totalquantity;
  const buffervalue = req.body.buffervalue;
  const doe = req.body.doe;
  const dom = req.body.dom;

  const stock = new Stock({
    hospitalid,
    productid,
    batchno,
    unitcost,
    totalquantity,
    buffervalue,
    doe,
    dom,
   
  });

  try {
    await stock.save();
    res.send("inserted stock..");
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/postissues", async (req, res) => {
  const hospitalid = req.body.hospitalid

  const productid = req.body.productid 
  const firstname = req.body.firstname 
  const lastname = req.body.lastname;
  const department = req.body.department;
  const quantityissued = req.body.quantityissued;
  

  const issue = new Issued({
    hospitalid,
    productid,
    firstname,
    lastname,
    department,
    quantityissued,
    
   
  });

  try {
    await issue.save();
    res.send("inserted stock issued..");
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/postdepartment", async (req, res) => {
  const hospitalid = req.body.hospitalid

  const department = req.body.department 
  
  
  

  const dep = new Department({
    hospitalid,
   department,
    
   
  });

  try {
    await dep.save();
    res.send("inserted stock issued..");
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/posthistory", async (req, res) => {
  const hospitalid = req.body.hospitalid

  const date = req.body.date 
  const productid = req.body.productid 
  const quantity = req.body.quantity 
  const type = req.body.type 
  
  

  const history = new History({
    hospitalid,
    date,
    productid,
    quantity,
    type,
   
    
   
  });
   
 

  try {
    await history.save();
    res.send("inserted stock issued..");
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 4000; 
app.use('/', require('../src/App.js')); 
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
