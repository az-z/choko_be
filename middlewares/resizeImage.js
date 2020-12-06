const MulterSharpResizer = require("multer-sharp-resizer");
module.exports = async (req, res, next) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = `${today.getMonth() + 1}`.padStart(2, "0");
 
  // Used by multer .array() or .single
  // const filename = `gallery-${Date.now()}`;
 
  // Used by multer .fields and filename must be same object prop
  const filename = {
    cover: `cover-${Date.now()}`,
    gallery: `gallery-${Date.now()}`,
  };
 
  const sizes = [
    {
      path: "original",
      width: null,
      height: null,
    },
    {
      path: "large",
      width: 768,
      height: 512,
    },
    {
      path: "medium",
      width: 300,
      height: 450,
    },
    {
      path: "thumbnail",
      width: 100,
      height: 250,
    },
  ];
 
  const uploadPath = `/uploads`;
 
  const fileUrl = `${req.protocol}://${req.get("host")}/`;
 
  // sharp options
  const sharpOptions = {
    fit: "contain",
    background: { r: 255, g: 255, b: 255 }
  };
 
  // create a new instance of MulterSharpResizer and pass params
  const resizeObj = new MulterSharpResizer(
    req,
    filename,
    sizes,
    uploadPath,
    fileUrl,
    sharpOptions
  );
 
  // call resize method for resizing files
  await resizeObj.resize();
  const getDataUploaded = resizeObj.getData();
 
  // Get details of uploaded files: Used by multer fields
  req.body.cover = getDataUploaded.cover;
  req.body.gallery = getDataUploaded.gallery;
 
  // Get details of uploaded files: Used by multer .array() or .single()
  // req.body.cover = getDataUploaded;
  // req.body.gallery = getDataUploaded;
 
  next();
};