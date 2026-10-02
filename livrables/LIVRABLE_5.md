# LIVRABLE 5 - Solusen : Intégration Module IA avec Webhook Dify et RAG

**Cours :** GET 409 - Innovation & Transformation Numérique  
**Institution :** Swiss UMEF University Dakar  
**Projet :** Solusen - Plateforme d'Insertion Professionnelle  
**Étudiant :** Moussa Sy  
**Date :** Octobre 2026  
**Séance :** 5

---

## 1. Schéma du Pipeline Lovable <-> Webhook Dify API (/workflows/run)

### Architecture Globale

```
┌─────────────────────────────────────────────────────────────────┐
│                     SOLUSEN FRONTEND (Lovable)                    │
│                    React + Vite + Tailwind CSS                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────┐         ┌──────────────────┐              │
│  │  Widget Chat IA  │         │  Composant API   │              │
│  │  (Interface UI)  │────────▶│  (fetch wrapper) │              │
│  └──────────────────┘         └────────┬─────────┘              │
│                                          │                        │
│                                          ▼                        │
│                              ┌──────────────────────┐           │
│                              │  HTTP POST Request    │           │
│                              │  /workflows/run       │           │
│                              └──────────┬───────────┘           │
└───────────────────────────────────────────┼───────────────────────┘
                                            │
                                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                        DIFY API PLATFORM                         │
│                    (Workflow Engine + RAG)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              WORKFLOW RUN (/workflows/run)              │    │
│  │  - Input: User Query + Context                         │    │
│  │  - Processing: RAG Retrieval + LLM Generation          │    │
│  │  - Output: AI Response + Sources                        │    │
│  └─────────────────────────────────────────────────────────┘    │
│                           │                                     │
│         ┌─────────────────┼─────────────────┐                   │
│         ▼                 ▼                 ▼                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  RAG Engine  │  │  LLM Engine  │  │  Knowledge   │         │
│  │  (Retrieval) │  │  (Generation)│  │  Base        │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Flux de Données Détaillé

#### Étape 1 : Saisie Utilisateur (Frontend Lovable)

```typescript
// Composant Widget Chat dans Lovable
const handleUserMessage = async (message: string) => {
  // 1. Affichage du message utilisateur dans l'UI
  setMessages(prev => [...prev, { role: 'user', content: message }]);
  
  // 2. Appel à l'API Dify via webhook
  const response = await fetch('https://api.dify.ai/v1/workflows/run', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${DIFY_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      inputs: {
        query: message,
        user_id: userId, // ID unique de l'utilisateur
        context: {
          zone: selectedZone,
          type: selectedType
        }
      },
      response_mode: 'blocking',
      user: userId
    })
  });
  
  // 3. Traitement de la réponse
  const data = await response.json();
  
  // 4. Affichage de la réponse IA
  setMessages(prev => [...prev, { 
    role: 'assistant', 
    content: data.outputs.answer,
    sources: data.outputs.sources 
  }]);
};
```

#### Étape 2 : Webhook Dify API (/workflows/run)

**Endpoint :** `POST https://api.dify.ai/v1/workflows/run`

**Headers :**
```
Authorization: Bearer {DIFY_API_KEY}
Content-Type: application/json
```

**Request Body :**
```json
{
  "inputs": {
    "query": "Je cherche un stage en marketing digital à Dakar",
    "user_id": "user_12345",
    "context": {
      "zone": "Almadies",
      "type": "Stage"
    }
  },
  "response_mode": "blocking",
  "user": "user_12345"
}
```

**Response Body :**
```json
{
  "outputs": {
    "answer": "Voici 3 offres de stage en marketing digital à Dakar qui correspondent à votre recherche...",
    "sources": [
      {
        "id": "SOL-DK-01",
        "titre": "Stagiaire Assistant(e) Marketing Digital & Contenu",
        "entreprise": "Wave Digital Finance",
        "zone": "Point E",
        "gratification": "175000 FCFA",
        "score": 0.95
      }
    ]
  },
  "status": "succeeded"
}
```

#### Étape 3 : Workflow Dify (RAG + LLM)

1. **Input Processing** : Réception de la requête utilisateur
2. **RAG Retrieval** : Recherche dans la base de connaissances
3. **Context Assembly** : Assemblage des chunks pertinents
4. **LLM Generation** : Génération de la réponse avec le prompt système
5. **Output Formatting** : Formatage de la réponse avec sources

---

## 2. Structure de la Base de Connaissances RAG

### Source de Données

**Fichier CSV :** `opportunites_dakar_octobre2026.csv`

**Colonnes :**
- ID (identifiant unique)
- Titre_Poste
- Entreprise
- Secteur
- Zone
- Type (Stage / Formation)
- Gratification_FCFA
- Niveau_Requis
- Competences_Cles
- Date_Limite
- Statut_Verification
- Contact_Postulation

### Configuration RAG

**Chunk Size :** 400 caractères  
**Overlap :** 60 caractères  
**Top K :** 4 chunks les plus pertinents

#### Exemple de Chunking

