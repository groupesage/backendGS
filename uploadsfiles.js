const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Dossier où les fichiers seront sauvegardés
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extname);
  },
});

// Filtre pour accepter uniquement les fichiers images (JPEG, PNG) et PDF
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Seuls les fichiers PDF et images (JPEG, PNG) sont autorisés !'), false);
  }
};

// Initialiser l'upload pour photo et PDF
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
