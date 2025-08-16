import { Text, View } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import { styles } from "../ExperiencePDF.styles";

const ExperienceTechnologies = ({ stacks }) => {
  if (!stacks || stacks.length === 0) {
    return null;
  }

  return (
    <View style={styles.technologies}>
      {stacks.map((tech, techIndex) => (
        <Text
          key={techIndex}
          style={[
            styles.techBadge,
            { backgroundColor: tech.color || "#2c5aa0" },
          ]}
        >
          {tech.stack || tech}
        </Text>
      ))}
    </View>
  );
};

ExperienceTechnologies.propTypes = {
  stacks: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        stack: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      }),
    ])
  ),
};

export default ExperienceTechnologies;
