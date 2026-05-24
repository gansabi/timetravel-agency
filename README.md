# 🕰️ TimeTravel Agency — Webapp Interactive

Webapp moderne et interactive pour une agence de voyage temporel fictive, permettant aux clients de découvrir 3 destinations temporelles (Paris 1889, Crétacé -65M, Florence 1504), d'interagir avec un agent conversationnel IA (Mistral AI), et de réserver leur voyage.

## 👥 Équipe

- Helina Sahle

## 🛠️ Stack Technique

| Catégorie | Technologie |
|-----------|-------------|
| Framework | React 18 + TypeScript |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion |
| Icônes | Lucide React |
| IA / Chatbot | Mistral AI API (mistral-small-latest) |
| Build | Vite 5 |
| Déploiement | Vercel / Netlify |

## ✨ Features Implémentées

### Phase 1 — Architecture & Planning
- ✅ Définition des features essentielles :
  - Page d'accueil (Hero section avec vidéo de fond, présentation de l'agence, CTA vers les destinations)
  - Galerie des destinations (Cards interactives pour les 3 époques, visuels générés, infos détaillées)
  - Agent conversationnel (Chatbot IA Mistral intégré, conseils personnalisés, FAQ automatisée)
  - Formulaire de réservation (Sélection destination + dates, validation automatisée)
- ✅ Structure de navigation (Header → Hero → Destinations → Réservation → Chat → Footer)
- ✅ Design responsive mobile-first

### Phase 2 — Génération de Code (Vibe Coding)
- ✅ Page d'accueil avec Hero section + vidéo de fond (assets du projet 1)
- ✅ Galerie des 3 destinations avec cards interactives et modal détaillé
- ✅ Intégration des visuels générés lors du premier projet TimeTravel (images + vidéos)
- ✅ Animations au scroll (fade-in, hover effects) avec Framer Motion
- ✅ Design premium dark mode avec accents dorés
- ✅ Lazy loading des images
- ✅ Navigation responsive avec menu mobile

### Phase 3 — Intelligence Artificielle & Agents
- ✅ Chatbot IA intégré avec Mistral AI API (modèle mistral-small-latest)
- ✅ Personnalité configurée (guide temporel professionnel et chaleureux)
- ✅ Réponses contextuelles avec mémoire de conversation
- ✅ Contraintes strictes : ne propose que les 3 destinations disponibles
- ✅ Fallback local (dictionnaire de mots-clés) si l'API est indisponible
- ✅ Indicateur de chargement pendant la réponse IA
- ✅ Rendu markdown dans les messages

### Phase 4 — Documentation & Déploiement
- ✅ README.md complet
- ✅ Code documenté et structuré
- ✅ Fichier .env.example pour la configuration
- ✅ Build de production optimisé
- ✅ Formulaire de réservation avec validation automatisée

## 🤖 IA Utilisées

| Usage | Outil |
|-------|-------|
| Génération de code | Kiro (Claude) |
| Chatbot intégré | Mistral AI API (mistral-small-latest) |
| Visuels destinations | Générés lors du projet 1 (IA_projet) |

### Architecture du Chatbot

```
Utilisateur → Message envoyé → API Mistral AI → Réponse contextuelle
                              ↓ (si erreur)
                              → Fallback dictionnaire local
```

Le chatbot utilise un system prompt strict qui :
- Limite les réponses aux 3 destinations uniquement
- Maintient un historique de conversation pour le contexte
- Répond en français, de manière concise
- Redirige vers le formulaire de réservation

## 🚀 Installation & Lancement

```bash
# Cloner le projet
git clone https://github.com/gansabi/timetravel-agency.git
cd timetravel-agency

# Installer les dépendances
npm install

# Configurer la clé API Mistral
cp .env.example .env
# Éditer .env avec votre clé API depuis https://console.mistral.ai

# Lancer en développement
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

## 🔑 Configuration API

1. Créer un compte sur [console.mistral.ai](https://console.mistral.ai)
2. Générer une clé API (gratuit)
3. Ajouter la clé dans `.env` :
```
VITE_MISTRAL_API_KEY=votre_cle_ici
```

## 📁 Structure du Projet

```
timetravel-agency/
├── public/
│   ├── images/          # Visuels des destinations (projet 1)
│   └── videos/          # Vidéos de fond (projet 1)
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # Navigation responsive
│   │   ├── Hero.tsx            # Section héro avec vidéo de fond
│   │   ├── Destinations.tsx    # Galerie des 3 époques
│   │   ├── DestinationModal.tsx # Détails destination (modal)
│   │   ├── BookingForm.tsx     # Formulaire de réservation
│   │   ├── Chatbot.tsx         # Agent conversationnel Mistral AI
│   │   └── Footer.tsx          # Pied de page + contact
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.example
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## 🎨 Design

- Thème : Dark mode premium avec accents dorés (#d4af37)
- Typographie : Playfair Display (titres) + Inter (corps)
- Animations : Fade-in au scroll, hover effects, transitions fluides
- Responsive : Mobile-first, adapté à tous les écrans

## 🌐 Déploiement

Déployable en 1 clic sur :
- **Vercel** : `npx vercel`
- **Netlify** : Drag & drop du dossier `dist/`
- **GitHub Pages** : Via GitHub Actions

## 📄 Crédits

- Images & Vidéos : Générées par IA (projet TimeTravel phase 1)
- Icônes : Lucide React (MIT)
- Fonts : Google Fonts (Playfair Display, Inter)
- Framework : React (MIT), Vite (MIT)
- Animations : Framer Motion (MIT)
- IA Chatbot : Mistral AI API

## 📄 Licence

Projet pédagogique — M1/M2 Digital & IA — Ynov Campus 2025
