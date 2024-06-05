const path = require("path");
const dotenv = require("dotenv");
// Configure the path to the .env file
const envPath = path.resolve(__dirname, "../.env.development");
dotenv.config({ path: envPath });

const express = require("express");
const upload = require("./utils/upload.js");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const User = require("./model/user");
<<<<<<< HEAD
const Product = require("./model/product"); 
const Stock = require("./model/stock");  
const Issued = require("./model/issue");  
const Department = require("./model/department");  
const History = require("./model/history");  
const Hospital = require("./model/hospitalschema");  
const InventoryManager = require("./model/inventorymanager");  
const Admin = require("./model/admin");  

const sendEmail = require("./utils/sendInventoryEmail.js");
const sendAdminEmail = require("./utils/sendAdminEmail.js");


const NewUser = require("./model/userschema.js")
=======
const Product = require("./model/product");
const Stock = require("./model/stock");
const Issued = require("./model/issue");
const Department = require("./model/department");
const History = require("./model/history");
const Hospital = require("./model/hospitalschema");

const NewUser = require("./model/userschema.js");
>>>>>>> 8f93ccfe1b20f4f1f15a0d4506f6509ab9b37bc5
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use(cors());

// DB config
//const db = require('./config/keys').MongoURI;
mongoose.set("strictQuery", true);

// connect to mongo
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log(error));

<<<<<<< HEAD
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
=======
// bodyparser gets the req.body
app.use(express.urlencoded({ extended: false }));
>>>>>>> 8f93ccfe1b20f4f1f15a0d4506f6509ab9b37bc5
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// app.get('/hospitals', async (req, res) => {
//     //const { walletAddress } = req.params;
//     const document = await Hospital.find()
<<<<<<< HEAD
    
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
=======
>>>>>>> 8f93ccfe1b20f4f1f15a0d4506f6509ab9b37bc5

//     res.json({ document });
//   });
app.get("/products", async (req, res) => {
  //const { walletAddress } = req.params;
  const document = await Product.find();

  res.json({ document });
});
app.get("/stocks", async (req, res) => {
  //const { walletAddress } = req.params;
  const document = await Stock.find();

  res.json({ document });
});

