import { Router } from 'express';
import { uploadImageController } from '../controllers/imageController';
import multer from 'multer';

const routerImages = Router();
const upload = multer({ dest: 'uploads/' });

routerImages.post('/upload', upload.single('image'), uploadImageController);

export default routerImages;