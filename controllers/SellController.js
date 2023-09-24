import multer from "multer";
import path from "path";

// Define the storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the directory where uploaded images will be stored
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for each uploaded image
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExtension);
  },
});

// Create a multer instance with the storage configuration
const upload = multer({ storage });
// const upload = multer({ storage,limits: { fileSize: 1024 * 1024 * 5 } }).array("images", 3);


const sellItem = (req, res) => {
  try {
    // Use the upload middleware to handle image uploads
    upload.array("images",3)(req, res, (err) => {
      if (err) {
        console.error("Error uploading images:", err);
        return res.status(500).send("Error uploading images");
      }
      const files = req.files;
      console.log(files);
      const formData = req.body;
      console.log(formData);

      // Respond with a success message or perform other actions
      return res.status(200).send("Item uploaded successfully");
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
};

export { sellItem };
