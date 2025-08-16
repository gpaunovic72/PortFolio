# 🚀 Portfolio - Goran Paunovic

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2020-F7DF1E?style=for-the-badge&logo=javascript)
![Vite](https://img.shields.io/badge/Vite-6.0.5-646CFF?style=for-the-badge&logo=vite)
![Sass](https://img.shields.io/badge/Sass-1.83.4-CC6699?style=for-the-badge&logo=sass)
![Supabase](https://img.shields.io/badge/Supabase-2.54.0-3ECF8E?style=for-the-badge&logo=supabase)

**Portfolio professionnel de Goran Paunovic - Développeur Web Full Stack**

[🌐 Site Web](https://gpaunovic72.github.io/PortFolio/) | [📧 Contact](mailto:g.paunovic.8@gmail.com)

</div>

---

## 📋 Table des matières

- [🎯 À propos](#-à-propos)
- [✨ Fonctionnalités](#-fonctionnalités)
- [🛠️ Technologies utilisées](#️-technologies-utilisées)
- [📁 Structure du projet](#-structure-du-projet)
- [🚀 Installation et démarrage](#-installation-et-démarrage)
- [📱 Fonctionnalités principales](#-fonctionnalités-principales)
- [🎨 Design et UX](#-design-et-ux)
- [🔧 Configuration](#-configuration)
- [📊 Performance](#-performance)
- [🤝 Contribution](#-contribution)
- [📄 Licence](#-licence)

---

## 🎯 À propos

Portfolio moderne et professionnel développé avec React et JavaScript, présentant les compétences et projets de **Goran Paunovic**, développeur web full stack passionné par la création d'applications web performantes et accessibles.

### 🎨 Design

- **Interface moderne** avec glassmorphism et dégradés
- **Animations fluides** avec Framer Motion
- **Design responsive** pour tous les appareils
- **UX optimisée** avec micro-interactions

### 🔧 Architecture

- **Architecture modulaire** avec composants réutilisables
- **Gestion d'état** avec React Hooks
- **Validation de formulaires** avec Zod et React Hook Form
- **Base de données** Supabase pour le contenu dynamique

---

## ✨ Fonctionnalités

### 🏠 Page d'accueil

- **Présentation personnelle** avec photo de profil
- **Stack technique** interactive avec animations
- **Section projets** avec aperçu des réalisations
- **Expériences professionnelles** en timeline
- **Formulaire de contact** intégré avec EmailJS

### 📄 Pages détaillées

- **Page projets** avec galerie d'images
- **Page expériences** avec modal détaillée
- **Génération PDF** des expériences
- **Navigation fluide** entre les sections

### 🔐 Dashboard administrateur

- **Authentification sécurisée** avec Supabase
- **Gestion des projets** (CRUD complet)
- **Gestion des expériences** avec périodes multiples
- **Upload d'images** avec compression automatique
- **Interface intuitive** pour la maintenance

### 📧 Système de contact

- **Formulaire validé** avec Zod
- **Envoi d'emails** via EmailJS
- **Template HTML** personnalisé et responsive
- **Feedback utilisateur** en temps réel

---

## 🛠️ Technologies utilisées

### Frontend

- **React 18.3.1** - Bibliothèque UI
- **JavaScript ES2020** - Langage de programmation
- **Vite 6.0.5** - Build tool et dev server
- **React Router 7.8.0** - Navigation SPA
- **Framer Motion 12.23.12** - Animations
- **React Hook Form 7.62.0** - Gestion de formulaires
- **Zod 4.0.17** - Validation de schémas

### Styling

- **Sass 1.83.4** - Préprocesseur CSS
- **CSS Modules** - Scoping des styles
- **Responsive Design** - Mobile-first approach

### Backend & Services

- **Supabase 2.54.0** - Base de données et authentification
- **EmailJS 3.2.0** - Service d'envoi d'emails
- **React Hook Form** - Gestion des formulaires

### Outils de développement

- **ESLint** - Linting du code
- **Vitest** - Tests unitaires
- **GitHub Pages** - Déploiement
- **Lucide React** - Icônes modernes

---

## 📁 Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── Header/         # Navigation principale
│   ├── Footer/         # Pied de page
│   ├── ModalContent/   # Formulaire de contact
│   ├── Project/        # Affichage des projets
│   ├── Stack/          # Technologies maîtrisées
│   ├── ExperiencePDF/  # Génération PDF
│   └── ...
├── pages/              # Pages principales
│   ├── Home/           # Page d'accueil
│   ├── ProjectDetail/  # Détail d'un projet
│   ├── Experiences/    # Page expériences
│   └── Admin/          # Dashboard administrateur
├── hooks/              # Hooks personnalisés
├── lib/                # Utilitaires et configuration
├── data/               # Données statiques
├── assets/             # Images et ressources
└── styles/             # Variables et mixins Sass
```

---

## 🚀 Installation et démarrage

### Prérequis

- **Node.js** 18+
- **npm** ou **yarn**

### Installation

1. **Cloner le repository**

```bash
git clone https://github.com/gpaunovic72/PortFolio.git
cd PortFolio
```

2. **Installer les dépendances**

```bash
npm install
# ou
yarn install
```

3. **Configuration des variables d'environnement**

```bash
# Créer un fichier .env à la racine
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_clé_anon_supabase
VITE_EMAILJS_SERVICE_ID=votre_service_id_emailjs
VITE_EMAILJS_TEMPLATE_ID=votre_template_id_emailjs
VITE_EMAILJS_USER_ID=votre_user_id_emailjs
```

4. **Lancer le serveur de développement**

```bash
npm run dev
# ou
yarn dev
```

5. **Ouvrir dans le navigateur**

```
http://localhost:5173/PortFolio/
```

### Scripts disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run preview      # Prévisualisation du build
npm run test         # Tests unitaires
npm run lint         # Vérification du code
npm run deploy       # Déploiement sur GitHub Pages
```

---

## 📱 Fonctionnalités principales

### 🎯 Page d'accueil

- **Présentation personnelle** avec photo et informations
- **Stack technique** interactive avec hover effects
- **Section projets** avec navigation vers les détails
- **Expériences** en format timeline
- **Formulaire de contact** modal avec validation

### 📄 Gestion des projets

- **Galerie d'images** avec modal plein écran
- **Description détaillée** avec stack technique
- **Actions** (lien GitHub, démo live)
- **Navigation fluide** entre les projets

### 📊 Système d'expériences

- **Timeline interactive** avec périodes multiples
- **Modal détaillée** avec technologies utilisées
- **Génération PDF** pour téléchargement
- **Filtrage** par technologies

### 🔐 Administration

- **Authentification** sécurisée Supabase
- **CRUD projets** avec upload d'images
- **Gestion expériences** avec périodes
- **Interface intuitive** pour la maintenance

---

## 🎨 Design et UX

### 🎨 Identité visuelle

- **Palette de couleurs** : Bleu Guardian (#1f6feb à #58a6ff)
- **Glassmorphism** : Effets de transparence et flou
- **Dégradés** : Transitions fluides entre les couleurs
- **Typographie** : Hiérarchie claire et lisible

### ✨ Animations

- **Framer Motion** : Animations fluides et naturelles
- **Micro-interactions** : Feedback visuel sur les interactions
- **Transitions** : Navigation fluide entre les pages
- **Loading states** : États de chargement élégants

### 📱 Responsive Design

- **Mobile-first** : Optimisé pour les petits écrans
- **Breakpoints** : Adaptation à tous les appareils
- **Touch-friendly** : Interactions optimisées pour mobile
- **Performance** : Chargement rapide sur tous les réseaux

---

## 🔧 Configuration

### Variables d'environnement

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_USER_ID=your_user_id
```

### Base de données Supabase

Le projet utilise Supabase pour :

- **Authentification** des administrateurs
- **Stockage** des projets et expériences
- **Upload** et gestion des images
- **API REST** pour les données dynamiques

### EmailJS

Configuration pour l'envoi d'emails :

- **Template HTML** personnalisé
- **Validation** côté client
- **Feedback** utilisateur en temps réel

---

## 📊 Performance

### Optimisations

- **Code splitting** avec React Router
- **Lazy loading** des images
- **Compression** automatique des images
- **Bundle optimization** avec Vite

### Métriques

- **Lighthouse Score** : 95+ sur tous les critères
- **First Contentful Paint** : < 1.5s
- **Largest Contentful Paint** : < 2.5s
- **Cumulative Layout Shift** : < 0.1

---

## 🤝 Contribution

Ce projet est un portfolio personnel, mais les suggestions d'amélioration sont les bienvenues !

### Comment contribuer

1. **Fork** le projet
2. **Créer** une branche feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** vos changements (`git commit -m 'Add some AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrir** une Pull Request

---

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

## 📞 Contact

**Goran Paunovic** - Développeur Web Full Stack

- 📧 **Email** : [g.paunovic.8@gmail.com](mailto:g.paunovic.8@gmail.com)
- 🌐 **Portfolio** : [https://gpaunovic72.github.io/PortFolio/](https://gpaunovic72.github.io/PortFolio/)
- 📍 **Localisation** : Le Breil sur Mérize, 72370

---

<div align="center">

**Merci de votre visite ! 🚀**

_N'hésitez pas à me contacter pour échanger ou collaborer sur vos projets._

</div>
# Test de déploiement automatique - Sat Aug 16 23:27:38 CEST 2025
# Redéploiement avec variables EmailJS - Sat Aug 16 23:39:15 CEST 2025
