import imageCompression from "browser-image-compression";

const compressionOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
  fileType: "image/webp",
  quality: 0.8,
};

// Fonction pour compresser une image
export const compressImage = async (file) => {
  try {
    // Compression de l'image
    const compressedFile = await imageCompression(file, compressionOptions);

    return compressedFile;
  } catch (error) {
    console.error("❌ Erreur lors de la compression:", error);
    // En cas d'erreur, retourner le fichier original
    return file;
  }
};

// Fonction pour compresser avec des options personnalisées
export const compressImageWithOptions = async (file, options = {}) => {
  const customOptions = {
    ...compressionOptions,
    ...options,
  };

  try {
    const compressedFile = await imageCompression(file, customOptions);
    return compressedFile;
  } catch (error) {
    console.error("❌ Erreur lors de la compression personnalisée:", error);
    return file;
  }
};

// Fonction pour optimiser selon l'usage
export const optimizeImageForUsage = async (file, usage = "web") => {
  const usageOptions = {
    web: {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1200,
      quality: 0.8,
      fileType: "image/webp",
    },
    thumbnail: {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 300,
      quality: 0.7,
      fileType: "image/webp",
    },
    gallery: {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      quality: 0.85,
      fileType: "image/webp",
    },
  };

  const options = usageOptions[usage] || usageOptions.web;

  try {
    const optimizedFile = await imageCompression(file, options);
    return optimizedFile;
  } catch (error) {
    console.error("❌ Erreur lors de l'optimisation:", error);
    return file;
  }
};
