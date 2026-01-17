"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import JobCard from "@/components/JobCard";
import { fetchJobs, mapJobOfferToJob } from "@/lib/jobsApi";
import { Job } from "@/types/job";

export default function Home() {
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedJobs = async () => {
      setLoading(true);
      try {
        const response = await fetchJobs({
          page: 0,
          size: 6,
          sort: ["createdAt,desc"],
        });

        // Filtrer les offres en vedette ou prendre les 6 premières
        const jobs = response.content
          .map(mapJobOfferToJob)
          .filter((job) => job.featured || true) // Pour l'instant, afficher toutes les offres
          .slice(0, 6);

        setFeaturedJobs(jobs);
      } catch (error) {
        console.error("Erreur lors du chargement des offres:", error);
        setFeaturedJobs([]);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedJobs();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Trouvez votre emploi de rêve au Burkina Faso
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Découvrez des opportunités passionnantes et connectez-vous avec les meilleurs employeurs
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/jobs"
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/10 transition"
              >
                Parcourir les offres
              </Link>
              <Link
                href="/jobs/new"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Publier une offre
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Offres d'emploi en vedette</h2>
          <Link
            href="/jobs"
            className="text-primary hover:text-primary/80 font-semibold"
          >
            Voir tout →
          </Link>
        </div>
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Chargement des offres d'emploi...</p>
          </div>
        ) : featuredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">Aucune offre d'emploi disponible pour le moment.</p>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Pourquoi choisir Talent Faso ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Emplois de qualité</h3>
              <p className="text-gray-600">
                Parcourez des offres d'emploi vérifiées provenant d'employeurs de confiance
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Candidature facile</h3>
              <p className="text-gray-600">
                Postulez rapidement avec notre processus de candidature simplifié
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Réponse rapide</h3>
              <p className="text-gray-600">
                Recevez des réponses rapides des employeurs et suivez vos candidatures
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
