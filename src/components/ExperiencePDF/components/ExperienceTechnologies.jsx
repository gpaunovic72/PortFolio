import { Text, View } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import { styles } from "../ExperiencePDF.styles";

const ExperienceTechnologies = ({ stacks }) => {
  if (!stacks || stacks.length === 0) {
    return null;
  }

  return (
    <View style={styles.technologies} wrap={false}>
      {stacks.map((tech, techIndex) => (
        <Text key={techIndex} style={styles.techBadge}>
          {tech}
        </Text>
      ))}
    </View>
  );
};

ExperienceTechnologies.propTypes = {
  stacks: PropTypes.arrayOf(PropTypes.string),
};

export default ExperienceTechnologies;
