const multer = require('multer');
const path = require('path');

// Configure multer to specify where to store uploaded files
// Set up Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:/Users/shiv_/Music/profiles')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
})

const Upload = multer({ storage: storage });

module.exports = Upload