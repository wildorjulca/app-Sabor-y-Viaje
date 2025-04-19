import cloudinary from '../config/cloudinary';
import { UploadApiResponse } from 'cloudinary';

export const uploadImage = async (filePath: string): Promise<UploadApiResponse> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'my_app_images',
      resource_type: 'auto'
    });
    return result;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
};