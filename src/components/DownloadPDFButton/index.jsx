import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { Download } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import ExperiencePDF from "../ExperiencePDF";
import "./DownloadPDFButton.scss";

const DownloadPDFButton = ({ experiences, className = "" }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (!experiences || experiences.length === 0) {
      alert("Aucune expérience à télécharger");
      return;
    }

    setIsGenerating(true);

    try {
      // Générer le PDF
      const blob = await pdf(
        <ExperiencePDF experiences={experiences} />
      ).toBlob();

      // Télécharger le fichier
      const fileName = `dossier_technique_${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      saveAs(blob, fileName);
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      alert("Erreur lors de la génération du PDF. Veuillez réessayer.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating || !experiences || experiences.length === 0}
      className={`download-pdf-btn ${className}`}
      title="Télécharger le dossier technique en PDF"
    >
      <Download size={20} />
      {isGenerating ? "Génération..." : "Télécharger PDF"}
    </button>
  );
};

DownloadPDFButton.propTypes = {
  experiences: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export default DownloadPDFButton;
