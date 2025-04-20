import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { uploadImage } from '../libs/cloudinaryService';
import { createImage } from '../services/images';
// import { uploadImage } from '../services/cloudinaryService';
// import { createImage } from '../models/Image';

export const uploadImageController = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
      return
    }
    const filePath = path.join(__dirname, '../../uploads', req.file.filename);

    // Subir a Cloudinary
    // const cloudinaryResult = await uploadImage(filePath);
    // console.log(cloudinaryResult)

    // Guardar en la base de datos
    // const imageRecord = await createImage({
    //   public_id: cloudinaryResult.public_id,
    //   url: cloudinaryResult.secure_url
    // });

    // Eliminar el archivo temporal
    fs.unlinkSync(filePath);

    res.status(201).json({
      message: 'Image uploaded successfully',
      // image: cloudinaryResult
      filePath
    });
  } catch (error) {
    console.error('Error in uploadImageController:', error);
    res.status(500).json({ message: 'Error uploading image', error });
  }
};