import { supabase } from "../lib/supabase";

// Données des projets (copiées de projectCard.js)
const projectsData = [
  {
    id: 4,
    title: "Mon Vieux Grimoire",
    date: "2025",
    stacks: [
      { color: "#E34C26", stack: "HTML" },
      { color: "#663399", stack: "CSS" },
      { color: "#1F6FEB", stack: "REACT" },
      { color: "#21A366", stack: "NODE JS" },
    ],
    picture: [
      "/PortFolio/src/assets/images/MonVieuxGrimoire1.webp",
      "/PortFolio/src/assets/images/MonVieuxGrimoire2.webp",
      "/PortFolio/src/assets/images/MonVieuxGrimoire3.webp",
      "/PortFolio/src/assets/images/MonVieuxGrimoire4.webp",
      "/PortFolio/src/assets/images/MonVieuxGrimoire5.webp",
    ],
    description:
      "Pour ce projet,J'ai été recruté en tant que développeur back-end freelance pour collaborer avec Kévin, un développeur front-end expérimenté, sur le projet Mon Vieux Grimoire, un site de notation et de référencement de livres pour une chaîne de librairies à Lille.\n\n Mes missions étaient de Développer l'API permettant aux utilisateurs d'ajouter et noter des livres, Assurer l'intégration avec le front-end, déjà développé en React, Respecter les spécifications techniques fournies et Optimiser les images envoyées par les utilisateurs pour respecter les bonnes pratiques du Green Code.\n\n J'ai rencontré des difficultés pour l'upload et l'optimisation des images. Pour y remédier, j'ai mis en place un middleware Multer pour gérer l'upload des images et utilisé Sharp pour les optimiser.",
    github_link: "https://github.com/gpaunovic72/Mon_Vieux_Grimoire",
  },
  {
    id: 3,
    title: "PortFolio Sophie Bluel",
    date: "2024",
    stacks: [
      { color: "#E34C26", stack: "HTML" },
      { color: "#663399", stack: "CSS" },
      { color: "#F1E05A", stack: "JAVASCRIPT" },
    ],
    picture: [
      "/PortFolio/src/assets/images/SophieBluel1.webp",
      "/PortFolio/src/assets/images/SophieBluel2.webp",
      "/PortFolio/src/assets/images/SophieBluel3.webp",
    ],
    description:
      "Pour ce projet, j'ai rejoint l'équipe front-end de l'agence ArchiWebos pour contribuer au développement du site portfolio d'une architecte d'intérieur.\n\n Mes missions consistaient à intégrer la page de présentation des travaux, concevoir la page de connexion de l'administrateur, et développer une modale d'upload de médias.\n\n J'ai travaillé à partir des maquettes Figma, en utilisant une API fournie ainsi que le code back-end pour la gestion des données, tout en suivant l'avancement des tâches via le Kanban.\n\n J'ai rencontré des difficultés pour récupérer les données du formulaire. Pour résoudre ce problème, j'ai utilisé la méthode FormData, ce qui m'a permis de collecter efficacement les informations soumises. ",
    github_link:
      "https://github.com/gpaunovic72/Portfolio-architecte-sophie-bluel",
  },
  {
    id: 2,
    title: "Nina Carducci",
    date: "2024",
    stacks: [
      { color: "#E34C26", stack: "HTML" },
      { color: "#663399", stack: "CSS" },
      { color: "#F1E05A", stack: "JAVASCRIPT" },
    ],
    picture: [
      "/PortFolio/src/assets/images/NinaCarducci1.webp",
      "/PortFolio/src/assets/images/NinaCarducci2.webp",
      "/PortFolio/src/assets/images/NinaCarducci3.webp",
    ],
    description:
      "Pour ce projet, j'ai été missionné en tant que développeur web freelance pour optimiser le site de Nina Carducci, une photographe professionnelle.\n\n Mon travail consistait à améliorer les performances et le référencement SEO du site en optimisant les images, le code et en mettant en place un référencement local avec Schema.org.\n\n J'ai également ajouté les métadonnées pour les réseaux sociaux et effectué des modifications liées à l'accessibilité. En parallèle, j'ai corrigé plusieurs bugs d'affichage et de navigation dans la galerie d'images.\n\n Toutes les améliorations ont été documentées dans un rapport détaillé comparant les performances avant et après optimisation.\n\n J'ai rencontré des difficultés pour mettre en place le référencement local. Pour y remédier, j'ai utilisé des balises schema.org pour structurer les informations locales, ainsi que des balises Open Graph et Twitter Cards pour optimiser le partage sur les réseaux sociaux. ",
    github_link: "https://github.com/gpaunovic72/Nina_Carducci",
  },
  {
    id: 1,
    title: "Kasa",
    date: "2024",
    stacks: [
      { color: "#E34C26", stack: "HTML" },
      { color: "#C6538C", stack: "SCSS" },
      { color: "#1F6FEB", stack: "REACT" },
    ],
    picture: [
      "/PortFolio/src/assets/images/Kasa1.webp",
      "/PortFolio/src/assets/images/Kasa2.webp",
      "/PortFolio/src/assets/images/Kasa3.webp",
      "/PortFolio/src/assets/images/Kasa4.webp",
    ],
    description:
      "Pour ce projet, J'ai été missionné en tant que développeur front-end freelance pour participer à la refonte du site Kasa en React.\n\n Mes missions étaient de Créer l'application React, Développer les composants en suivant la maquette Figma, Mettre en place le routing avec React Router, Implémenter la galerie d'images et Assurer un design responsive et optimisé.\n\n Le projet a été développé avec des données JSON temporaires, en attendant le back-end en Node.js.\n\n J'ai rencontré des difficultés pour éviter la répétition de code. Pour y remédier, j'ai mis en place des composants réutilisables ainsi que des mixins et des variables pour le CSS.",
    github_link: "https://github.com/gpaunovic72/Kasa",
  },
];

// Fonction de migration
export const migrateProjects = async () => {
  try {
    console.log("🚀 Début de la migration des projets...");

    // Supprimer le projet de test
    await supabase.from("projects").delete().eq("title", "Portfolio Personnel");

    console.log("✅ Projet de test supprimé");

    // Insérer tous les projets
    const { data, error } = await supabase
      .from("projects")
      .insert(projectsData)
      .select();

    if (error) throw error;

    console.log(`✅ ${data.length} projets migrés avec succès !`);
    return data;
  } catch (error) {
    console.error("❌ Erreur lors de la migration:", error);
    throw error;
  }
};
