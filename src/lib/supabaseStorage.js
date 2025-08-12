import { supabase } from "./supabase";

// Configuration du bucket pour les images
const BUCKET_NAME = "portfolio-images";

// Fonctions pour gérer les images
export const uploadImage = async (file, fileName) => {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false, // Ne pas écraser si l'image existe déjà
      });

    if (error) {
      console.error("❌ Erreur upload:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("❌ Erreur lors de l'upload:", error);
    throw error;
  }
};

// Récupérer l'URL publique d'une image
export const getImageUrl = (fileName) => {
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);

  return data.publicUrl;
};

// Lister toutes les images
export const listImages = async () => {
  try {
    const { data, error } = await supabase.storage.from(BUCKET_NAME).list();

    if (error) {
      console.error("❌ Erreur liste images:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des images:", error);
    throw error;
  }
};

// Supprimer une image
export const deleteImage = async (fileName) => {
  try {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([fileName]);

    if (error) {
      console.error("❌ Erreur suppression:", error);
      throw error;
    }
  } catch (error) {
    console.error("❌ Erreur lors de la suppression:", error);
    throw error;
  }
};
