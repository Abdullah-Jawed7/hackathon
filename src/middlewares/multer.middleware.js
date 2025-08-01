import multer from "multer"


const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

export const diskUpload = multer({ storage: diskStorage })
const memoryStorage = multer.memoryStorage();
export const memoryUpload = multer({ storage: memoryStorage })

   