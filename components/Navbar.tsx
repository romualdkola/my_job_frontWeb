"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { isAuthenticated, getUser, logout } from "@/lib/api";
import { User } from "@/types/auth";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setIsAuth(isAuthenticated());
      setUser(getUser());
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    window.addEventListener("authChange", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    setIsAuth(false);
    window.dispatchEvent(new Event("authChange"));
    window.location.href = "/";
  };

  const isRecruiter = isAuth && user && (user.role === "RECRUITER" || user.role === "EMPLOYER");

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo_talentfaso.png"
              alt="Logo Talent Faso"
              width={200}
              height={200}
              className="object-contain"
            />
          </Link>
          <div className="flex gap-6 items-center">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary transition font-medium"
            >
              Accueil
            </Link>
            <Link
              href="/jobs"
              className="text-gray-700 hover:text-primary transition font-medium"
            >
              Offres d'emploi
            </Link>
            {isRecruiter && (
              <>
                <Link
                  href="/jobs/new"
                  className="text-gray-700 hover:text-primary transition font-medium"
                >
                  Publier une offre
                </Link>
                <Link
                  href="/applications"
                  className="text-gray-700 hover:text-primary transition font-medium"
                >
                  Mes candidatures
                </Link>
              </>
            )}
            {isAuth ? (
              <>
                {user && (
                  <span className="text-gray-700 text-sm font-medium">
                    {user.fullName}
                  </span>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
                >
                  Connexion
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
