const uploadUserImageHandler = (req, res) => {
    const files = req.files; 
  
    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded." });
    }
  
  
    const imageUrls = files.map((file) => {
      return `/uploads/user-uploads/${file.filename}`;
    });
  
    res.status(200).json({
      success: true,
      imageUrls,
    });
  };
  
export  { uploadUserImageHandler };