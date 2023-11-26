import multer from 'fastify-multer';
import path = require('node:path');

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/');
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().getTime();
    const nomeDoArquivo = `${timestamp}_${file.originalname}`;
    cb(null, nomeDoArquivo);
  },
});

const upload = multer({ storage });

export default upload;