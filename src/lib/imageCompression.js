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
    console.log("📦 Compression de l'image:", file.name);
    console.log(
      "📏 Taille originale:",
      (file.size / 1024 / 1024).toFixed(2),
      "MB"
    );

    // Compression de l'image
    const compressedFile = await imageCompression(file, compressionOptions);

    console.log("📦 Image compressée:", compressedFile.name);
    console.log(
      "📏 Taille compressée:",
      (compressedFile.size / 1024 / 1024).toFixed(2),
      "MB"
    );

    // Calcul du gain de compression
    const compressionRatio = (
      ((file.size - compressedFile.size) / file.size) *
      100
    ).toFixed(1);
    console.log("📊 Gain de compression:", compressionRatio + "%");

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
    console.log("📦 Compression personnalisée de l'image:", file.name);
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
    console.log(`📦 Optimisation pour ${usage}:`, file.name);
    const optimizedFile = await imageCompression(file, options);
    return optimizedFile;
  } catch (error) {
    console.error("❌ Erreur lors de l'optimisation:", error);
    return file;
  }
};
