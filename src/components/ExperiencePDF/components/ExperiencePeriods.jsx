import { Text, View } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import { styles } from "../ExperiencePDF.styles";

const ExperiencePeriods = ({ experience }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR");
  };

  if (experience.periods && experience.periods.length > 0) {
    return (
      <View style={styles.periodsRight} wrap={false}>
        {experience.periods.map((period, periodIndex) => (
          <Text key={periodIndex} style={styles.period}>
            {period.description}
            {period.start_date && period.end_date && (
              <Text style={{ fontSize: 10 }}>
                {` (${period.start_date} - ${period.end_date})`}
              </Text>
            )}
          </Text>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.periodsRight} wrap={false}>
      <Text style={styles.period}>
        {`${formatDate(experience.start_date)} - ${
          experience.end_date ? formatDate(experience.end_date) : "En cours"
        }`}
      </Text>
    </View>
  );
};

ExperiencePeriods.propTypes = {
  experience: PropTypes.shape({
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string,
    periods: PropTypes.array,
  }).isRequired,
};

export default ExperiencePeriods;
