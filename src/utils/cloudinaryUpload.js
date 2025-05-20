const cloudName = "dkbteljtz";
const uploadPreset = "image_url";

export const uploadToCloudinary = async (file) => {
  // Skip if it's already a URL
  if (typeof file === 'string') return file;

  const isVideo = file.type.startsWith("video/");
  const resourceType = isVideo ? "video" : "image";

  const cloudinaryData = new FormData();
  cloudinaryData.append('file', file);
  cloudinaryData.append('upload_preset', uploadPreset);
  cloudinaryData.append('cloud_name', cloudName);

  const cloudinaryResponse = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
    {
      method: 'POST',
      body: cloudinaryData,
    }
  );

  const cloudinaryResult = await cloudinaryResponse.json();
  return cloudinaryResult.secure_url;
};

export const uploadMultipleToCloudinary = async (files) => {
  return Promise.all(files.map(file => uploadToCloudinary(file)));
};
