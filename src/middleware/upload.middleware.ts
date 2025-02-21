import multer from 'multer';
import path from "path";
import fs from "fs";

/**
 * Configures the storage engine for multer to store uploaded files on disk.
 * 
 * The storage engine is configured with the following options:
 * 
 * - `destination`: A function that determines the destination directory for uploaded files.
 *   - Creates the directory if it does not exist.
 *   - The directory path is constructed as `uploads/properties` relative to the current directory.
 * 
 * - `filename`: A function that determines the filename for uploaded files.
 *   - Generates a unique filename using the current timestamp and a random number.
 *   - Prefixes the filename with "lala-rental".
 * 
 * @param _req - The request object (not used in this function).
 * @param _file - The file object containing information about the uploaded file.
 * @param cb - A callback function to be called with the destination directory or filename.
 */
const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
      const dir = path.join(__dirname, "uploads", "properties");
  
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
      cb(null, dir);
    },
    filename: function (_req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, "lala-rental" + uniqueSuffix + "-" + file.originalname);
    },
});

export const upload = multer({ storage: storage });