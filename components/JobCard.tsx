import Link from "next/link";
import { Job } from "@/types/job";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "full-time":
        return "bg-green-100 text-green-800";
      case "part-time":
        return "bg-blue-100 text-blue-800";
      case "contract":
        return "bg-purple-100 text-purple-800";
      case "internship":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer h-full flex flex-col">
        {job.featured && (
          <div className="mb-2">
            <span className="bg-yellow-400 text-yellow-900 text-xs font-semibold px-2 py-1 rounded">
              En vedette
            </span>
          </div>
        )}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
        <p className="text-gray-600 mb-3">{job.company}</p>
        <div className="flex items-center gap-2 text-gray-500 mb-4 text-sm">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>{job.location}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`text-xs font-semibold px-2 py-1 rounded ${getTypeColor(job.type)}`}>
            {job.type === "full-time" ? "Temps plein" : 
             job.type === "part-time" ? "Temps partiel" :
             job.type === "contract" ? "Contrat" :
             job.type === "internship" ? "Stage" : job.type}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {job.description}
        </p>
        {job.salary && (
          <p className="text-primary font-semibold mb-4">{job.salary}</p>
        )}
        <div className="flex items-center justify-between mt-auto pt-4 border-t">
          <span className="text-xs text-gray-500">
            Publié le {new Date(job.postedDate).toLocaleDateString("fr-FR")}
          </span>
          <span className="text-primary font-semibold text-sm hover:underline">
            Voir les détails →
          </span>
        </div>
      </div>
    </Link>
  );
}
