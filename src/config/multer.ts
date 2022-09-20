import multer, { Multer } from 'multer';
import path from 'path';
import crypto from 'crypto';

const multerConfig = multer({
   dest: path.resolve(__dirname, '..', '..', 'tmp'),
   storage: multer.diskStorage({
      destination: (req, file, cb) => {
         cb(null, path.resolve(__dirname, '..', '..', 'tmp'));
      },
      filename: (req, file, cb) => {
         crypto.randomBytes(16, (err, hash) => {
            if (err) cb(err, '');

            const fileName = `${hash.toString('hex')}-${file.originalname}`;

            cb(null, fileName);
         })
      }
   }),
   limits: {
      fileSize: 2 * 1024 * 1024,
   },
   fileFilter: (req, file, cb) => {
      const allowedMimes: string[] = [
         'image/jpeg',
         'image/pjpeg',
         'image/png',
      ];

      cb(null, allowedMimes.includes(file.mimetype));
   },
})

export default multerConfig;