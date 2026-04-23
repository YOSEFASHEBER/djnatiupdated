import cloudinary from "./cloudinary";

export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error("Cloudinary delete failed: " + error.message);
  }
};
