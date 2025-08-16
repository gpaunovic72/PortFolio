import { Text, View } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import { styles } from "../ExperiencePDF.styles";

const ExperiencePeriods = ({ experience }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (experience.periods && experience.periods.length > 0) {
    return (
      <View style={styles.periodsRight}>
        {experience.periods.map((period, periodIndex) => (
          <View key={periodIndex} style={styles.periodItem}>
            <Text style={[styles.period, { marginBottom: 2 }]}>
              {period.description?.split("\n")[0]?.replace("Projet : ", "") ||
                ""}
            </Text>
            {period.start_date && period.end_date && (
              <Text style={{ fontSize: 9, color: "#666" }}>
                {`${formatDate(period.start_date)} - ${formatDate(
                  period.end_date
                )}`}
              </Text>
            )}
          </View>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.periodsRight}>
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
