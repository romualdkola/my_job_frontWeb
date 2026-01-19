"use client";

import { useState } from "react";
import { JobApplication } from "@/types/job";

interface ApplicationFormProps {
  jobId: string;
}

export default function ApplicationForm({ jobId }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    applicantName: "",
    applicantEmail: "",
    applicantPhone: "",
    coverLetter: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const application: JobApplication = {
      id: Date.now().toString(),
      jobId,
      ...formData,
      submittedDate: new Date().toISOString(),
      status: "pending",
    };

    const existingApplications = JSON.parse(
      localStorage.getItem("jobApplications") || "[]"
    );
    existingApplications.push(application);
    localStorage.setItem("jobApplications", JSON.stringify(existingApplications));

    setIsSubmitting(false);
    setSubmitStatus("success");
    setFormData({
      applicantName: "",
      applicantEmail: "",
      applicantPhone: "",
      coverLetter: "",
    });

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="applicantName" className="block text-sm font-medium text-gray-700 mb-1">
          Nom complet *
        </label>
        <input
          type="text"
          id="applicantName"
          name="applicantName"
          required
          value={formData.applicantName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Jean Dupont"
        />
      </div>

      <div>
        <label htmlFor="applicantEmail" className="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </label>
        <input
          type="email"
          id="applicantEmail"
          name="applicantEmail"
          required
          value={formData.applicantEmail}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label htmlFor="applicantPhone" className="block text-sm font-medium text-gray-700 mb-1">
          Téléphone *
        </label>
        <input
          type="tel"
          id="applicantPhone"
          name="applicantPhone"
          required
          value={formData.applicantPhone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="+226 XX XX XX XX"
        />
      </div>

      <div>
        <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
          Lettre de motivation *
        </label>
        <textarea
          id="coverLetter"
          name="coverLetter"
          required
          rows={6}
          value={formData.coverLetter}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Dites-nous pourquoi vous êtes le candidat idéal pour ce poste..."
        />
      </div>

      {submitStatus === "success" && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Candidature soumise avec succès ! Nous examinerons votre candidature et vous répondrons bientôt.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Une erreur s'est produite. Veuillez réessayer.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Envoi en cours..." : "Soumettre la candidature"}
      </button>

      <p className="text-xs text-gray-500 text-center">
        En soumettant, vous acceptez nos termes et conditions
      </p>
    </form>
  );
}
