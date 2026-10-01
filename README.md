# Solusen - Plateforme d'Insertion Professionnelle pour Étudiants et Jeunes Diplômés

![Solusen](https://img.shields.io/badge/Project-Solusen-blue)
![GET409](https://img.shields.io/badge/Course-GET409-green)
![Swiss-UMEF](https://img.shields.io/badge/University-Swiss%20UMEF%20Dakar-orange)

---

## 📋 Contexte du Projet

**Cours :** GET 409 - Innovation & Transformation Numérique  
**Institution :** Swiss UMEF University Dakar  
**Année Académique :** 2025-2026  
**Dépôt GitHub :** [https://github.com/MoussaSY23/stage-connect-dakar.git](https://github.com/MoussaSY23/stage-connect-dakar.git)  
**Application Live :** [https://stage-connect-dakar.lovable.app](https://stage-connect-dakar.lovable.app)

---

## 👥 Équipe du Projet

| Membre | Rôle | Responsabilités |
|--------|------|-----------------|
| **Moussa Sy** | Chef de Produit / Prompt Engineer / Dev UI | Responsable Impact, Architecture UI, Conception des Prompts |

---

## 🎯 Problématique

À Dakar, les étudiants et jeunes diplômés font face à des défis majeurs dans leur recherche de stages et de formations professionnelles :

- **Manque d'accès à des informations vérifiées** sur les opportunités de stage et de formation
- **Dépendance au "bras long"** (réseau informel et relations personnelles) pour accéder aux opportunités
- **Risque d'arnaques** et d'offres frauduleuses non vérifiées
- **Absence de centralisation** des offres professionnelles fiables

### Persona : Modou

- **Âge :** 22 ans
- **Profil :** Étudiant à l'Université Cheikh Anta Diop (UCAD), Dakar
- **Objectif :** Trouver un stage de qualité ou une formation professionnelle certifiante
- **Douleurs :**
  - Passe des heures sur les réseaux sociaux sans trouver d'offres vérifiées
  - Ne connaît pas les entreprises recruteuses fiables
  - Craint les arnaques et les fausses promesses
  - Dépend de son réseau limité pour obtenir des opportunités

---

## 💡 Solution : Solusen

**Solusen** est une plateforme web centralisée d'insertion professionnelle, conçue spécifiquement pour les étudiants et jeunes diplômés sénégalais. Elle intègre un **Agent IA conversationnel embarqué** pour :

- **Guider** les utilisateurs dans leur recherche de stages et formations
- **Orienter** vers les opportunités les plus pertinentes selon leur profil
- **Certifier** les offres pour garantir leur authenticité et fiabilité

### Objectifs du Projet

1. **Centraliser** les offres de stages et formations vérifiées en un seul point d'accès
2. **Démocratiser** l'accès aux opportunités professionnelles au-delà du réseau informel
3. **Sécuriser** les parcours d'insertion grâce à la certification des offres par l'Agent IA
4. **Accélérer** la transition études-emploi pour les jeunes diplômés dakarois

---

## 🏗️ Architecture Technique & Stack

### Stack Technique (Lovable.dev)

- **Frontend :** React.js avec Vite
- **Styling :** Tailwind CSS
- **Plateforme de développement :** [Lovable.dev](https://lovable.dev)
- **Hébergement :** Lovable (https://stage-connect-dakar.lovable.app)
- **Dépôt Git :** GitHub avec synchronisation automatique Lovable

### Architecture Prévue

```
┌─────────────────────────────────────────────────────────────┐
│                    SOLUSEN PLATFORM                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐         ┌──────────────────┐         │
│  │  Frontend Web     │         │  Backend API      │         │
│  │  (React + Vite)   │◄────────┤  (Node.js/Python) │         │
│  └────────┬─────────┘         └────────┬─────────┘         │
│           │                            │                    │
│           │                            │                    │
│  ┌────────▼─────────┐         ┌────────▼─────────┐         │
│  │  Widget Agent IA │         │  Base de Données  │         │
│  │  (Conversationnel)│         │  (PostgreSQL/Mongo)│         │
│  └──────────────────┘         └──────────────────┘         │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │  Hébergement OVH     │
              │  (Cloud Public)      │
              └──────────────────────┘
```

### Widget Agent IA

Le widget conversationnel embarqué permettra :
- Dialogue naturel en français et wolof
- Analyse des profils utilisateurs
- Recommandation personnalisée d'offres
- Vérification automatique de la légitimité des offres
- Conseils sur la préparation aux entretiens

---

## 📁 Structure du Projet

```
stage-connect-dakar/
│
├── README.md                          # Présentation du projet (ce fichier)
├── livrables/                         # Livrables académiques GET409
│   └── LIVRABLE_2.md                  # HMW, VPC, Journal de Prompts
│
├── src/                               # Code source React (généré par Lovable)
│   ├── components/
│   ├── pages/
│   └── styles/
│
├── public/                            # Assets statiques
│
└── package.json                       # Dépendances Node.js
```

---

## 🌐 Application Live

L'application est accessible en ligne : **[https://stage-connect-dakar.lovable.app](https://stage-connect-dakar.lovable.app)**

### Pages de l'Application

1. **Accueil** - Présentation de Solusen avec statistiques et persona Modou
2. **Offres de Stages & Formations** - Liste d'offres certifiées avec filtres par zone et type
3. **Contact & Orientation** - Formulaire de contact et informations Swiss UMEF Dakar

---

## 🚀 Roadmap

- [x] **Phase 1 :** Conception et documentation (HMW, VPC, Prompts)
- [x] **Phase 2 :** Développement du MVP Frontend (React + Tailwind via Lovable)
- [ ] **Phase 3 :** Intégration de l'Agent IA
- [ ] **Phase 4 :** Tests et validation utilisateurs
- [ ] **Phase 5 :** Déploiement backend sur OVH et lancement complet

---

## 🛠️ Développement avec Lovable

Ce projet a été construit avec [Lovable](https://lovable.dev).

Continuez le développement dans l'éditeur Lovable : [Lovable Editor](https://lovable.dev/projects/072e751a-f576-51c8-8702-ae8aec88b05c)

- **Ship faster** : Décrivez ce que vous voulez construire et Lovable gère le code
- **Stay in sync** : Chaque changement fait dans Lovable est commité directement dans ce dépôt
- **Full ownership** : Ce code est à vous. Pushez sur `main` sur GitHub et vos changements se synchronisent dans Lovable

### Développement Local

Préférez travailler localement ? Vous avez besoin de Node.js et npm — [installez avec nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone https://github.com/MoussaSY23/stage-connect-dakar.git
cd stage-connect-dakar
npm i
npm run dev
```

---

## 📞 Contact

- **Chef de Projet :** Moussa Sy
- **Dépôt GitHub :** [https://github.com/MoussaSY23/stage-connect-dakar.git](https://github.com/MoussaSY23/stage-connect-dakar.git)
- **Application Live :** [https://stage-connect-dakar.lovable.app](https://stage-connect-dakar.lovable.app)
- **Institution :** Swiss UMEF University Dakar

---

## 📄 Licence

Ce projet est réalisé dans le cadre du cours GET 409 à Swiss UMEF University Dakar.

---

*Solusen - Pour une insertion professionnelle équitable et sécurisée au Sénégal* 🇸🇳
