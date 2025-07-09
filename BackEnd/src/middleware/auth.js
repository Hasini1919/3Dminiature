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

export default authUser;