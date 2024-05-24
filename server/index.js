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
mongoose.connect("mongodb+srv://apoorvinfo:Apj%40171096@cluster0.xdvwkbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
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

// app.get('/hospitals', async (req, res) => {
//     //const { walletAddress } = req.params;
//     const document = await Hospital.find()
    
//     res.json({ document });
//   });
  app.get('/products', async (req, res) => {
    //const { walletAddress } = req.params;
    const document = await Product.find()
    
    res.json({ document });
  });
  app.get('/stocks', async (req, res) => {
    //const { walletAddress } = req.params;
    const document = await Stock.find()
    
    res.json({ document });
  });
  // app.put('/updatestocks', async (req, res) => {
  //   //const { walletAddress } = req.params;
  //   const document = await Stock.findOneAndUpdate({ _id }, updateData, { new: true });    
  //   res.json({ document });
  // });

  app.put('/updatestocks/:id', async (req, res) => {
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
app.put('/updateexistingstocks/:id', async (req, res) => {
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
app.put('/updateexistinguser/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const { firstname,lastname,email,phone,address,landmark,pincode,district,state,password } = req.body;
      


      // Assuming User is your Mongoose model
      const document = await NewUser.findByIdAndUpdate(id, {firstname,lastname,email,phone,address,landmark,pincode,district,state,password},{new:true});
        

      if (document) {
          res.json({ document });
      } else {
          res.status(404).json({ error: "User not found" });
      }
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});
app.put('/updateexistinghospital/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const { hospitalname, billingname, email, address, beds, district, state, pincode, phone, ceanumber } = req.body;
      


      // Assuming User is your Mongoose model
      const document = await Hospital.findByIdAndUpdate(id, { hospitalname, billingname, email, address, beds, district, state, pincode, phone, ceanumber},{new:true});
        

      if (document) {
          res.json({ document });
      } else {
          res.status(404).json({ error: "Hospital not found" });
      }
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});
app.put('/updateexistingdepartment/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const { hospitalid, department } = req.body;
      


      // Assuming User is your Mongoose model
      const document = await Department.findByIdAndUpdate(id, { hospitalid, department},{new:true});
        

      if (document) {
          res.json({ document });
      } else {
          res.status(404).json({ error: "Department not found" });
      }
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

  app.get('/issueds', async (req, res) => {
    //const { walletAddress } = req.params;
    const document = await Issued.find()
    
    res.json({ document });
  });

  app.get('/users', async (req, res) => {
    //const { walletAddress } = req.params;
    const document = await NewUser.find();
    
    res.json({ document });
  });  

  app.get('/departments', async (req, res) => {
    //const { walletAddress } = req.params;
    const document = await Department.find()
    
    res.json({ document });
  });  

  app.get('/history', async (req, res) => {
    //const { walletAddress } = req.params;
    const document = await History.find()
    
    res.json({ document });
  }); 

  app.get('/hospitals', async (req, res) => {
    //const { walletAddress } = req.params;
    const document = await Hospital.find()
    
    res.json({ document });
  }); 

 

app.post("/posthospitals", async (req, res) => {
  const userid = req.body.userid;
  const hospitalname = req.body.hospitalname;
  const billingname = req.body.billingname;
  const address = req.body.address;
  const beds = req.body.beds;

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
    beds,
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
    //res.send("inserted hospital..");
    res.json({ message: "Hospital inserted successfully", hospital: formData ,hospitalid: formData._id  });

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
app.post("/postproducts", async (req, res) => {
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

app.post("/poststocks", async (req, res) => {
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

app.post("/postissues", async (req, res) => {
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

app.post("/postdepartment", async (req, res) => {
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

app.post("/posthistory", async (req, res) => {
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

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
