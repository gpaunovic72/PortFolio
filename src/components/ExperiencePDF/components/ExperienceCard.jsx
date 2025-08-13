import { Text, View } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import { styles } from "../ExperiencePDF.styles";
import ExperiencePeriods from "./ExperiencePeriods";
import ExperienceTechnologies from "./ExperienceTechnologies";

const ExperienceCard = ({ experience }) => (
  <View style={styles.experienceCard} wrap={false}>
    <View style={styles.experienceHeader} wrap={false}>
      <View style={{ flex: 1 }}>
        <Text style={styles.company}>{experience.company}</Text>
        {experience.is_dev_experience && (
          <Text style={styles.devBadge}>Expérience Développement</Text>
        )}
      </View>

      <ExperiencePeriods experience={experience} />
    </View>

    {/* Description */}
    {experience.description && (
      <Text style={styles.description} orphans={2} widows={2}>
        {experience.description}
      </Text>
    )}

    {/* Technologies */}
    <ExperienceTechnologies stacks={experience.stacks} />
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
  }).isRequired,
};

export default ExperienceCard;
