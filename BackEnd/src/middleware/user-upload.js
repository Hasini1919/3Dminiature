// uploadUserImages.js

import multer from 'multer';
import fs from 'fs';

// Ensure the user upload folder exists
const ensureUserFolder = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

const userStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderPath = './uploads/user-uploads';
    ensureUserFolder(folderPath);
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const uploadUserImage = multer({ storage: userStorage });

export default uploadUserImage;