import { Trash2 } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { compressImage } from "../../lib/imageCompression";
import { supabase } from "../../lib/supabase";
import {
  deleteImage,
  getImageUrl,
  uploadImage,
} from "../../lib/supabaseStorage";

export default function ProjectImageManager({ project, onImagesUpdated }) {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Veuillez sélectionner une image");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("L'image doit faire moins de 5 MB");
      return;
    }

    try {
      setUploading(true);
      setMessage("Compression de l'image...");

      const compressedFile = await compressImage(file);
      setMessage("Upload en cours...");

      const fileName = `project-${project.id}-${Date.now()}-${
        compressedFile.name
      }`;
      await uploadImage(compressedFile, fileName);

      const imageUrl = getImageUrl(fileName);
      const currentImages = project.picture || [];
      const updatedImages = [...currentImages, imageUrl];

      const { error } = await supabase
        .from("projects")
        .update({ picture: updatedImages })
        .eq("id", project.id);

      if (error) throw error;

      setMessage("Image ajoutée au projet avec succès !");
      onImagesUpdated && onImagesUpdated(updatedImages);

      // Nettoyer le message après 3 secondes
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setMessage(`Erreur: ${error.message}`);

      // Nettoyer le message d'erreur après 5 secondes
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (imageUrl, index) => {
    try {
      setMessage("Suppression en cours...");

      // Extraction et décodage du nom de fichier
      const urlParts = imageUrl.split("/");
      const encodedFileName = urlParts[urlParts.length - 1].split("?")[0];
      const fileName = decodeURIComponent(encodedFileName);

      // Mise à jour de la base de données AVANT la suppression
      const currentImages = project.picture || [];
      const updatedImages = currentImages.filter((_, i) => i !== index);

      const { error } = await supabase
        .from("projects")
        .update({ picture: updatedImages })
        .eq("id", project.id);

      if (error) throw error;

      // Suppression du fichier dans Supabase Storage APRÈS la mise à jour
      await deleteImage(fileName);

      // Petit délai pour laisser Supabase se synchroniser
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMessage("Image supprimée avec succès !");
      onImagesUpdated && onImagesUpdated(updatedImages);

      // Nettoyer le message après 3 secondes
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      setMessage(`Erreur: ${error.message}`);

      // Nettoyer le message d'erreur après 5 secondes
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  const getMessageClass = () => {
    const isSuccess = message.includes("succès");
    const isError = message.includes("Erreur");
    return `message ${isSuccess ? "success" : isError ? "error" : "info"}`;
  };

  return (
    <div className="project-image-manager">
      <h4>Gestion des images - {project.title}</h4>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={uploading}
      />

      {message && <div className={getMessageClass()}>{message}</div>}

      {project.picture && project.picture.length > 0 && (
        <div>
          <h5>Images du projet ({project.picture.length}) :</h5>
          <div className="images-grid">
            {project.picture.map((imageUrl, index) => (
              <div key={index} className="image-item">
                <img
                  src={imageUrl}
                  alt={`${project.title} - Image ${index + 1}`}
                />
                <button
                  onClick={() => handleDeleteImage(imageUrl, index)}
                  className="delete-btn"
                  title="Supprimer cette image"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {(!project.picture || project.picture.length === 0) && (
        <div className="no-images">Aucune image pour ce projet</div>
      )}
    </div>
  );
}

ProjectImageManager.propTypes = {
  project: PropTypes.object.isRequired,
  onImagesUpdated: PropTypes.func,
};
