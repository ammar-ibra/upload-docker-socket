const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = path.join(__dirname, "../../uploads");
        
        if (file.mimetype.startsWith("image/")) {
            folder = path.join(folder, "images");
        } else {
            folder = path.join(folder, "others");
        }
        
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }
        
        cb(null, folder);
    },

    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, fileExtension);
        const safeFileName = baseName.replace(/[^a-zA-Z0-9]/g, "_");

        cb(null, safeFileName + "-" + uniqueSuffix + fileExtension);
    },
});

const uploadLocal = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowed = ["image/jpeg", "image/png", "image/webp"];
        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only JPEG, PNG, and WEBP images are allowed"), false);
        }
    },
    limits: {
        files: 3,
        fileSize: 5 * 1024 * 1024, // 5MB
    },
});

module.exports = uploadLocal;