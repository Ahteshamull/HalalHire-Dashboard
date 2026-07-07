// Uncomment the localhost lines if you are running your backend locally without Cloudflare!
// export const url = "http://localhost:5000/api/v1";
// export const pdfUrl = "http://localhost:5000";
// export const imageUrl = "http://localhost:5000/uploads";

export const url =
  "https://partially-strong-zshops-smile.trycloudflare.com/api/v1";
export const pdfUrl = "https://partially-strong-zshops-smile.trycloudflare.com";
export const imageUrl =
  "https://partially-strong-zshops-smile.trycloudflare.com/uploads";

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
