# Livrable L5 : Spécification de la Fonctionnalité IA Innovante (GET 409)
**Application :** Solusen — Insertion Professionnelle Certifiée à Dakar
**Pattern retenu :** Pattern 5 — Sortie actionnable (Action directe WhatsApp)

---

## 1. Formulation du Problème et Bénéfice Utilisateur
- **Pour qui :** Les étudiants et jeunes diplômés à Dakar (ex: Modou Sene).
- **Situation :** Lorsqu'une opportunité certifiée correspondant à leur profil est identifiée par l'agent RAG.
- **Action de l'agent :** Génération dynamique d'une action de contact direct (`wa.me`) pré-formatée avec le titre du poste et l'identifiant de certification.
- **Bénéfice :** Élimination totale des intermédiaires informels ("bana-bana" du recrutement), contournement du népotisme ("bras long") et démarche 100 % gratuite.

## 2. Spécification Technique
- **Côté Dify :** Le nœud Rédacteur synthétise la fiche et intègre le lien d'action instantanée.
- **Côté Frontend :** Affichage Markdown natif cliquable ouvrant l'application WhatsApp Web ou mobile de l'étudiant.
- **Principe Human-in-the-loop :** L'agent prépare le message, mais l'étudiant reste le seul décisionnaire qui déclenche l'envoi.

## 3. Note d'Éthique & Garde-fous (Loi sénégalaise 2008-12)
- **Risque identifié :** Exposition directe d'un numéro de téléphone ou envoi de messages automatisés non sollicités (spam).
- **Garde-fou mis en œuvre :** Utilisation d'un standard institutionnel vérifié (aucun numéro personnel privé d'employé divulgué) et validation humaine obligatoire avant transmission.
