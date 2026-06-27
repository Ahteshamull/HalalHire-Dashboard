// Function to get the base API URL
export const url =
  "https://totally-carries-mug-permission.trycloudflare.com/api/v1/";
export const pdfUrl =
  "https://totally-carries-mug-permission.trycloudflare.com";
export const imageUrl =
  "https://totally-carries-mug-permission.trycloudflare.com/uploads";

// export const url = "/api/v1/";
// export const pdfUrl = "";
// export const imageUrl = "/uploads";

export const getBaseUrl = () => {
  return url;
};

export const getImageBaseUrl = () => {
  return imageUrl;
};

export const getPDFUrl = () => {
  return pdfUrl;
};

export const getImageUrl = (imagePath) => {
  if (imagePath.includes("https")) {
    return imagePath;
  }
  return `${imageUrl}${imagePath}`;
};
