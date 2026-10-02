# Rapport Final de Projet : Plateforme Solusen (GET 409)
*Orientation et Insertion Professionnelle Certifiée à Dakar*

## 1. Problématique & Proposition de Valeur
- Diagnostic du marché de l'emploi des jeunes diplômés à Dakar : asymétrie d'information, fausses annonces de stage réclamant des frais de dossier, culture informelle du "bras long".
- Mission de Solusen : Transparence radicale, NINEA vérifié, 0 FCFA de frais pour les étudiants, affichage obligatoire des gratifications réelles.

## 2. Architecture Technique Globale
- **Frontend** : React / TypeScript / Vite / Tailwind CSS (prototypé avec Lovable.dev, finalisé sous Windsurf).
- **Backend RAG & Orchestration** : Dify Workflow.
- **Moteur LLM & Inférence** : GroqCloud (Qwen3-32B / Llama 3) & Google AI Studio (Gemini Flash).
- **Base de Connaissances (Dataset)** : opportunites_dakar_octobre2026.csv (Index inversé économique pour éliminer la dépendance aux quotas d'embeddings).

## 3. Conception du Workflow RAG & Garde-fous Anti-Hallucination
- Pipeline : Début -> Récupération de Connaissances (K=3) -> Nœud Chercheur (extraction stricte {{#context#}}) -> Branche Si/Sinon (fallback INSUFFISANT) -> Nœud Rédacteur -> Sortie.
- Sécurité : Isolation stricte contre l'invention de stages non répertoriés.

## 4. Résultats des Tests & Métriques
- Taux de fidélité documentaire : 100 % sur les entreprises partenaires (Wave, GAINDÉ 2000, Orange Digital Center, Sonatel, BDO).
- Temps de réponse moyen de l'agent : ~1,2s.
- Conformité éthique : Aucun frais caché ni intermédiaire informel.
