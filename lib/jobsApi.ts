import { apiRequest } from "./api";
import { JobsResponse, JobsRequestParams, JobOffer } from "@/types/api";
import { Job } from "@/types/job";

export function mapJobOfferToJob(offer: JobOffer): Job {
  const jobTypeMap: Record<string, Job["type"]> = {
    FULL_TIME: "full-time",
    PART_TIME: "part-time",
    CONTRACT: "contract",
    INTERNSHIP: "internship",
  };

  let salary: string | undefined;
  if (offer.salaryMin > 0 || offer.salaryMax > 0) {
    if (offer.salaryMin === offer.salaryMax) {
      salary = `${offer.salaryMax.toLocaleString()} ${offer.salaryCurrency}`;
    } else {
      salary = `${offer.salaryMin.toLocaleString()} - ${offer.salaryMax.toLocaleString()} ${offer.salaryCurrency}`;
    }
  }

  const requirements = offer.requirements
    ? offer.requirements
        .split("\n")
        .map((req) => req.trim())
        .filter((req) => req.length > 0)
    : [];

  const location = offer.city
    ? `${offer.city}, ${offer.country}`
    : offer.location || offer.country;

  return {
    id: offer.uuid,
    title: offer.title,
    company: offer.companyName || offer.recruiterName,
    location: location,
    type: jobTypeMap[offer.jobType] || "full-time",
    salary: salary,
    description: offer.description,
    requirements: requirements,
    postedDate: offer.publishedAt || offer.createdAt,
    deadline: offer.applicationDeadline,
    featured: offer.isFeatured,
  };
}

export async function fetchJobs(
  params: JobsRequestParams = {}
): Promise<JobsResponse> {
  const { page = 0, size = 20, sort = ["createdAt,desc"] } = params;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort: sort.join(","),
  });

  const response = await apiRequest(`/mobile/offers?${queryParams.toString()}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des offres d'emploi");
  }

  return response.json();
}

export async function getAllJobsFromAPI(): Promise<Job[]> {
  try {
    const response = await fetchJobs({ page: 0, size: 100, sort: ["createdAt,desc"] });
    return response.content.map(mapJobOfferToJob);
  } catch (error) {
    console.error("Erreur lors de la récupération des offres:", error);
    return [];
  }
}

export async function fetchJobByUuid(uuid: string): Promise<JobOffer> {
  const response = await apiRequest(`/mobile/offers/${uuid}`, {
    method: "GET",
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Offre d'emploi introuvable");
    }
    throw new Error("Erreur lors de la récupération de l'offre d'emploi");
  }

  return response.json();
}

export async function getJobByUuid(uuid: string): Promise<Job | null> {
  try {
    const offer = await fetchJobByUuid(uuid);
    return mapJobOfferToJob(offer);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'offre:", error);
    return null;
  }
}

export function searchJobsFromList(jobs: Job[], query: string): Job[] {
  const lowerQuery = query.toLowerCase();
  return jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(lowerQuery) ||
      job.company.toLowerCase().includes(lowerQuery) ||
      job.location.toLowerCase().includes(lowerQuery) ||
      job.description.toLowerCase().includes(lowerQuery)
  );
}
