import express from 'express';
import uploadUserImage from '../middleware/user-upload.js';
import { uploadUserImageHandler } from '../controllers/userimage-controller.js';

const UploadRouter = express.Router();

UploadRouter.route("/upload-image").post(
  uploadUserImage.array("uploadedImageFile", 5),
  uploadUserImageHandler
);

export default UploadRouter;
