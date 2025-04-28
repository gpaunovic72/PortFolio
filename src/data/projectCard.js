import Ecommerce3 from "../assets/cart-ecommerce.webp";
import Crossfit_Heiden_contact from "../assets/Crossfit_Heiden_contact.webp";
import Crossfit_Heiden_kids from "../assets/Crossfit_Heiden_kids.webp";
import Crossfit_Heiden_la_box from "../assets/Crossfit_Heiden_la_box.webp";
import CrossFit_Heiden_page_accueil from "../assets/CrossFit_Heiden_page_accueil.webp";
import Crossfit_Heiden_programmations from "../assets/Crossfit_Heiden_programmations.webp";
import Crossfit_Heiden_tarifs_boutique from "../assets/Crossfit_Heiden_tarifs_boutique.webp";
import Ecommerce1 from "../assets/homepage-ecommerce.webp";
import Kasa1 from "../assets/Kasa-1.webp";
import Kasa2 from "../assets/Kasa-2.webp";
import Kasa3 from "../assets/Kasa-3.webp";
import Kasa4 from "../assets/Kasa-4.webp";
import Ecommerce4 from "../assets/login-ecommerce.webp";
import MonVieuxGrimoire1 from "../assets/mon-vieux-grimoire-1.webp";
import MonVieuxGrimoire2 from "../assets/mon-vieux-grimoire-2.webp";
import MonVieuxGrimoire3 from "../assets/mon-vieux-grimoire-3.webp";
import MonVieuxGrimoire4 from "../assets/mon-vieux-grimoire-4.webp";
import MonVieuxGrimoire5 from "../assets/mon-vieux-grimoire-5.webp";
import NinaCarducci from "../assets/Nina Carducci.webp";
import PortFolio2 from "../assets/Portfolio-1.webp";
import PortFolio3 from "../assets/Portfolio-2.webp";
import PortFolio1 from "../assets/Portfolio.webp";
import Ecommerce2 from "../assets/products-ecommerce.webp";
import Ecommerce5 from "../assets/signup-ecommerce.webp";
import SophieBluel1 from "../assets/sophie-bluel-1.webp";
import SophieBluel2 from "../assets/sophie-bluel-2.webp";
import SophieBluel3 from "../assets/sophie-bluel-3.webp";

