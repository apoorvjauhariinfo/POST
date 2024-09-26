const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

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
const Request = require("./model/request");

const codeEmail = require("./utils/sendCodeEmail.js");
const sendEmail = require("./utils/sendInventoryEmail.js");
const sendAdminEmail = require("./utils/sendAdminEmail.js");

const NewUser = require("./model/userschema.js");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const { isSharedArrayBuffer } = require("util/types");

app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" })); // or higher limit as needed
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// DB config
//const db = require('./config/keys').MongoURI;
mongoose.set("strictQuery", true);

// connect to mongo
//Production URI
//mongoose.connect("mongodb+srv://apoorvinfo:Apj171096@cluster0.af4k34f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
//Development URI
mongoose
  .connect(
    "mongodb+srv://apoorvinfo:Apj171096@cluster0.af4k34f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
  )
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
app.get('/check-email', async (req, res) => {
  try {
    const { email } = req.query;

    // Check if the email exists in the database
    const user = await NewUser.findOne({ email });

    if (user) {
      return res.json({ exists: true }); // Email exists
    } else {
      return res.json({ exists: false }); // Email does not exist
    }
  } catch (error) {
    console.error('Error checking email:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
app.get("/products", async (req, res) => {
  //const { walletAddress } = req.params;
  const document = await Product.find();

  res.json({ document });
});

//Get Request by Hospitalid
app.get("/requestbyhospitalid/:hospitalid", async (req, res) => {
  const { hospitalid } = req.params;

  try {
    const requests = await Request.find({ hospitalid });

    // Fetch product and inventory manager details for each request
    const document = await Promise.all(
      requests.map(async (request) => {
        const product = await Product.findById(request.productid, {
          productImage: 0,
        });
        const inventoryManager = await InventoryManager.findById(
          request.inventorymanagerid,
        );

        return {
          ...request._doc, // Spread the request document fields
          productDetails: product,
          IMDetails: inventoryManager,
        };
      }),
    );

    res.json({ document });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/inventorymanagerbyhospitalid/:hospitalid", async (req, res) => {
  const { hospitalid } = req.params;

  try {
    const document = await InventoryManager.find({ hospitalid });
    res.json({ document });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//Get Admin by ID
app.get("/adminbyid/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const document = await Admin.find({ _id: id });
    res.json({ document });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Get Request by Id
app.get("/requestbyid/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const document = await Request.find({ _id: id });
    res.json({ document });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Get Inventory Manager by Id
app.get("/imbyid/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const document = await InventoryManager.find({ _id: id });
    res.json({ document });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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

//Get Hospital by Id
app.get("/hospitalbyid/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const document = await Hospital.find({ _id: id });
    res.json({ document });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/hospitalbyuserid/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const document = await Hospital.findOne({ userid: id }); // Assuming 'userid' is the field in the Hospital model
    res.json({ document });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Get Inventory Manager By ID
app.get("/inventorymanagerbyid/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const document = await InventoryManager.find({ _id: id });
    res.json({ document });
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
app.get("/productcountbyhospitalid/:hospitalid", async (req, res) => {
  const { hospitalid } = req.params;

  try {
    const productCount = await Product.countDocuments({ hospitalid });
    res.json({ count: productCount });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Get All Stocks by using Hospital ID
app.get("/stockbyhospitalid/:hospitalid", async (req, res) => {
  const { hospitalid } = req.params;

  try {
    const document = await Stock.find({ hospitalid });
    res.json({ document });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/issuedbyhospitalid/:hospitalid", async (req, res) => {
  const { hospitalid } = req.params;

  try {
    const document = await Issued.find({ hospitalid });
    res.json({ document });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/historybyhospitalid/:hospitalid", async (req, res) => {
  const { hospitalid } = req.params;

  try {
    const document = await History.find({ hospitalid });
    res.json({ document });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/historybyproductid/:productid", async (req, res) => {
  const { productid } = req.params;

  try {
    const documents = await History.find({ productid });
    res.json({ documents });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/stockbyproductid/:productid", async (req, res) => {
  const { productid } = req.params;

  try {
    const documents = await Stock.find({ productid });
    res.json({ documents });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/historywithproductdetails/:hospitalid", async (req, res) => {
  const { hospitalid } = req.params;

  try {
    // Step 1: Find history documents for the given hospitalid
    const historyDocuments = await History.find({ hospitalid });

    // Step 2: Enhance each history document with product details
    const historyWithProductDetails = await Promise.all(
      historyDocuments.map(async (history) => {
        // Find product details using productid and hospitalid from the history document
        const product = await Product.findOne(
          {
            _id: history.productid,
            hospitalid: hospitalid, // Ensure the hospitalid matches
          },
          "name emergencytype",
        );

        // Combine history document with product details
        return {
          ...history._doc, // Spread the history document fields
          productDetails: product, // Attach the product details (will be null if no matching product is found)
        };
      }),
    );

    // Step 3: Return the combined result
    res.json({ historyWithProductDetails });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/historybyproductid/:productid", async (req, res) => {
  const { productid } = req.params;

  try {
    const documents = await History.find({ productid });
    res.json({ documents });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Get All Stock Details by using Product ID
app.get("/stockbyproductid/:productid", async (req, res) => {
  const { productid } = req.params;

  try {
    const stockDetails = await Stock.find({ productid });
    res.json({ stockDetails });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Get All Issue Details by using Product ID
app.get("/issuebyproductid/:productid", async (req, res) => {
  const { productid } = req.params;

  try {
    const issueDetails = await Issued.find({ productid });
    res.json({ issueDetails });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Searching Products
app.get("/api/products/search", async (req, res) => {
  const searchTerm = req.query.q;
  const hospitalid = req.query.hospitalid; // Get the hospitalid from the query string

  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: new RegExp(searchTerm, "i") } },
        { upccode: { $regex: new RegExp(searchTerm, "i") } },
      ],
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
      { new: true },
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

app.put("/updaterequests/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Assuming Request is your Mongoose model
    const document = await Request.findOneAndUpdate(
      { _id: id },
      { status },
      { new: true },
    );

    if (document) {
      res.json({ document });
    } else {
      res.status(404).json({ error: "Request not found" });
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
      { new: true },
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
    const { firstname, lastname, email, phone, password } = req.body;

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
      { new: true },
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

app.put("/updateexistingim/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, email, password } = req.body;

    // Assuming User is your Mongoose model
    const document = await InventoryManager.findByIdAndUpdate(
      id,
      {
        name,
        phone,
        email,
        password,
      },
      { new: true },
    );

    if (document) {
      res.json({ document });
    } else {
      res.status(404).json({ error: "IM not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put(
  "/updateexistinghospital/:id",
  upload.single("profileImage"),
  async (req, res) => {
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
        profileImage,
      } = req.body;
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

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
          profileImage: req.file.buffer,
        },
        { new: true },
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
  },
);

//To update the existing product
app.put("/updateexistingproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      producttype,
      category,
      subcategory,
      upccode,
      name,
      manufacturer,
      origin,
      emergencytype,
      description,
      // productImage,
    } = req.body;

    // Assuming User is your Mongoose model
    const document = await Product.findByIdAndUpdate(
      id,
      {
        producttype,
        category,
        subcategory,
        upccode,
        name,
        manufacturer,
        origin,
        emergencytype,
        description,
        // productImage,
      },
      { new: true },
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
      { new: true },
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
      { new: true },
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
      { new: true },
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
      { new: true },
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
      { new: true },
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

//Delete the particular Inventorymanager
app.delete("/deleteim/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Assuming Admin is your Mongoose model
    const document = await InventoryManager.findByIdAndDelete(id);

    if (document) {
      res.json({ message: "IM deleted successfully" });
    } else {
      res.status(404).json({ error: "IM not found" });
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
app.get("/unverifieduserscount", async (req, res) => {
  const count = await NewUser.countDocuments({ verified: false });

  res.json({ count });
});

app.get("/unverifieduser", async (req, res) => {
  const document = await NewUser.find({ verified: false });

  res.json({ document });
});

app.get("/stocks/buffervalue", async (req, res) => {
  try {
    // Fetch all documents from the collection
    const stocks = await Stock.find();

    // Filter stocks where totalquantity and buffervalue (both as integers) satisfy the conditions
    const count = stocks.filter((stock) => {
      const totalQuantityInt = parseInt(stock.totalquantity, 10);
      const bufferValueInt = parseInt(stock.buffervalue, 10);

      return totalQuantityInt < bufferValueInt && totalQuantityInt > 1;
    }).length;

    res.json({ count });
  } catch (err) {
    console.error("Error counting documents:", err);
    res
      .status(500)
      .json({ error: "An error occurred while counting the documents." });
  }
});

app.get("/stocks/outvalue", async (req, res) => {
  try {
    const countPipeline = [
      {
        $match: {
          totalquantity: { $lte: "1" }, // Condition based on totalquantity
        },
      },
      {
        $addFields: {
          productidObj: { $toObjectId: "$productid" },
          hospitalidObj: { $toObjectId: "$hospitalid" },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productidObj",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $lookup: {
          from: "hospitals",
          localField: "hospitalidObj",
          foreignField: "_id",
          as: "hospitalDetails",
        },
      },
      {
        $unwind: {
          path: "$productDetails",
          preserveNullAndEmptyArrays: false, // Exclude stocks without matching products
        },
      },
      {
        $unwind: {
          path: "$hospitalDetails",
          preserveNullAndEmptyArrays: false, // Exclude stocks without matching hospitals
        },
      },
    ];

    // Use the pipeline to count matching documents
    const count = await Stock.aggregate([
      ...countPipeline,
      { $count: "count" },
    ]);

    res.json({ count: count.length > 0 ? count[0].count : 0 });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while counting the documents." });
  }
});

const ObjectId = mongoose.Types.ObjectId;

app.get("/stocks/outvalue/details", async (req, res) => {
  try {
    const stocks = await Stock.aggregate([
      {
        $match: {
          totalquantity: { $lte: "1" }, // Ensure this is correct based on how totalquantity is stored
        },
      },
      {
        $addFields: {
          productidObj: { $toObjectId: "$productid" },
          hospitalidObj: { $toObjectId: "$hospitalid" },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productidObj",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $lookup: {
          from: "hospitals",
          localField: "hospitalidObj",
          foreignField: "_id",
          as: "hospitalDetails",
        },
      },
      {
        $unwind: {
          path: "$productDetails",
          preserveNullAndEmptyArrays: false, // Exclude stocks without matching products
        },
      },
      {
        $unwind: {
          path: "$hospitalDetails",
          preserveNullAndEmptyArrays: false, // Exclude stocks without matching hospitals
        },
      },
      {
        $project: {
          totalquantity: 1, // Include totalquantity
          productid: 1, // Include productid
          hospitalid: 1,
          batchno: 1,
          unitcost: 1, // Include hospitalid
          productDetails: {
            name: 1, // Include specific fields from productDetails
            manufacturer: 1,
            origin: 1,
            emergencytype: 1, // Example: price, adjust as needed
            // Exclude productImage
          },
          hospitalDetails: {
            hospitalname: 1, // Include specific fields from hospitalDetails
            phone: 1, // Example: address, adjust as needed
            // Exclude profileImage
          },
        },
      },
    ]);

    res.json(stocks);
  } catch (error) {
    console.error("Error retrieving stocks:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the stocks." });
  }
});

app.get("/stocks/buffervalue/details", async (req, res) => {
  try {
    // Fetch all documents from the collection
    const stocks = await Stock.find();

    // Filter stocks where totalquantity and buffervalue (both as integers) satisfy the conditions
    const filteredStocks = stocks.filter((stock) => {
      const totalQuantityInt = parseInt(stock.totalquantity, 10);
      const bufferValueInt = parseInt(stock.buffervalue, 10);

      return totalQuantityInt < bufferValueInt && totalQuantityInt > 1;
    });

    // Populate product and hospital details for each filtered stock
    const detailedStocks = await Promise.all(
      filteredStocks.map(async (stock) => {
        const productDetails = await Product.findById(stock.productid).select(
          "name manufacturer origin emergencytype",
        );
        const hospitalDetails = await Hospital.findById(
          stock.hospitalid,
        ).select("hospitalname phone");

        return {
          ...stock._doc, // Spread the original stock fields
          productDetails,
          hospitalDetails,
        };
      }),
    );

    res.json(detailedStocks);
  } catch (err) {
    console.error("Error retrieving stocks:", err);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the stocks." });
  }
});
app.get(
  "/stocks/buffervalue/details/hospital/:hospitalid",
  async (req, res) => {
    const { hospitalid } = req.params;

    try {
      // Fetch all stocks for the given hospitalid
      const stocks = await Stock.find({ hospitalid });

      // Filter stocks where totalquantity and buffervalue (both as integers) satisfy the conditions
      const filteredStocks = stocks.filter((stock) => {
        const totalQuantityInt = parseInt(stock.totalquantity, 10);
        const bufferValueInt = parseInt(stock.buffervalue, 10);

        return totalQuantityInt < bufferValueInt && totalQuantityInt > 1;
      });

      // Populate product details for each filtered stock
      const documents = await Promise.all(
        filteredStocks.map(async (stock) => {
          // Fetch product details
          const productDetails = await Product.findById(stock.productid).select(
            "name producttype category manufacturer origin emergencytype",
          );

          return {
            ...stock._doc, // Spread the original stock fields
            productDetails,
          };
        }),
      );

      res.json(documents);
    } catch (err) {
      console.error("Error retrieving stocks:", err);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the stocks." });
    }
  },
);
app.get("/stocks/outvalue/details/hospital/:hospitalid", async (req, res) => {
  const { hospitalid } = req.params;

  try {
    // Fetch all stocks for the given hospitalid
    const stocks = await Stock.find({ hospitalid });

    // Filter stocks where totalquantity and buffervalue (both as integers) satisfy the conditions
    const filteredStocks = stocks.filter((stock) => {
      const totalQuantityInt = parseInt(stock.totalquantity, 10);
      return totalQuantityInt < 1;
    });

    // Populate product details for each filtered stock
    const documents = await Promise.all(
      filteredStocks.map(async (stock) => {
        // Fetch product details
        const productDetails = await Product.findById(stock.productid).select(
          "name producttype category manufacturer origin emergencytype",
        );

        return {
          ...stock._doc, // Spread the original stock fields
          productDetails,
        };
      }),
    );

    res.json(documents);
  } catch (err) {
    console.error("Error retrieving stocks:", err);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the stocks." });
  }
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

app.get("/stocks", async (req, res) => {
  //const { walletAddress } = req.params;
  const document = await Stock.find();

  res.json({ document });
});

app.get("/hospitals", async (req, res) => {
  //const { walletAddress } = req.params;
  const document = await Hospital.find();

  res.json({ document });
});

app.get("/hospitalsdata", async (req, res) => {
  try {
    // Fetch all hospital documents excluding the profileImage field
    const documents = await Hospital.find().select("-profileImage");

    res.json({ documents });
  } catch (err) {
    console.error("Error retrieving hospitals:", err);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the hospitals." });
  }
});

app.get("/productsdata/:hospitalid", async (req, res) => {
  const { hospitalid } = req.params;

  try {
    // Fetch product documents for the specific hospitalid and exclude the profileImage field
    const documents = await Product.find({ hospitalid }).select(
      "-productImage",
    );

    res.json({ documents });
  } catch (err) {
    console.error("Error retrieving products:", err);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the products." });
  }
});

app.get("/aggregatedstocks/:hospitalid", async (req, res) => {
  const { hospitalid } = req.params;

  try {
    const documents = await Stock.aggregate([
      {
        $match: {
          hospitalid: hospitalid,
          $expr: { $gte: [{ $toDouble: "$totalquantity" }, 1] }, // Filter stocks where totalquantity >= 1
        },
      },
      {
        $lookup: {
          from: "products", // Name of the Product collection
          let: { productid: "$productid" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", { $toObjectId: "$$productid" }], // Convert productid to ObjectId for matching
                },
              },
            },
            {
              $project: {
                name: 1,
                producttype: 1,
                category: 1,
                manufacturer: 1,
                emergencytype: 1,
              }, // Include only the necessary fields
            },
          ],
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails", // Unwind the array of productDetails to get individual objects
      },
      {
        $addFields: {
          stock_id: "$_id", // Retain the original Stock _id in a new field
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            _id: "$stock_id", // Ensure the _id is the original Stock _id
            hospitalid: "$hospitalid", // Include stock fields explicitly
            productid: "$productid",
            batchno: "$batchno",
            unitcost: "$unitcost",
            totalquantity: "$totalquantity",
            gst: "$gst",
            grandtotal: "$grandtotal",
            productDetails: "$productDetails", // Include the merged product details
          },
        },
      },
    ]);

    res.json({ documents });
  } catch (error) {
    console.error("Error retrieving aggregated stocks:", error);
    res.status(500).json({
      error: "An error occurred while retrieving the aggregated stocks.",
    });
  }
});

app.get("/aggregatedissueds/:hospitalid", async (req, res) => {
  const { hospitalid } = req.params;

  try {
    const documents = await Issued.aggregate([
      {
        $match: {
          hospitalid: hospitalid,
        },
      },
      {
        $lookup: {
          from: "products", // Name of the Product collection
          let: { productid: "$productid" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", { $toObjectId: "$$productid" }], // Convert productid to ObjectId for matching
                },
              },
            },
            {
              $project: {
                name: 1,
                producttype: 1,
                category: 1,
                manufacturer: 1,
                emergencytype: 1,
              }, // Include only the necessary fields
            },
          ],
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $lookup: {
          from: "histories", // Name of the Product collection
          let: {
            productid: "$productid",
            hospitalid: "$hospitalid",
            quantityissued: "$quantityissued",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$hospitalid", "$$hospitalid"] },
                    { $eq: ["$productid", "$$productid"] },
                    { $eq: ["$type", "Product Issued"] },
                    { $eq: ["$quantity", "$$quantityissued"] },
                  ],
                },
              },
            },
            {
              $project: {
                date: 1,
              }, // Include only the necessary fields
            },
          ],
          as: "history",
        },
      },
      {
        $unwind: "$history", // Unwind the array of productDetails to get individual objects
      },
      {
        $group: {
          _id: {
            issuedId: "$_id",
            hospitalid: "$hospitalid",
            productid: "$productid",
          },
          firstname: { $first: "$firstname" },
          lastname: { $first: "$lastname" },
          department: { $first: "$department" },
          subdepartment: { $first: "$subdepartment" },
          quantityissued: { $first: "$quantityissued" },
          productDetails: { $first: "$productDetails" },
          history: { $push: "$history" },
        },
      },
      {
        $project: {
          _id: "$_id.issuedId",
          hospitalid: "$_id.hospitalid",
          productid: "$_id.productid",
          firstname: 1,
          lastname: 1,
          department: 1,
          subdepartment: 1,
          quantityissued: 1,
          productDetails: 1,
          history: 1,
        },
      },
    ]);

    res.json({ documents });
  } catch (error) {
    console.error("Error retrieving aggregated stocks:", error);
    res.status(500).json({
      error: "An error occurred while retrieving the aggregated stocks.",
    });
  }
});

//Admin routes
//Dummy Type API fro count check
app.get("/hospitalsnumber", async (req, res) => {
  const count = await Hospital.countDocuments();

  res.json({ count });
});

app.get("/productcountbyid/:id", async (req, res) => {
  try {
    const hospitalId = req.params.id;
    const count = await Product.countDocuments({ hospitalid: hospitalId });

    res.json({ count });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the product count." });
  }
});
app.get("/stockcountbyhospitalid/:id", async (req, res) => {
  try {
    const hospitalId = req.params.id;

    // Count the stocks that match the hospitalid and have totalquantity > 0
    const count = await Stock.countDocuments({
      hospitalid: hospitalId,
      totalquantity: { $gt: 0 },
    });

    res.json({ count });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the stock count." });
  }
});

app.get("/bufandout/:id", async (req, res) => {
  try {
    const hospitalId = req.params.id;

    // Count 1: Stocks where buffervalue >= totalquantity and totalquantity >= 1
    const buffer = await Stock.countDocuments({
      hospitalid: hospitalId,
      $expr: {
        $and: [
          {
            $gte: [
              { $toDouble: "$buffervalue" },
              { $toDouble: "$totalquantity" },
            ],
          }, // Convert strings to numbers for comparison
          { $gte: [{ $toDouble: "$totalquantity" }, 1] }, // Ensure totalquantity >= 1
        ],
      },
    });

    // Count 2: Stocks where totalquantity < 1
    const out = await Stock.countDocuments({
      hospitalid: hospitalId,
      $expr: {
        $lt: [{ $toDouble: "$totalquantity" }, 1], // Convert totalquantity to number and check if it's < 1
      },
    });

    res.json({ buffer, out });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the stock counts." });
  }
});

app.get("/availcountbyid/:id", async (req, res) => {
  try {
    const hospitalId = req.params.id;

    // Find products that are in both the Product collection and Stocks collection with the same hospitalid
    const count = await Product.aggregate([
      {
        $match: { hospitalid: hospitalId }, // Filter by hospitalid
      },
      {
        $lookup: {
          from: "stocks", // Name of the Stocks collection
          localField: "_id", // Field from Product collection to match
          foreignField: "productid", // Field from Stocks collection to match
          as: "stockDetails",
        },
      },
      {
        $match: { "stockDetails.hospitalid": hospitalId }, // Ensure the hospitalid matches in Stocks as well
      },
      {
        $count: "matchingProducts", // Count the matching documents
      },
    ]);

    // If the count array is empty, it means no matching documents were found
    const productCount = count.length > 0 ? count[0].matchingProducts : 0;

    res.json({ count: productCount });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the product count." });
  }
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

app.post("/posthospitals", upload.single("profileImage"), async (req, res) => {
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
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

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
    profileImage: req.file.buffer,
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
    const url = `https://hintel.semamart.com/inventorymanagers/${generatedId}`;

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
    const url = `https://hintel.semamart.com/admins/${generatedId}`;

    await sendAdminEmail(req.body.email, url);
    res.send("inserted data..");
  } catch (err) {
    console.log(err);
  }
});

app.post("/postrequests", async (req, res) => {
  const userid = req.body.userid;
  const hospitalid = req.body.hospitalid;
  const inventorymanagerid = req.body.inventorymanagerid;
  const productid = req.body.productid;
  const demand = req.body.demand;

  const status = req.body.status;
  const requestdate = req.body.requestdate;

  const formData = new Request({
    userid,
    hospitalid,
    inventorymanagerid,
    productid,
    demand,
    status,
    requestdate,
  });

  try {
    await formData.save();
    const generatedId = formData._id;
    // const url = `${process.env.URL}admins/${generatedId}`;

    // await sendAdminEmail(req.body.email, url);
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
  const date = req.body.date;

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
    date,
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
    gst,
    grandtotal,
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
    gst,
    grandtotal,
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
  const subdepartment = req.body.subdepartment;
  const quantityissued = req.body.quantityissued;

  const issue = new Issued({
    hospitalid,
    productid,
    firstname,
    lastname,
    department,
    subdepartment,
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
  const remark = req.body.remark;

  const history = new History({
    hospitalid,
    date,
    productid,
    quantity,
    type,
    remark,
  });

  try {
    await history.save();
    res.send("inserted stock issued..");
  } catch (err) {
    console.log(err);
  }
});

//get requests by inventorymanagerid
app.get("/requestbyImId/:imId", async (req, res) => {
  try {
    const { imId } = req.params;
    const document = await Request.find({
      inventorymanagerid: imId,
    }).populate({
      path: "productid",
      model: "Product",
      select: "-image", // exclude the 'image' field from the populated product details
    });

    res.status(200).json({ document });
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: "Error fetching data", error: e });
  }
});

const port = process.env.SERVER_PORT || 4000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.get("/checkupc/:hospitalid/:upccode", async (req, res) => {
  const { hospitalid, upccode } = req.params;
  const product = await Product.findOne({ upccode, hospitalid });
  res.json({ exists: !!product });
});
