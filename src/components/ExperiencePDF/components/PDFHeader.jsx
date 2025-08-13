import { Text, View } from "@react-pdf/renderer";
import { styles } from "../ExperiencePDF.styles";

const PDFHeader = () => (
  <View style={styles.header}>
    <Text style={styles.title}>Dossier Technique</Text>
    <Text style={styles.subtitle}>
      Compétences et expériences professionnelles
    </Text>
    <Text style={styles.subtitle}>
      Généré le {new Date().toLocaleDateString("fr-FR")}
    </Text>
  </View>
);

export default PDFHeader;