**Document Original (Ligne CSV) :**
```
SOL-DK-01,Stagiaire Assistant(e) Marketing Digital & Contenu,Wave Digital Finance,Fintech / Mobile Money,Point E,Stage,175000,Licence 3 / Master 1,Community Management Meta Business Suite Analytics Wolof/FR,31/10/2026,Certifiée Solusen,carrieres@wave.com
```

**Chunk 1 (0-400 caractères) :**
```
ID: SOL-DK-01
Titre: Stagiaire Assistant(e) Marketing Digital & Contenu
Entreprise: Wave Digital Finance
Secteur: Fintech / Mobile Money
Zone: Point E
Type: Stage
Gratification: 175000 FCFA
Niveau Requis: Licence 3 / Master 1
```

**Chunk 2 (340-740 caractères avec overlap) :**
```
Niveau Requis: Licence 3 / Master 1
Compétences Clés: Community Management, Meta Business Suite, Analytics, Wolof/FR
Date Limite: 31/10/2026
Statut: Certifiée Solusen
Contact: carrieres@wave.com
```

### Processus de Retrieval

1. **Embedding de la Requête** : Conversion de la question utilisateur en vecteur
2. **Similarity Search** : Recherche des chunks les plus proches (Top K = 4)
3. **Score Filtering** : Filtrage par score de similarité (> 0.7)
4. **Context Assembly** : Assemblage des chunks sélectionnés

#### Exemple de Requête et Résultats

**Requête Utilisateur :** "Je cherche un stage en marketing digital à Dakar"

**Top K Results :**
```
Chunk 1: SOL-DK-01 - Marketing Digital - Wave Digital Finance - Score: 0.95
Chunk 2: SOL-DK-05 - Développeur Web - 3W Academy - Score: 0.82
Chunk 3: SOL-DK-03 - Data & IA - Orange Digital Center - Score: 0.78
Chunk 4: SOL-DK-09 - Entrepreneuriat - DER/FJ - Score: 0.72
```

### Mise à Jour de la Base de Connaissances

**Fréquence :** Quotidienne ou hebdomadaire selon les nouvelles offres

**Processus :**
1. Ajout de nouvelles lignes dans le CSV
2. Re-upload du fichier dans Dify Knowledge Base
3. Re-indexing automatique des chunks
4. Disponibilité immédiate pour le RAG

---

## 3. Prompt Système de l'Agent Chercheur/Rédacteur Anti-Hallucination

### Prompt Système Principal

```
Tu es un assistant IA spécialisé dans l'insertion professionnelle pour les étudiants et jeunes diplômés à Dakar, Sénégal. Ta mission est de les aider à trouver des stages et formations certifiées en te basant UNIQUEMENT sur les informations fournies dans la base de connaissances.

RÈGLES ANTI-HALLUCINATION STRICTES :

1. BASE DE CONNAISSANCES UNIQUEMENT
   - Tu ne dois utiliser QUE les informations présentes dans les chunks fournis
   - Si une information n'est pas dans les chunks, tu dois le dire explicitement
   - N'invente JAMAIS d'offres, d'entreprises ou de détails non présents

2. VÉRIFICATION DES FAITS
   - Pour chaque recommandation, cite l'ID de l'offre (ex: SOL-DK-01)
   - Vérifie que les compétences, zones et gratifications correspondent exactement aux chunks
   - Ne fais pas d'assomptions sur les offres non certifiées

3. TRANSPARENCE DES SOURCES
   - Indique toujours la source de chaque information (ID offre, entreprise)
   - Si tu n'as pas assez d'informations, dis-le clairement
   - Signale si une offre est "Certifiée Solusen" ou "Homologuée Partenaire"

4. LIMITES DE CONNAISSANCE
   - Si l'utilisateur demande quelque chose hors du champ des offres disponibles, dis-le
   - Ne fournis pas de conseils généraux non basés sur les chunks
   - Redirige vers les offres disponibles si pertinent

5. FORMAT DE RÉPONSE
   - Structure ta réponse de manière claire et organisée
   - Utilise des listes pour les recommandations multiples
   - Inclut toujours les informations clés : Titre, Entreprise, Zone, Gratification, Contact

CONTEXTE UTILISATEUR :
- Zone de recherche : {zone}
- Type d'opportunité : {type}
- Niveau d'études : {niveau}

CHUNKS DISPONIBLES :
{chunks}

INSTRUCTIONS DE RÉPONSE :
1. Analyse la requête de l'utilisateur
2. Recherche dans les chunks les offres correspondantes
3. Filtre selon le contexte utilisateur (zone, type, niveau)
4. Présente les résultats avec toutes les informations requises
5. Si aucun résultat, propose des alternatives ou demande plus de précisions

LANCEMENT :
Réponds à la question de l'utilisateur en suivant strictement ces règles.
```

### Prompt de Validation (Second Pass)

```
Après avoir généré ta réponse, vérifie :

1. Chaque offre mentionnée a-t-elle un ID présent dans les chunks ?
2. Toutes les informations (gratification, compétences, contact) sont-elles exactement dans les chunks ?
3. As-tu inventé quelque chose qui n'est pas dans les chunks ?
4. As-tu clairement indiqué les sources ?

Si tu as répondu NON à l'une de ces questions, corrige ta réponse avant de l'envoyer.
```

