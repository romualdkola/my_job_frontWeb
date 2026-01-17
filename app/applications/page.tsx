"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { JobApplication } from "@/types/job";
import { getJobById } from "@/lib/jobs";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load applications from localStorage (in a real app, this would come from an API)
    const storedApplications = JSON.parse(
      localStorage.getItem("jobApplications") || "[]"
    );
    setApplications(storedApplications);
    setLoading(false);
  }, []);

  const getStatusColor = (status: JobApplication["status"]) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "reviewed":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: JobApplication["status"]) => {
    switch (status) {
      case "accepted":
        return "Accepté";
      case "rejected":
        return "Rejeté";
      case "reviewed":
        return "En cours d'examen";
      case "pending":
        return "En attente";
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-600">Chargement des candidatures...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Mes candidatures</h1>

      {applications.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h2 className="text-2xl font-semibold mb-4">Aucune candidature pour le moment</h2>
          <p className="text-gray-600 mb-6">
            Vous n'avez pas encore postulé à des offres d'emploi. Commencez à parcourir les offres et soumettez vos candidatures !
          </p>
          <Link
            href="/jobs"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition inline-block"
          >
            Parcourir les offres
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((application) => {
            const job = getJobById(application.jobId);
            return (
              <div
                key={application.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <Link href={`/jobs/${application.jobId}`}>
                      <h3 className="text-xl font-bold text-primary hover:underline mb-2">
                        {job?.title || "Offre inconnue"}
                      </h3>
                    </Link>
                    <p className="text-gray-600 mb-1">{job?.company || "Entreprise inconnue"}</p>
                    <p className="text-sm text-gray-500 mb-3">
                      Candidature soumise le {new Date(application.submittedDate).toLocaleDateString("fr-FR")}
                    </p>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-semibold">Email :</span> {application.applicantEmail}
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold">Téléphone :</span> {application.applicantPhone}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                        application.status
                      )}`}
                    >
                      {getStatusLabel(application.status)}
                    </span>
                    <Link
                      href={`/jobs/${application.jobId}`}
                      className="text-primary hover:text-primary/80 text-sm font-semibold"
                    >
                      Voir l'offre →
                    </Link>
                  </div>
                </div>
                {application.coverLetter && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-semibold mb-2">Lettre de motivation :</h4>
                    <p className="text-gray-700 text-sm line-clamp-3">{application.coverLetter}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
