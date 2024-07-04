const multer = require("multer");

// Set up multer memory storage
const storage = multer.memoryStorage();

// Create the multer upload instance
const upload = multer({ storage });

module.exports = upload;
