import express from 'express';
import profileAuth from '../middleware/profile.js';
import {
  getProfile,
  updateProfile,
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  setDefaultAddress
} from '../controllers/profileController.js';

const router = express.Router();

// Profile CRUD
router.route('/')
  .get(profileAuth, getProfile)
  .put(profileAuth, updateProfile);

// Address Management
router.route('/addresses')
  .get(profileAuth, getAddresses)
  .post(profileAuth, addAddress);

router.route('/addresses/:id')
  .put(profileAuth, updateAddress)
  .delete(profileAuth, deleteAddress);

router.put('/addresses/default/:id', profileAuth, setDefaultAddress);

export default router;
