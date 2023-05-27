import multer from "multer";
import { v4 as uuidv4} from "uuid";

const storage = multer.diskStorage({
  destination(_req, _file, callback) {
    callback(null, "public");
  },
  filename(_req, file, callback) {
    const ext = file.originalname.split(".")[1]
    callback(null, uuidv4() + "." + ext);
  },
});

export const upload = multer({ storage: storage });
