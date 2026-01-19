"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { isAuthenticated, getUser } from "@/lib/api";
import { User } from "@/types/auth";

export default function Footer() {
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

  const isRecruiter = isAuth && user && (user.role === "RECRUITER" || user.role === "EMPLOYER");

  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 gap-8 ${isRecruiter ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logo_talentfaso.png"
                alt="Logo Talent Faso"
                width={200}
                height={200}
                className="object-contain"
              />
            </Link>
            <p className="text-gray-400">
              Connecter les talents aux opportunités au Burkina Faso
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Pour les candidats</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/jobs" className="hover:text-white transition">
                  Offres d'emploi
                </Link>
              </li>
              <li>
                <Link
                  href="/applications"
                  className="hover:text-white transition"
                >
                  Mes candidatures
                </Link>
              </li>
            </ul>
          </div>
          {isRecruiter && (
            <div>
              <h4 className="text-lg font-semibold mb-4">Pour les employeurs</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/jobs/new" className="hover:text-white transition">
                    Publier une offre
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Trouver des talents
                  </Link>
                </li>
              </ul>
            </div>
          )}
          <div>
            <h4 className="text-lg font-semibold mb-4">Entreprise</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Talent Faso. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
