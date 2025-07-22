import express from "express";
import uploadUserImage from "../middleware/user-upload.js"; // multer middleware for uploads
import { uploadProfileImage } from "../controllers/profileController.js";

const uploadRouter = express.Router();

// This is your handler function which you need to import or define
// (You wrote uploadUserImageHandler but it is not imported/defined)
// So either import it or remove it if not needed

// Assuming uploadProfileImage is your controller to handle upload
// If you want to accept multiple files (max 5), use uploadUserImage.array()
// If you want a single file, use uploadUserImage.single()

// Example: Upload multiple images (up to 5)


// Or, if you want single file upload endpoint (like profile picture)
uploadRouter.post(
  "/upload",
  uploadUserImage.single("profileImage"),
  uploadProfileImage
);

export default uploadRouter;
