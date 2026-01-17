import { Job } from "@/types/job";

// Mock data - In a real app, this would come from an API
export const jobs: Job[] = [
  {
    id: "1",
    title: "Développeur logiciel senior",
    company: "Tech Solutions BF",
    location: "Ouagadougou",
    type: "full-time",
    salary: "800 000 - 1 200 000 FCFA/mois",
    description:
      "Nous recherchons un développeur logiciel expérimenté pour rejoindre notre équipe en pleine croissance. Vous travaillerez sur des projets de pointe et contribuerez à façonner l'avenir de la technologie au Burkina Faso.",
    requirements: [
      "Licence en informatique ou domaine connexe",
      "5+ années d'expérience en développement logiciel",
      "Maîtrise de JavaScript, React et Node.js",
      "Solides compétences en résolution de problèmes",
    ],
    benefits: [
      "Assurance maladie",
      "Options de télétravail",
      "Opportunités de développement professionnel",
    ],
    postedDate: new Date(2024, 0, 15).toISOString(),
    deadline: new Date(2024, 2, 15).toISOString(),
    featured: true,
  },
  {
    id: "2",
    title: "Responsable marketing",
    company: "Agence de marketing digital",
    location: "Bobo-Dioulasso",
    type: "full-time",
    salary: "600 000 - 900 000 FCFA/mois",
    description:
      "Rejoignez notre équipe marketing dynamique et menez des campagnes pour les meilleures marques en Afrique de l'Ouest. Ce poste offre une liberté créative et des opportunités de croissance professionnelle.",
    requirements: [
      "Licence en marketing ou domaine connexe",
      "3+ années d'expérience en marketing",
      "Solides compétences en communication",
      "Connaissance des outils de marketing digital",
    ],
    benefits: ["Horaires flexibles", "Activités de team building"],
    postedDate: new Date(2024, 1, 1).toISOString(),
    featured: true,
  },
  {
    id: "3",
    title: "Développeur frontend junior",
    company: "Startup Inc",
    location: "Ouagadougou",
    type: "internship",
    salary: "200 000 - 300 000 FCFA/mois",
    description:
      "Opportunité parfaite pour les jeunes diplômés de lancer leur carrière dans le développement web. Vous travaillerez avec des technologies modernes et apprendrez auprès de développeurs expérimentés.",
    requirements: [
      "Connaissance de HTML, CSS et JavaScript",
      "Passion pour le développement web",
      "Volonté d'apprendre",
    ],
    benefits: ["Programme de mentorat", "Certificat à la fin"],
    postedDate: new Date(2024, 1, 10).toISOString(),
    featured: false,
  },
  {
    id: "4",
    title: "Comptable",
    company: "Solutions financières",
    location: "Ouagadougou",
    type: "full-time",
    salary: "500 000 - 700 000 FCFA/mois",
    description:
      "Nous recherchons un comptable minutieux pour gérer les registres financiers et assurer la conformité avec les réglementations locales.",
    requirements: [
      "Licence en comptabilité",
      "2+ années d'expérience en comptabilité",
      "Connaissance des logiciels comptables",
    ],
    postedDate: new Date(2024, 1, 5).toISOString(),
    featured: false,
  },
  {
    id: "5",
    title: "Designer UX/UI",
    company: "Studio créatif",
    location: "Ouagadougou",
    type: "contract",
    salary: "Négociable",
    description:
      "Concevez des interfaces utilisateur belles et intuitives pour les applications web et mobiles. Travaillez sur des projets passionnants avec une équipe créative talentueuse.",
    requirements: [
      "Portfolio démontrant des compétences en UI/UX",
      "Maîtrise de Figma ou Adobe XD",
      "Compréhension du design centré utilisateur",
    ],
    postedDate: new Date(2024, 1, 8).toISOString(),
    featured: true,
  },
  {
    id: "6",
    title: "Chef de projet",
    company: "Hub d'innovation",
    location: "Ouagadougou",
    type: "full-time",
    salary: "700 000 - 1 000 000 FCFA/mois",
    description:
      "Dirigez des équipes interdisciplinaires et assurez le succès des projets dans un environnement rythmé. Excellente opportunité pour les chefs de projet expérimentés.",
    requirements: [
      "Certification PMP préférée",
      "5+ années d'expérience en gestion de projet",
      "Solides compétences en leadership",
    ],
    benefits: ["Prime annuelle", "Budget formation"],
    postedDate: new Date(2024, 1, 12).toISOString(),
    featured: false,
  },
];

export function getAllJobs(): Job[] {
  return jobs;
}

export function getFeaturedJobs(): Job[] {
  return jobs.filter((job) => job.featured);
}

export function getJobById(id: string): Job | undefined {
  return jobs.find((job) => job.id === id);
}

export function getJobsByType(type: Job["type"]): Job[] {
  return jobs.filter((job) => job.type === type);
}

export function searchJobs(query: string): Job[] {
  const lowerQuery = query.toLowerCase();
  return jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(lowerQuery) ||
      job.company.toLowerCase().includes(lowerQuery) ||
      job.location.toLowerCase().includes(lowerQuery) ||
      job.description.toLowerCase().includes(lowerQuery)
  );
}
