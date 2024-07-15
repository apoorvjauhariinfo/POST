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
const Product = require("./model/product");
const Stock = require("./model/stock");
const Issued = require("./model/issue");
const Department = require("./model/department");
const History = require("./model/history");
const Hospital = require("./model/hospitalschema");
const InventoryManager = require("./model/inventorymanager");
const Admin = require("./model/admin");

const codeEmail = require("./utils/sendCodeEmail.js")
const sendEmail = require("./utils/sendInventoryEmail.js");
const sendAdminEmail = require("./utils/sendAdminEmail.js");

const NewUser = require("./model/userschema.js");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use(cors());

// DB config
//const db = require('./config/keys').MongoURI;
mongoose.set("strictQuery", true);

// connect to mongo
//Production URI
//mongoose.connect("mongodb+srv://apoorvinfo:Apj171096@cluster0.af4k34f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
//Development URI
mongoose.connect("mongodb+srv://apoorvinfo:Apj%40171096@cluster0.xdvwkbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  , {
useUnifiedTopology: true,
useNewUrlParser: true,
})
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log(error));

// bodyparser gets the req.body
app.use(express.urlencoded({ extended: false }));
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// app.get('/hospitals', async (req, res) => {
//     //const { walletAddress } = req.params;
//     const document = await Hospital.find()

//     res.json({ document });
//   });
app.get("/products", async (req, res) => {
  //const { walletAddress } = req.params;
  const document = await Product.find();

  res.json({ document });
});

//Get Product by Id
app.get("/productbyid/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.find({ _id: id });
    res.json({ product });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//Get All Products by using Hospital ID
app.get("/productbyhospitalid/:hospitalid", async (req, res) => {
  const { hospitalid } = req.params;

  try {
    const products = await Product.find({ hospitalid });
    res.json({ products });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/stocks", async (req, res) => {
  //const { walletAddress } = req.params;
  const document = await Stock.find();

  res.json({ document });
});

// Searching Products
app.get("/api/products/search", async (req, res) => {
  const searchTerm = req.query.q;
  const hospitalid = req.query.hospitalid; // Get the hospitalid from the query string

  try {
    const products = await Product.find({
      name: { $regex: new RegExp(searchTerm, "i") },
      hospitalid: hospitalid, // Add this condition to filter by hospitalid
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
app.put("/updateexistinguser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstname,
      lastname,
      email,
      phone,
      password,
    } = req.body;

    // Assuming User is your Mongoose model
    const document = await NewUser.findByIdAndUpdate(
      id,
      {
        firstname,
        lastname,
        email,
        phone,
        password,
      },
      { new: true }
    );

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

app.put("/updateexistinghospital/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      hospitalname,
      billingname,
      email,
      address,
      beds,
      district,
      state,
      pincode,
      phone,
      ceanumber,
    } = req.body;

    // Assuming User is your Mongoose model
    const document = await Hospital.findByIdAndUpdate(
      id,
      {
        hospitalname,
        billingname,
        email,
        address,
        beds,
        district,
        state,
        pincode,
        phone,
        ceanumber,
      },
      { new: true }
    );

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

//To update the existing product
app.put("/updateexistingproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
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
    } = req.body;

    // Assuming User is your Mongoose model
    const document = await Product.findByIdAndUpdate(
      id,
      {
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
      },
      { new: true }
    );

    if (document) {
      res.json({ document });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.put("/updateexistingdepartment/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalid, department } = req.body;

    // Assuming User is your Mongoose model
    const document = await Department.findByIdAndUpdate(
      id,
      { hospitalid, department },
      { new: true }
    );

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

//Updating the USer's Verification Status
app.put("/updateuserstatus/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { verified } = req.body;

    // Assuming User is your Mongoose model
    const document = await NewUser.findByIdAndUpdate(
      id,
      { verified },
      { new: true }
    );

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

app.put("/updateim/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { password, status } = req.body;

    // Assuming User is your Mongoose model
    const document = await InventoryManager.findByIdAndUpdate(
      id,
      { password, status },
      { new: true }
    );

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
app.put("/updateadmin/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { password, status } = req.body;

    // Assuming User is your Mongoose model
    const document = await Admin.findByIdAndUpdate(
      id,
      { password, status },
      { new: true }
    );

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

//Delete the particular admin
app.delete("/deleteadmin/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Assuming Admin is your Mongoose model
    const document = await Admin.findByIdAndDelete(id);

    if (document) {
      res.json({ message: "Admin deleted successfully" });
    } else {
      res.status(404).json({ error: "Admin not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//For Deleting the user
app.delete("/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Assuming Admin is your Mongoose model
    const document = await NewUser.findByIdAndDelete(id);

    if (document) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//For Deleting the product
app.delete("/deleteproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Assuming Admin is your Mongoose model
    const document = await Product.findByIdAndDelete(id);


    if (document) {
      res.json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//For Deleting the stock
app.delete("/deletestock/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Assuming Admin is your Mongoose model
    const document = await Stock.findByIdAndDelete(id);


    if (document) {
      res.json({ message: "Stock deleted successfully" });
    } else {
      res.status(404).json({ error: "Stock not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//For Deleting the issued
app.delete("/deleteissued/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Assuming Admin is your Mongoose model
    const document = await Issued.findByIdAndDelete(id);


    if (document) {
      res.json({ message: "Issued deleted successfully" });
    } else {
      res.status(404).json({ error: "Issued not found" });
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

app.get("/inventorymanagers", async (req, res) => {
  //const { walletAddress } = req.params;
  const document = await InventoryManager.find();

  res.json({ document });
});
app.get("/admins", async (req, res) => {
  //const { walletAddress } = req.params;
  const document = await Admin.find();

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
    res.json({
      message: "Hospital inserted successfully",
      hospital: formData,
      hospitalid: formData._id,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/postusers", async (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const phone = req.body.phone;
  const email = req.body.email;
  // const address = req.body.address;
  // const landmark = req.body.landmark;
  // const pincode = req.body.pincode;
  // const district = req.body.district;
  // const state = req.body.state;
  const hospitalname = req.body.hospitalname;
  //const registeras = req.body.registeras;
  const password = req.body.password;
  const verified = req.body.verified;
  const formData = new User({
    firstname,
    lastname,
    phone,
    email,
    // address,
    // landmark,
    // pincode,
    // district,
    // state,
    hospitalname,
    // registeras,
    password,
    verified,
  });

  try {
    await formData.save();
    const generatedId = formData._id;
    const url = generatedId.substring(1, 5);

    await codeEmail(req.body.email, url);
    res.send("inserted data..");
  } catch (err) {
    console.log(err);
  }
});
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
    const url = `${process.env.URL}inventorymanagers/${generatedId}`;

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
    const url = `${process.env.URL}admins/${generatedId}`;

    await sendAdminEmail(req.body.email, url);
    res.send("inserted data..");
  } catch (err) {
    console.log(err);
  }
});
app.post("/postproducts", upload.single("productImage"), async (req, res) => {
  const hospitalid = req.body.hospitalid;
  const producttype = req.body.producttype;
  const category = req.body.category;
  const subcategory = req.body.subcategory;

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

const port = process.env.SERVER_PORT || 4000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
