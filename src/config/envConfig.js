// Uncomment the localhost lines if you are running your backend locally without Cloudflare!
export const url = "https://yonca-backend.onrender.com/api/v1";
export const pdfUrl = "https://yonca-backend.onrender.com";
export const imageUrl = "https://yonca-backend.onrender.com/uploads";

// export const url = "http://localhost:3054/api/v1";
// export const pdfUrl = "http://localhost:3054";
// export const imageUrl = "http://localhost:3054/uploads";

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
