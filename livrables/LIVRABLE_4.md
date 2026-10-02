# LIVRABLE 4 - Solusen : MVP Lovable et Optimisation Responsive

**Cours :** GET 409 - Innovation & Transformation Numérique  
**Institution :** Swiss UMEF University Dakar  
**Projet :** Solusen - Plateforme d'Insertion Professionnelle  
**Étudiant :** Moussa Sy  
**Date :** Octobre 2026  
**Séance :** 4

---

## 1. URL Publique Lovable Fonctionnelle (L1)

**Application Live :** https://stage-connect-dakar.lovable.app

### État de l'Application

L'application MVP Solusen est entièrement fonctionnelle et accessible publiquement via Lovable. Elle comprend :

- **Page d'accueil** avec présentation du projet, statistiques et persona Modou
- **Page des offres** avec liste de stages et formations certifiées
- **Page de contact** avec formulaire d'orientation
- **Navigation responsive** adaptée mobile et desktop
- **Design moderne** avec palette de couleurs cohérente (Bleu océan #0284C7, Vert émeraude #10B981)

### Accessibilité

L'application est accessible depuis n'importe quel navigateur web moderne, sans nécessité d'installation ou de configuration préalable.

---

## 2. Dépôt GitHub Public avec Code React/Vite (L2)

**Dépôt GitHub :** https://github.com/MoussaSY23/exact-screenshot.git

### Structure du Code Source

Le dépôt contient l'intégralité du code source de l'application MVP :

```
exact-screenshot/
├── src/
│   ├── components/          # Composants React réutilisables
│   ├── routes/             # Pages de l'application (index, offres, contact)
│   ├── styles.css          # Styles globaux Tailwind CSS
│   └── __root.tsx          # Composant racine avec layout
├── public/                 # Assets statiques
├── package.json            # Dépendances Node.js
├── tsconfig.json           # Configuration TypeScript
├── vite.config.ts          # Configuration Vite
└── README.md               # Documentation du projet
```

### Stack Technique

- **Framework :** React.js avec TypeScript
- **Build Tool :** Vite
- **Styling :** Tailwind CSS
- **Plateforme :** Lovable.dev
- **Hébergement :** Lovable (intégration continue)

### Caractéristiques du Code

- Code TypeScript typé pour la robustesse
- Composants modulaires et réutilisables
- Styles Tailwind CSS pour un design cohérent
- Configuration Vite pour un build rapide
- Intégration Git avec synchronisation automatique Lovable

---

## 3. Journal de Prompts (L3)

### Prompt d'Initialisation Tout-en-Un Optimisé

**Prompt utilisé pour générer le MVP complet sur Lovable :**

```
Crée une application web complète appelée Solusen.

CONTEXTE :

Solusen est une plateforme numérique d'insertion professionnelle centralisée pour les étudiants et jeunes diplômés dakarois (Sénégal) qui permet de rechercher des stages et des formations vérifiés, tout en éliminant les arnaques et la dépendance au "bras long".

PAGES À CRÉER (3 pages minimum) :

1. ACCUEIL

   - Header fixe avec logo (emoji 🎓 ou 💼) et nom "Solusen"

   - Section Hero : titre percutant "Trouvez votre stage certifié à Dakar", sous-titre expliquant la fin des arnaques et de la dépendance au réseau, et 2 boutons CTA : "Chercher une offre" et "En savoir plus"

   - Section Statistiques : 3 chiffres clés (ex: 1 200+ étudiants accompagnés, 450+ offres certifiées, 0 arnaque tolérée)

   - Section Présentation du Persona : mise en avant des besoins de l'étudiant Modou (UCAD)

   - Footer : mentions légales, campus Swiss UMEF Dakar, liens et contact

2. OFFRES DE STAGES & FORMATIONS

   - Liste de 6 offres réelles/fictives contextualisées à Dakar avec : Intitulé, Entreprise/Organisme, Zone (ex: Plateau, Almadies, Pikine), Gratification/Prix, Type (Stage / Formation), Statut (Certifiée / Vérification en cours)

   - Filtres de recherche par :

     * Type : Tous | Stage | Formation

     * Zone : Toutes zones | Dakar Plateau | Almadies | Pikine | Parcelles Assainies

   - Chaque offre présentée sous forme de carte moderne avec badge de certification "Offre Vérifiée IA"

3. CONTACT & ORIENTATION

   - Formulaire : Nom complet, Université/École (ex: UCAD, UMEF), E-mail, Téléphone, Domaine de recherche, Message

   - Bouton d'envoi principal

   - Adresse : Swiss UMEF University Dakar, Sénégal

DESIGN & STYLE :

- Couleur principale : #0284C7 (Bleu océan / Confiance)

- Couleur secondaire : #FFFFFF (Blanc)

- Accent : #10B981 (Vert émeraude / Certification & Équité)

- Style : moderne, épuré, responsive (Mobile-first, breakpoint 768px)

- Navigation : Barre fixe en haut reliant les 3 pages

DONNÉES D'EXEMPLE (À afficher dans la page Offres) :

1. Assistant Marketing Digital | Teranga Tech (Almadies) | Stage | Gratification: 150 000 FCFA/mois | Status: Certifiée

2. Développeur Web Junior | Dakar Innovation Lab (Plateau) | Stage | Gratification: 180 000 FCFA/mois | Status: Certifiée

3. Certification Data Analyst | Université Numérique | Formation | Prix: Gratuit | Status: Certifiée

4. Stagiaire Comptabilité | Groupe Ndiaye & Co (Pikine) | Stage | Gratification: 100 000 FCFA/mois | Status: Certifiée

5. Formation Design UX/UI | Baobab Digital Academy (Parcelles) | Formation | Prix: 50 000 FCFA | Status: Certifiée

6. Assistant Ressources Humaines | Sonatel Partner (Mermoz) | Stage | Gratification: 125 000 FCFA/mois | Status: Certifiée

Stack : React + Tailwind CSS + Vite
```

### Critères de Responsive et Filtres

**Exigences de Design Responsive :**

1. **Mobile-First Approach**
   - Conception prioritaire pour écrans mobiles (< 768px)
   - Layout adaptatif avec breakpoints : mobile (< 768px), tablette (768px-1024px), desktop (> 1024px)

2. **Navigation Responsive**
   - Header fixe adapté mobile
   - Menu hamburger pour mobile si nécessaire
   - Navigation fluide entre les 3 pages

3. **Cartes d'Offres Responsive**
   - Grille adaptative (1 colonne mobile, 2 tablette, 3 desktop)
   - Contenu lisible sur petits écrans
   - Badges de certification visibles

4. **Filtres de Recherche**
   - Filtres par Type (Stage / Formation / Tous)
   - Filtres par Zone géographique (Plateau, Almadies, Pikine, Parcelles, etc.)
   - Interface intuitive avec dropdowns ou boutons toggle
   - Mise à jour en temps réel de la liste des offres

5. **Performance Mobile**
   - Optimisation des images et assets
   - Chargement rapide sur connexion 3G
   - Lazy loading si nécessaire

---

## 4. Note d'Itération et Accessibilité Numérique (L4)

### Optimisation pour Réseaux 3G et Smartphones Modestes à Dakar

#### Contexte Technique Dakar

- **Connectivity :** Réseaux 3G dominants, 4G en expansion, zones avec couverture inégale
- **Devices :** Smartphones Android d'entrée/milieu de gamme (2-4 Go RAM)
- **Data Costs :** Coût élevé du data mobile, nécessité d'optimiser la consommation

#### Optimisations Implémentées

1. **Performance de Chargement**
   - Build Vite optimisé pour minimiser la taille des bundles
   - Code splitting pour charger uniquement les ressources nécessaires
   - Lazy loading des images et composants non critiques

2. **Optimisation Tailwind CSS**
   - Purge CSS automatique via Vite pour éliminer les styles inutilisés
   - CSS minifié en production
   - Utilisation de classes utilitaires plutôt que CSS personnalisé lourd

3. **Responsive Design Mobile-First**
   - Layouts fluides adaptés aux écrans de 320px à 768px
   - Touch targets de minimum 44px pour l'ergonomie tactile
   - Typographie lisible (16px minimum sur mobile)
   - Pas de dépendance au hover (interaction purement tactile)

4. **Réduction de la Consommation de Data**
   - Absence de vidéos ou animations lourdes
   - Images optimisées en WebP avec fallback JPEG
   - Compression des assets statiques
   - Cache HTTP configuré pour les ressources statiques

5. **Accessibilité (a11y)**
   - Contraste WCAG AA minimum (ratio 4.5:1)
   - Navigation clavier fonctionnelle
   - Labels ARIA pour les éléments interactifs
   - Texte alternatif pour les images

#### Tests de Performance

- **Lighthouse Score :** Target > 80 sur Performance
- **First Contentful Paint :** < 2s sur 3G
- **Time to Interactive :** < 5s sur 3G
- **Bundle Size :** < 500 KB gzippé

#### Itérations Futures

1. **PWA (Progressive Web App)**
   - Service Worker pour offline mode
   - Installation sur écran d'accueil
   - Notifications push pour nouvelles offres

2. **Optimisation Avancée**
   - Image compression avec Sharp
   - CDN pour assets statiques
   - Préchargement intelligent des routes

3. **Accessibilité Étendue**
   - Support du wolof dans l'interface
   - Mode sombre/clair
   - Police adaptée pour la lisibilité en plein soleil

---

## 5. Conclusion

La Séance 4 a permis de :

- ✅ Déployer un MVP fonctionnel sur Lovable avec URL publique
- ✅ Synchroniser le code React/Vite sur GitHub public
- ✅ Documenter le prompt d'initialisation tout-en-un
- ✅ Implémenter un design responsive mobile-first
- ✅ Optimiser l'application pour les contraintes techniques dakaroises (3G, smartphones modestes)

L'application est maintenant prête pour l'intégration du module IA dans la Séance 5.

---

**Document généré pour le cours GET 409 - Swiss UMEF University Dakar**  
**Auteur :** Moussa Sy  
**Version :** 1.0 - Octobre 2026
