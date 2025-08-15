import { Document, Page, Text } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import ExperienceCard from "./components/ExperienceCard";
import PDFHeader from "./components/PDFHeader";
import { styles } from "./ExperiencePDF.styles";
import { cleanExperiencesData } from "./utils/dataCleaner";

const ExperiencePDF = ({ experiences }) => {
  const validExperiences = cleanExperiencesData(experiences);
  // Pas de division manuelle - laisser react-pdf gérer la pagination automatiquement

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PDFHeader />

        {/* Liste des expériences - pagination automatique */}
        {validExperiences.map((experience, index) => (
          <ExperienceCard
            key={experience.id || index}
            experience={experience}
          />
        ))}

        {/* Numéro de page */}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} sur ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

ExperiencePDF.propTypes = {
  experiences: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      start_date: PropTypes.string.isRequired,
      end_date: PropTypes.string,
      description: PropTypes.string,
      is_dev_experience: PropTypes.bool,
      periods: PropTypes.array,
      stacks: PropTypes.array,
    })
  ).isRequired,
};

export default ExperiencePDF;
