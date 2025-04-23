const cloudinary = require('cloudinary').v2;

exports.uploadFile = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file.path, (error, result) => {
      if (error) reject(error);
      resolve(result.secure_url);
    });
  });
};