// Searching Products
app.get("/api/products/search", async (req, res) => {
  const searchTerm = req.query.q;

  try {
    const products = await Product.find({
      name: { $regex: new RegExp(searchTerm, "i") },
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
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

app.put('/updateim/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const { password, status } = req.body;
      


      // Assuming User is your Mongoose model
      const document = await InventoryManager.findByIdAndUpdate(id, { password, status},{new:true});
        

      if (document) {
          res.json({ document });
      } else {
          res.status(404).json({ error: "Inventory Manager not found" });
      }
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});
app.put('/updateadmin/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const { password, status } = req.body;
      


      // Assuming User is your Mongoose model
      const document = await Admin.findByIdAndUpdate(id, { password, status},{new:true});
        

      if (document) {
          res.json({ document });
      } else {
          res.status(404).json({ error: "Admin not found" });
      }
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.put('/updatestocks', async (req, res) => {
//   //const { walletAddress } = req.params;
//   const document = await Stock.findOneAndUpdate({ _id }, updateData, { new: true });
//   res.json({ document });
// });

app.put("/updatestocks/:id", async (req, res) => {
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
app.put("/updateexistingstocks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { batchno, unitcost, totalquantity, buffervalue, doe, dom } =
      req.body;

<<<<<<< HEAD
  app.get('/inventorymanagers', async (req, res) => {
    //const { walletAddress } = req.params;
    const document = await InventoryManager.find()
    
    res.json({ document });
  }); 
  app.get('/admins', async (req, res) => {
    //const { walletAddress } = req.params;
    const document = await Admin.find()
    
    res.json({ document });
  }); 

 
=======
    // Assuming Stock is your Mongoose model
    const document = await Stock.findByIdAndUpdate(
      id,
      { batchno, unitcost, totalquantity, buffervalue, doe, dom },
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

app.get("/issueds", async (req, res) => {
  //const { walletAddress } = req.params;
  const document = await Issued.find();

  res.json({ document });
});

app.get("/users", async (req, res) => {
  //const { walletAddress } = req.params;
  const document = await NewUser.find();

  res.json({ document });
});

app.get("/departments", async (req, res) => {
  //const { walletAddress } = req.params;
  const document = await Department.find();

  res.json({ document });
});

app.get("/history", async (req, res) => {
  //const { walletAddress } = req.params;
  const document = await History.find();

  res.json({ document });
});

app.get("/hospitals", async (req, res) => {
  //const { walletAddress } = req.params;
  const document = await Hospital.find();

  res.json({ document });
});
>>>>>>> 8f93ccfe1b20f4f1f15a0d4506f6509ab9b37bc5

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
<<<<<<< HEAD
    //res.send("inserted hospital..");
    res.json({ message: "Hospital inserted successfully", hospital: formData ,hospitalid: formData._id  });

=======
    res.send("inserted hospital..");
>>>>>>> 8f93ccfe1b20f4f1f15a0d4506f6509ab9b37bc5
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
<<<<<<< HEAD
=======

>>>>>>> 8f93ccfe1b20f4f1f15a0d4506f6509ab9b37bc5
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
<<<<<<< HEAD
app.post("/postinventorymanagers", async (req, res) => {
  const hospitalid = req.body.hospitalid;
  const userid = req.body.userid; 
  const role = req.body.role;
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;

  const status = req.body.status;
 
  const formData = new InventoryManager({
    hospitalid,
    userid,
    role,
    name,
    email,
    phone,
    password,
    status,
   
 
  });
  
  try {
    await formData.save();
    const generatedId = formData._id; 
    const url = `http://localhost:3000/inventorymanagers/${generatedId}`;

    await sendEmail(req.body.email, url);
    res.send("inserted data..");
  } catch (err) {
    console.log(err);
  }
});

app.post("/postadmins", async (req, res) => {
 
  const role = req.body.role;
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;

  const status = req.body.status;
 
  const formData = new Admin({
   
    role,
    name,
    email,
    phone,
    password,
    status,
   
 
  });
  
  try {
    await formData.save();
    const generatedId = formData._id; 
    const url = `http://localhost:3000/admins/${generatedId}`;

    await sendAdminEmail(req.body.email, url);
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
=======
console.log("Server is running");
app.post("/postproducts", upload.single("productImage"), async (req, res) => {
  const hospitalid = req.body.hospitalid;
  const producttype = req.body.producttype;
  const category = req.body.category;
  const subcategory = req.body.subcategory;
>>>>>>> 8f93ccfe1b20f4f1f15a0d4506f6509ab9b37bc5

  const upccode = req.body.upccode;
  const name = req.body.name;
  const manufacturer = req.body.manufacturer;
  const origin = req.body.origin;

  const emergencytype = req.body.emergencytype;
  const description = req.body.description;

  // console.log("Request body:", req.body);
  // console.log("Request file:", req.file);
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

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
    productImage: req.file.buffer,
  });

  try {
    await product.save();
    res.send("inserted product..");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/poststocks", async (req, res) => {
  const {
    hospitalid,
    productid,
    batchno,
    unitcost,
    totalquantity,
    buffervalue,
    doe,
    dom,
  } = req.body;

  // Log received values for debugging
  // console.log("Received values:", req.body);

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
    res.status(400).send("Error inserting stock");
  }
});

app.post("/postissues", async (req, res) => {
  const hospitalid = req.body.hospitalid;

  const productid = req.body.productid;
  const firstname = req.body.firstname;
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
  const hospitalid = req.body.hospitalid;

  const department = req.body.department;

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
  const hospitalid = req.body.hospitalid;

  const date = req.body.date;
  const productid = req.body.productid;
  const quantity = req.body.quantity;
  const type = req.body.type;

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

const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
