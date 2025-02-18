import multer from 'multer';
import path from "path";
import fs from "fs";

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