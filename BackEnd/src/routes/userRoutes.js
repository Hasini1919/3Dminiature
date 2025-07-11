// // backend/routes/userRoutes.js
// import express from 'express';
// import User from '../models/User.js'; // add `.js` extension in ES Modules

// const router = express.Router();

// // GET /api/users
// router.get('/', async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// });

// // POST /api/users
// router.post('/', async (req, res) => {
//   const { name, email } = req.body;
//   const user = await User.create({ name, email });
//   res.status(201).json(user);
// });

// export default router;
