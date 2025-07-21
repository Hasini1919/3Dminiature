import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

export const instagramCallback = (req, res) => {
  try {
    const token = generateToken(req.user);
    res.redirect(`${process.env.FRONTEND_URL}/authentication/success?token=${token}`);
  } catch (error) {
    console.error('Instagram callback error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/authentication/error`);
  }
};