# Solusen - Plateforme d'Insertion Professionnelle pour Étudiants et Jeunes Diplômés

![Solusen](https://img.shields.io/badge/Project-Solusen-blue)
![GET409](https://img.shields.io/badge/Course-GET409-green)
![Swiss-UMEF](https://img.shields.io/badge/University-Swiss%20UMEF%20Dakar-orange)

---

## 📋 Contexte du Projet

**Cours :** GET 409 - Innovation & Transformation Numérique  
**Institution :** Swiss UMEF University Dakar  
**Année Académique :** 2025-2026  
**Dépôt GitHub :** [https://github.com/MoussaSY23/GET409-.git](https://github.com/MoussaSY23/GET409-.git)

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

## 🏗️ Architecture Technique

### Composants Principaux

```
┌─────────────────────────────────────────────────────────────┐
│                    SOLUSEN PLATFORM                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐         ┌──────────────────┐         │
│  │  Frontend Web     │         │  Backend API      │         │
│  │  (React/Next.js)  │◄────────┤  (Node.js/Python) │         │
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

### Stack Technique

- **Frontend :** React.js / Next.js avec TypeScript
- **Backend :** Node.js (Express) ou Python (FastAPI)
- **Base de données :** PostgreSQL ou MongoDB
- **Agent IA :** API OpenAI GPT-4 ou modèle local (Llama)
- **Hébergement :** OVHcloud Public Cloud
- **Authentification :** JWT / OAuth2

### Widget Agent IA

Le widget conversationnel embarqué permet :
- Dialogue naturel en français et wolof
- Analyse des profils utilisateurs
- Recommandation personnalisée d'offres
- Vérification automatique de la légitimité des offres
- Conseils sur la préparation aux entretiens

---

## 📁 Arborescence Prévue des Livrables

```
Livrables/
│
├── README.md                          # Présentation du projet (ce fichier)
├── LIVRABLE_2.md                      # HMW, VPC, Journal de Prompts
│
├── docs/                              # Documentation technique
│   ├── architecture.md
│   ├── api-spec.md
│   └── prompts-engineering.md
│
├── src/                               # Code source
│   ├── frontend/
│   │   ├── components/
│   │   ├── pages/
│   │   └── styles/
│   ├── backend/
│   │   ├── api/
│   │   ├── models/
│   │   └── services/
│   └── ai-agent/
│       ├── prompts/
│       └── integration/
│
├── tests/                             # Tests unitaires et E2E
│   ├── frontend/
│   └── backend/
│
└── deployment/                        # Configuration déploiement
    ├── docker/
    └── ovh-config/
```

---

## 🚀 Roadmap

- [x] **Phase 1 :** Conception et documentation (HMW, VPC, Prompts)
- [ ] **Phase 2 :** Développement du MVP (Frontend + Backend)
- [ ] **Phase 3 :** Intégration de l'Agent IA
- [ ] **Phase 4 :** Tests et validation utilisateurs
- [ ] **Phase 5 :** Déploiement sur OVH et lancement

---

## 📞 Contact

- **Chef de Projet :** Moussa Sy
- **Dépôt GitHub :** [https://github.com/MoussaSY23/GET409-.git](https://github.com/MoussaSY23/GET409-.git)
- **Institution :** Swiss UMEF University Dakar

---

## 📄 Licence

Ce projet est réalisé dans le cadre du cours GET 409 à Swiss UMEF University Dakar.

---

*Solusen - Pour une insertion professionnelle équitable et sécurisée au Sénégal* 🇸🇳