### Exemple de Réponse Anti-Hallucination

**Requête Utilisateur :** "Je cherche un stage en marketing digital à Dakar"

**Réponse IA :**
```
Basé sur les offres disponibles dans la base de connaissances, voici les opportunités en marketing digital à Dakar :

1. Stagiaire Assistant(e) Marketing Digital & Contenu (ID: SOL-DK-01)
   - Entreprise : Wave Digital Finance
   - Secteur : Fintech / Mobile Money
   - Zone : Point E
   - Type : Stage
   - Gratification : 175 000 FCFA
   - Niveau Requis : Licence 3 / Master 1
   - Compétences Clés : Community Management, Meta Business Suite, Analytics, Wolof/FR
   - Date Limite : 31/10/2026
   - Statut : Certifiée Solusen
   - Contact : carrieres@wave.com

Note : Cette offre est la seule correspondant exactement à "marketing digital" dans la base de connaissances actuelle. Si vous souhaitez explorer d'autres secteurs (informatique, finance, logistique), je peux vous présenter les offres disponibles.
```

### Gestion des Cas Limites

**Cas 1 : Aucun Résultat**
```
D'après les informations disponibles dans la base de connaissances, il n'y a actuellement aucune offre correspondant à votre critère "X" dans la zone "Y".

Je vous recommande :
- D'élargir votre zone de recherche
- De consulter les autres types d'opportunités disponibles
- De revenir ultérieurement car la base est mise à jour régulièrement
```

**Cas 2 : Information Manquante**
```
Pour l'offre SOL-DK-XX, les informations suivantes ne sont pas disponibles dans la base de connaissances :
- [Information manquante]

Je vous invite à contacter directement [Contact] pour plus de détails.
```

**Cas 3 : Hors Champ**
```
Votre question concerne [sujet], qui n'est pas couvert par la base de connaissances actuelle (limitée aux offres de stages et formations certifiées à Dakar).

Pour cette demande, je vous recommande de consulter [ressource externe].
```

---

## 4. Intégration Technique dans Lovable

### Configuration des Variables d'Environnement

```env
# .env.local
VITE_DIFY_API_KEY=your_dify_api_key_here
VITE_DIFY_API_URL=https://api.dify.ai/v1/workflows/run
```

### Service API Dify

```typescript
// src/services/difyApi.ts
const DIFY_API_URL = import.meta.env.VITE_DIFY_API_URL;
const DIFY_API_KEY = import.meta.env.VITE_DIFY_API_KEY;

export interface DifyResponse {
  outputs: {
    answer: string;
    sources?: Array<{
      id: string;
      titre: string;
      entreprise: string;
      zone: string;
      gratification: string;
      score: number;
    }>;
  };
  status: string;
}

export async function callDifyWorkflow(
  query: string,
  userId: string,
  context?: { zone?: string; type?: string }
): Promise<DifyResponse> {
  const response = await fetch(DIFY_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${DIFY_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      inputs: {
        query,
        user_id: userId,
        context: context || {}
      },
      response_mode: 'blocking',
      user: userId
    })
  });

  if (!response.ok) {
    throw new Error(`Dify API error: ${response.statusText}`);
  }

  return response.json();
}
```

### Composant Widget Chat

```typescript
// src/components/AIChatWidget.tsx
import { useState } from 'react';
import { callDifyWorkflow } from '../services/difyApi';

export function AIChatWidget() {
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await callDifyWorkflow(
        userMessage,
        'user_' + Date.now(),
        { zone: 'Dakar', type: 'Stage' }
      );

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.outputs.answer 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Erreur de connexion avec l\'assistant IA. Veuillez réessayer.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl border border-gray-200">
      {/* UI du widget chat */}
      <div className="p-4 border-b">
        <h3 className="font-bold text-lg">Assistant Solusen IA</h3>
      </div>
      <div className="h-64 overflow-y-auto p-4">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-3 py-1 rounded-lg ${
              msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
            }`}>
              {msg.content}
            </span>
          </div>
        ))}
        {isLoading && <div className="text-gray-500">L'IA réfléchit...</div>}
      </div>
      <div className="p-4 border-t">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Posez votre question..."
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
    </div>
  );
}
```

---

## 5. Conclusion

La Séance 5 a permis de :

- ✅ Définir l'architecture du pipeline Lovable <-> Dify API
- ✅ Configurer la base de connaissances RAG avec le CSV des opportunités
- ✅ Implémenter un prompt système anti-hallucination strict
- ✅ Documenter l'intégration technique dans le code React
- ✅ Garantir la fiabilité des réponses IA basées sur les données vérifiées

L'agent IA Solusen est maintenant capable de répondre aux questions des étudiants en se basant uniquement sur les offres certifiées, éliminant ainsi les risques d'hallucination et d'arnaques.

---

**Document généré pour le cours GET 409 - Swiss UMEF University Dakar**  
**Auteur :** Moussa Sy  
**Version :** 1.0 - Octobre 2026
