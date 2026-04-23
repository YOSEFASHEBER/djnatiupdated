import cloudinary from "./cloudinary";

export const uploadBufferToCloudinary = (buffer, folder = "cars") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );

    stream.end(buffer);
  });
};
