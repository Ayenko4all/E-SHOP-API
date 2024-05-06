import multer, { diskStorage } from "multer";
import response from "../controllers/apiController";

const storage = diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "uploads/");
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, new Date().toISOString().slice(0, 10) + file.originalname);
  },
});

const checkFileType = (file: any, cb: any) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    return cb(null, true);
  } else {
    cb(new Error("only jpeg and png files are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  //fileFilter: fileFilter,
  fileFilter(req: any, file: any, cb: any) {
    checkFileType(file, cb);
  },
});

export default upload;
