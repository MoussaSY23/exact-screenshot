export type OfferType = "Stage" | "Alternance" | "Formation";
export type Offer = {
  id: string;
  title: string;
  company: string;
  zone: string;
  pay: string;
  payNum: number;
  type: OfferType;
  level: "Licence" | "Master";
  tag: string;
  description: string;
};

export const OFFERS: Offer[] = [
  { id: "wave", title: "Stagiaire Product Analyst", company: "Wave Digital Finance", zone: "Point E", pay: "175 000 FCFA/mois", payNum: 175000, type: "Stage", level: "Master", tag: "Fintech", description: "Analyse des parcours utilisateurs mobile money et tableaux de bord produit." },
  { id: "gainde", title: "Développeur Full-Stack (Alternance)", company: "GAINDÉ 2000", zone: "Dakar Plateau", pay: "200 000 FCFA/mois", payNum: 200000, type: "Alternance", level: "Master", tag: "Tech", description: "Évolution de la plateforme de dédouanement ORBUS : React, Java, API." },
  { id: "odc", title: "Formation Intelligence Artificielle", company: "Orange Digital Center", zone: "Dakar Plateau", pay: "Gratuite", payNum: 0, type: "Formation", level: "Licence", tag: "IA", description: "12 semaines pour maîtriser Python, machine learning et IA générative. Certificat reconnu." },
  { id: "bdo", title: "Assistant Auditeur", company: "BDO Sénégal", zone: "Almadies", pay: "150 000 FCFA/mois", payNum: 150000, type: "Stage", level: "Master", tag: "Audit", description: "Missions d'audit légal et contractuel selon le référentiel SYSCOHADA." },
  { id: "sonatel", title: "Stagiaire Marketing Digital", company: "Sonatel Siège", zone: "Mermoz", pay: "160 000 FCFA/mois", payNum: 160000, type: "Stage", level: "Licence", tag: "Marketing", description: "Campagnes réseaux sociaux et analyse de performance des offres grand public." },
  { id: "3w", title: "Bootcamp Développeur Web", company: "3W Academy Sénégal", zone: "Mermoz", pay: "Bourses disponibles", payNum: 0, type: "Formation", level: "Licence", tag: "Tech", description: "Bootcamp intensif HTML, CSS, JavaScript et React, avec titre RNCP." },
  { id: "pikine", title: "Stagiaire Gestion de Projet Social", company: "Agence ADEPME Pikine", zone: "Pikine", pay: "100 000 FCFA/mois", payNum: 100000, type: "Stage", level: "Licence", tag: "Gestion", description: "Accompagnement des PME locales et suivi des programmes de financement." },
];
