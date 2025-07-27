import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import User from '../../models/User.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// Multer storage for profile images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = path.join('src/uploads/profile');
        fs.mkdirSync(folder, { recursive: true });
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`);
    }
});
const upload = multer({ storage });

// GET admin profile
router.get('/', async (req, res) => {
    try {
        const admin = await User.findOne({ role: 'admin' });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });
        res.json(admin);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// UPDATE admin profile
router.put('/', upload.single('picture'), async (req, res) => {
    try {
        const admin = await User.findOne({ role: 'admin' });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        const { name, email, phone, password, existingPicture } = req.body;

        if (name) admin.name = name;
        if (email) admin.email = email;
        if (phone) admin.phone = phone;

        if (password) {
            admin.password = await bcrypt.hash(password, 10);
        }

        if (req.file) {
            // Delete old picture if it exists
            if (admin.picture && fs.existsSync(admin.picture)) {
                fs.unlinkSync(admin.picture);
            }
            admin.picture = `src/uploads/profile/${req.file.filename}`;
        } else if (existingPicture) {
            // Use old image if no new image uploaded
            admin.picture = existingPicture;
        }

        await admin.save();
        res.json({ message: 'Profile updated', admin });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

export default router;
