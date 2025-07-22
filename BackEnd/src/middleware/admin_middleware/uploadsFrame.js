// middlewares/uploadMiddleware.js
import multer from "multer";
import { getUploadPath } from "../../controllers/admin_controller/addController.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const productName = req.body.name;
        if (!productName) {
            return cb(new Error("Product name is required for folder creation"), null);
        }
        const uploadPath = getUploadPath(productName);
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

export default upload;
