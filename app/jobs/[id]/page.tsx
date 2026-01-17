"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getJobByUuid } from "@/lib/jobsApi";
import ApplicationForm from "@/components/ApplicationForm";
import { Job } from "@/types/job";

interface JobDetailPageProps {
  params: { id: string };
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = params;
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadJob = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const jobData = await getJobByUuid(id);
        if (jobData) {
          setJob(jobData);
        } else {
          setError("Offre d'emploi introuvable");
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Erreur lors du chargement de l'offre d'emploi"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadJob();
    }
  }, [id]);

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

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "full-time":
        return "Temps plein";
      case "part-time":
        return "Temps partiel";
      case "contract":
        return "Contrat";
      case "internship":
        return "Stage";
      default:
        return type;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-600">Chargement de l'offre d'emploi...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Offre introuvable</h1>
        <p className="text-gray-600 mb-6">
          {error || "L'offre d'emploi que vous recherchez n'existe pas."}
        </p>
        <Link
          href="/jobs"
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition"
        >
          Parcourir toutes les offres
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/jobs"
        className="text-primary hover:text-primary/80 mb-4 inline-block"
      >
        ← Retour aux offres
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Job Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-8">
            {job.featured && (
              <span className="bg-yellow-400 text-yellow-900 text-sm font-semibold px-3 py-1 rounded mb-4 inline-block">
                Offre en vedette
              </span>
            )}
            <h1 className="text-4xl font-bold mb-4">{job.title}</h1>
            <p className="text-2xl text-gray-600 mb-6">{job.company}</p>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <span className={`px-3 py-1 rounded font-semibold ${getTypeColor(job.type)}`}>
                {getTypeLabel(job.type)}
              </span>
              {job.salary && (
                <span className="text-primary font-semibold">{job.salary}</span>
              )}
            </div>

            <div className="border-t border-b py-6 my-6">
              <h2 className="text-2xl font-bold mb-4">Description du poste</h2>
              <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Exigences</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            {job.benefits && job.benefits.length > 0 && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Avantages</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {job.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-4 text-sm text-gray-600 pt-6 border-t">
              <span>
                Publié le {new Date(job.postedDate).toLocaleDateString("fr-FR")}
              </span>
              {job.deadline && (
                <span>
                  Date limite : {new Date(job.deadline).toLocaleDateString("fr-FR")}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Application Form Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-primary/5 rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-2xl font-bold mb-4">Postuler pour ce poste</h2>
            <ApplicationForm jobId={job.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
