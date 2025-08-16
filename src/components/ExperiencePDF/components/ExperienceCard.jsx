import { Text, View } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import { styles } from "../ExperiencePDF.styles";
import ExperienceTechnologies from "./ExperienceTechnologies";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const ExperienceCard = ({ experience }) => (
  <View style={styles.experienceCard}>
    {/* Liseré bleu sur le côté */}
    <View style={styles.timelineContainer}>
      <View style={styles.timelineLine} />
      <View style={styles.timelineCircle} />
      <View style={styles.timelineLine} />
    </View>

    {/* Contenu principal */}
    <View style={styles.experienceContent}>
      {/* Titre principal */}
      <Text style={styles.experienceTitle}>{experience.name}</Text>

      {/* Entreprise */}
      <Text style={styles.company}>{experience.company}</Text>

      {/* Description principale */}
      {experience.description && (
        <Text style={styles.description}>{experience.description}</Text>
      )}

      {/* Descriptions des périodes pour les projets personnels */}
      {experience.periods &&
        experience.periods.length > 0 &&
        experience.periods.some(
          (period) =>
            period.description && period.description.split("\n").length > 1
        ) && (
          <View style={styles.periodsSection}>
            {experience.periods.map(
              (period, index) =>
                period.description &&
                period.description.split("\n").length > 1 && (
                  <View key={index} style={styles.periodDescription}>
                    <View style={styles.periodHeader}>
                      <Text style={styles.periodTitle}>
                        {period.description
                          .split("\n")[0]
                          ?.replace("Projet : ", "") || ""}
                      </Text>
                      {period.start_date && period.end_date && (
                        <Text style={styles.periodDates}>
                          {formatDate(period.start_date)} -{" "}
                          {formatDate(period.end_date)}
                        </Text>
                      )}
                    </View>
                    <Text style={styles.periodContent}>
                      {period.description.split("\n").slice(1).join("\n")}
                    </Text>
                  </View>
                )
            )}
          </View>
        )}

      {/* Technologies */}
      <ExperienceTechnologies stacks={experience.stacks} />
    </View>
  </View>
);

ExperienceCard.propTypes = {
  experience: PropTypes.shape({
    id: PropTypes.number.isRequired,
    company: PropTypes.string.isRequired,
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string,
    description: PropTypes.string,
    is_dev_experience: PropTypes.bool,
    periods: PropTypes.array,
    stacks: PropTypes.array,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default ExperienceCard;
