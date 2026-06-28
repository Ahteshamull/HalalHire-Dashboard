// Function to get the base API URL
export const url =
  "https://worldcat-findings-gnu-stud.trycloudflare.com/api/v1/";
export const pdfUrl = "https://worldcat-findings-gnu-stud.trycloudflare.com";
export const imageUrl =
  "https://worldcat-findings-gnu-stud.trycloudflare.com/uploads";

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
