export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "internship";
  salary?: string;
  description: string;
  requirements: string[];
  benefits?: string[];
  postedDate: string;
  deadline?: string;
  featured?: boolean;
}

export interface JobApplication {
  id: string;
  jobId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  coverLetter: string;
  resumeUrl?: string;
  submittedDate: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
}