export const cards = [
  {
    id: 1,
    title: "CrossFit Heiden",
    date: "2024",
    stacks: [
      { color: "#21759B", stack: "Wordpress" },
      { color: "#F1E05A", stack: "Javascript" },
      { color: "#663399", stack: "CSS" },
    ],
    picture: [
      CrossFit_Heiden_page_accueil,
      Crossfit_Heiden_kids,
      Crossfit_Heiden_la_box,
      Crossfit_Heiden_programmations,
      Crossfit_Heiden_tarifs_boutique,
      Crossfit_Heiden_contact,
    ],
    description:
      "J'ai réalisé une refonte complète du site de CrossFit Heiden en utilisant WordPress. L'objectif était d'améliorer le design, l'expérience utilisateur et les performances du site.\n\n J'ai personnalisé le thème, optimisé les images et ajouté de nouvelles fonctionnalités. \n\n J'ai également amélioré le référencement naturel (SEO) en structurant le contenu et en optimisant les balises meta, permettant au site d'être mieux indexé sur les moteurs de recherche. ",
    lien: "https://www.crossfit-heiden.fr/",
  },
  {
    id: 2,
    title: "PortFolio Sophie Bluel",
    date: "2024",
    stacks: [
      { color: "#E34C26", stack: "HTML" },
      { color: "#663399", stack: "CSS" },
      { color: "#F1E05A", stack: "JAVASCRIPT" },
    ],
    picture: [SophieBluel1, SophieBluel2, SophieBluel3],
    description:
      "Pour ce projet, j'ai rejoint l'équipe front-end de l'agence ArchiWebos pour contribuer au développement du site portfolio d'une architecte d'intérieur.\n\n Mes missions consistaient à intégrer la page de présentation des travaux, concevoir la page de connexion de l’administrateur, et développer une modale d’upload de médias.\n\n J’ai travaillé à partir des maquettes Figma, en utilisant une API fournie ainsi que le code back-end pour la gestion des données, tout en suivant l’avancement des tâches via le Kanban.\n\n J'ai rencontré des difficultés pour récupérer les données du formulaire. Pour résoudre ce problème, j'ai utilisé la méthode FormData, ce qui m'a permis de collecter efficacement les informations soumises. ",
    lien: "https://github.com/gpaunovic72/Portfolio-architecte-sophie-bluel",
  },
  {
    id: 3,
    title: "Nina Carducci",
    date: "2024",
    stacks: [
      { color: "#E34C26", stack: "HTML" },
      { color: "#663399", stack: "CSS" },
      { color: "#F1E05A", stack: "JAVASCRIPT" },
    ],
    picture: NinaCarducci,
    description:
      "Pour ce projet, j’ai été missionné en tant que développeur web freelance pour optimiser le site de Nina Carducci, une photographe professionnelle.\n\n Mon travail consistait à améliorer les performances et le référencement SEO du site en optimisant les images, le code et en mettant en place un référencement local avec Schema.org.\n\n J’ai également ajouté les métadonnées pour les réseaux sociaux et effectué des modifications liées à l’accessibilité. En parallèle, j’ai corrigé plusieurs bugs d’affichage et de navigation dans la galerie d’images.\n\n Toutes les améliorations ont été documentées dans un rapport détaillé comparant les performances avant et après optimisation.\n\n J'ai rencontré des difficultés pour mettre en place le référencement local. Pour y remédier, j'ai utilisé des balises schema.org pour structurer les informations locales, ainsi que des balises Open Graph et Twitter Cards pour optimiser le partage sur les réseaux sociaux. ",
    lien: "https://github.com/gpaunovic72/Nina_Carducci",
  },
  {
    id: 4,
    title: "Kasa",
    date: "2024",
    stacks: [
      { color: "#E34C26", stack: "HTML" },
      { color: "#C6538C", stack: "SCSS" },
      { color: "#1F6FEB", stack: "REACT" },
    ],
    picture: [Kasa1, Kasa2, Kasa3, Kasa4],
    description:
      "Pour ce projet, J’ai été missionné en tant que développeur front-end freelance pour participer à la refonte du site Kasa en React.\n\n Mes missions étaient de Créer l’application React, Développer les composants en suivant la maquette Figma, Mettre en place le routing avec React Router, Implémenter la galerie d’images et Assurer un design responsive et optimisé.\n\n Le projet a été développé avec des données JSON temporaires, en attendant le back-end en Node.js.\n\n J'ai rencontré des difficultés pour éviter la répétition de code. Pour y remédier, j'ai mis en place des composants réutilisables ainsi que des mixins et des variables pour le CSS.",
    lien: "https://github.com/gpaunovic72/Kasa",
  },
  {
    id: 5,
    title: "Mon Vieux Grimoire",
    date: "2025",
    stacks: [
      { color: "#E34C26", stack: "HTML" },
      { color: "#663399", stack: "CSS" },
      { color: "#1F6FEB", stack: "REACT" },
      { color: "#21A366", stack: "NODE JS" },
    ],
    picture: [
      MonVieuxGrimoire1,
      MonVieuxGrimoire2,
      MonVieuxGrimoire3,
      MonVieuxGrimoire4,
      MonVieuxGrimoire5,
    ],
    description:
      "Pour ce projet,J’ai été recruté en tant que développeur back-end freelance pour collaborer avec Kévin, un développeur front-end expérimenté, sur le projet Mon Vieux Grimoire, un site de notation et de référencement de livres pour une chaîne de librairies à Lille.\n\n Mes missions étaient de Développer l’API permettant aux utilisateurs d’ajouter et noter des livres, Assurer l’intégration avec le front-end, déjà développé en React, Respecter les spécifications techniques fournies et Optimiser les images envoyées par les utilisateurs pour respecter les bonnes pratiques du Green Code.\n\n J'ai rencontré des difficultés pour l'upload et l'optimisation des images. Pour y remédier, j'ai mis en place un middleware Multer pour gérer l'upload des images et utilisé Sharp pour les optimiser.",
    lien: "https://github.com/gpaunovic72/Mon_Vieux_Grimoire",
  },
  {
    id: 6,
    title: "PortFolio",
    date: "2025",
    stacks: [
      { color: "#E34C26", stack: "HTML" },
      { color: "#C6538C", stack: "SCSS" },
      { color: "#1F6FEB", stack: "REACT" },
    ],
    picture: [PortFolio1, PortFolio2, PortFolio3],
    description:
      "Pour ce projet, ma mission était de créer mon portfolio, en veillant à ce qu’il soit responsive et accessible en ligne.\n\n J'ai rencontré des difficultés avec la fonction useExperiences pour gérer efficacement les années et les mois d'expérience. Pour résoudre ce problème, j'ai utilisé useMemo pour mémoriser les années extraites des expériences, ce qui a amélioré les performances en évitant des calculs répétitifs. De plus, j'ai optimisé la fonction isMonthColored pour déterminer la couleur des mois en fonction des dates de début et de fin des expériences, garantissant ainsi une meilleure réactivité de l'application.",
    lien: "https://github.com/gpaunovic72/PortFolio",
  },
  {
    id: 7,
    title: "Mon Site E-commerce",
    date: "2025",
    stacks: [
      { color: "#CCCCCC", stack: "NextJS" },
      { color: "#10B981", stack: "Prisma" },
      { color: "#007ACC", stack: "TypeScript" },
      { color: "#00758F", stack: "MySQL" },
    ],
    picture: [Ecommerce1, Ecommerce2, Ecommerce3, Ecommerce4, Ecommerce5],
    description:
      "Pour ce projet, j'ai développé un site e-commerce complet avec Next.js et TypeScript.\n\n Ce site intègre la gestion d'un panier d'achat, l'authentification des utilisateurs sécurisée via JWT, ainsi qu'une API REST créée avec Next.js App Router et Prisma pour la communication avec une base de données MySQL.\n\n L'un des défis majeurs a été de gérer le panier aussi bien pour les utilisateurs connectés que non connectés. J'ai mis en place un système de sessionId pour permettre aux visiteurs anonymes d'ajouter des articles au panier, tout en sécurisant les données côté serveur.\n\n Ce projet m'a permis de mieux comprendre la structuration d'une application web moderne et la séparation claire entre le Frontend et le Backend.",
    lien: "https://github.com/gpaunovic72/Mon-Site-ECommerce",
  },
];
