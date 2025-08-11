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

  // Fonction pour uploader une image pour ce projet
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Vérifier le type de fichier
    if (!file.type.startsWith("image/")) {
      setMessage("Veuillez sélectionner une image");
      return;
    }

    // Vérifier la taille (5 MB max)
    if (file.size > 5 * 1024 * 1024) {
      setMessage("L'image doit faire moins de 5 MB");
      return;
    }

    try {
      setUploading(true);
      setMessage("Compression de l'image...");

      // Compression de l'image
      const compressedFile = await compressImage(file);

      setMessage("Upload en cours...");

      // Générer un nom unique pour l'image du projet
      const fileName = `project-${project.id}-${Date.now()}-${
        compressedFile.name
      }`;

      // Upload de l'image
      await uploadImage(compressedFile, fileName);

      // Récupérer l'URL publique
      const imageUrl = getImageUrl(fileName);

      // Mettre à jour le projet dans la base de données
      const currentImages = project.picture || [];
      const updatedImages = [...currentImages, imageUrl];

      const { error } = await supabase
        .from("projects")
        .update({ picture: updatedImages })
        .eq("id", project.id);

      if (error) {
        throw error;
      }

      setMessage("Image ajoutée au projet avec succès !");

      // Notifier le composant parent du changement
      if (onImagesUpdated) {
        onImagesUpdated(updatedImages);
      }
    } catch (error) {
      setMessage(`Erreur: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  // Fonction pour supprimer une image
  const handleDeleteImage = async (imageUrl, index) => {
    try {
      setMessage("Suppression en cours...");

      // Extraire le nom du fichier de l'URL
      const fileName = imageUrl.split("/").pop().split("?")[0];

      // Supprimer l'image du storage
      await deleteImage(fileName);

      // Mettre à jour le projet dans la base de données
      const currentImages = project.picture || [];
      const updatedImages = currentImages.filter((_, i) => i !== index);

      const { error } = await supabase
        .from("projects")
        .update({ picture: updatedImages })
        .eq("id", project.id);

      if (error) {
        throw error;
      }

      setMessage("Image supprimée avec succès !");

      // Notifier le composant parent du changement
      if (onImagesUpdated) {
        onImagesUpdated(updatedImages);
      }
    } catch (error) {
      setMessage(`Erreur: ${error.message}`);
    }
  };

  return (
    <div
      className="project-image-manager"
      style={{
        padding: "1rem",
        background: "#0d1117",
        borderRadius: "8px",
        margin: "1rem 0",
        border: "1px solid #30363d",
      }}
    >
      <h4 style={{ color: "#c9d1d9", marginBottom: "1rem" }}>
        Gestion des images - {project.title}
      </h4>

      {/* Upload d'image */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploading}
          style={{
            padding: "0.5rem",
            background: "#21262d",
            border: "1px solid #30363d",
            borderRadius: "4px",
            color: "#c9d1d9",
            fontSize: "0.9rem",
          }}
        />
      </div>

      {/* Message de statut */}
      {message && (
        <div
          style={{
            padding: "0.5rem",
            background: message.includes("connexion")
              ? "#238636"
              : message.includes("erreur")
              ? "#da3633"
              : "#21262d",
            borderRadius: "4px",
            marginBottom: "1rem",
            color: "white",
            fontSize: "0.9rem",
          }}
        >
          {message}
        </div>
      )}

      {/* Images actuelles du projet */}
      {project.picture && project.picture.length > 0 && (
        <div>
          <h5
            style={{
              color: "#8b949e",
              marginBottom: "0.5rem",
              fontSize: "0.9rem",
            }}
          >
            Images du projet ({project.picture.length}) :
          </h5>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "0.5rem",
            }}
          >
            {project.picture.map((imageUrl, index) => (
              <div key={index} style={{ position: "relative" }}>
                <img
                  src={imageUrl}
                  alt={`${project.title} - Image ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "4px",
                    border: "1px solid #30363d",
                  }}
                />
                <button
                  onClick={() => handleDeleteImage(imageUrl, index)}
                  style={{
                    position: "absolute",
                    top: "2px",
                    right: "2px",
                    background: "#da3633",
                    border: "none",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    color: "white",
                    fontSize: "12px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  title="Supprimer cette image"
                >
                  <Trash2 size={14} style={{ marginRight: "4px" }} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Aucune image */}
      {(!project.picture || project.picture.length === 0) && (
        <div
          style={{
            color: "#8b949e",
            fontSize: "0.9rem",
            fontStyle: "italic",
            textAlign: "center",
            padding: "1rem",
          }}
        >
          Aucune image pour ce projet
        </div>
      )}
    </div>
  );
}

ProjectImageManager.propTypes = {
  project: PropTypes.object.isRequired,
  onImagesUpdated: PropTypes.func,
};
