import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        console.log(token);
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use env variable in production

        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Token is not valid' });
        }
        console.log(user);
        req.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({ message: 'Token is not valid' });
    }
};
/*
export default auth;
const authUser= (req,res,next)=>{
    try{

        const userId = "67cef6ca71e8ec06a1266277"; 
        req.userId = userId;
        next();
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message});
    }
}
*/
export default auth;